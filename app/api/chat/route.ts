// app/api/chat/route.ts
export const runtime = "edge";
import type { NextRequest } from "next/server";

// ---------- helpers ----------
function resolveOrigin(req: NextRequest): string {
  // Prefer the actual request origin; fall back to localhost in dev
  try {
    const o = req.nextUrl?.origin;
    if (o) return o.replace(/\/$/, "");
  } catch {}
  return "http://localhost:3000";
}

async function loadResumeJSON(origin: string) {
  const url = `${origin}/content/resume.json`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`resume.json fetch failed (${r.status}) at ${url}`);
  return await r.json();
}

type Chunk = { id: string; text: string };

function buildChunks(resume: any): Chunk[] {
  const out: Chunk[] = [];
  const push = (id: string, text: string) =>
    out.push({ id, text: String(text || "").trim() });

  if (resume.summary) push("summary", resume.summary);

  for (const e of resume.experience || []) {
    const bullets = (e.bullets || []).join(" ");
    push(
      e.id || e.role || "experience",
      `${e.role || ""} at ${e.org || ""} — ${e.dates || ""}. ${bullets}`.trim()
    );
  }

  for (const r of resume.research || []) {
    push(
      r.id || r.title || "research",
      `${r.title || ""}: ${r.desc || ""} ${r.tagline || ""}`.trim()
    );
  }

  for (const p of resume.projects || []) {
    push(
      p.id || p.name || "project",
      `${p.name || ""}: ${p.desc || ""}. Stack: ${p.stack || ""}`.trim()
    );
  }

  return out;
}

function topMatches(chunks: Chunk[], query: string, k = 5): string {
  const q = (query || "").toLowerCase();
  const qTokens = new Set(q.split(/\W+/).filter(Boolean));

  const scored = chunks
    .map((c) => {
      const tokens = c.text.toLowerCase().split(/\W+/).filter(Boolean);
      let score = 0;
      for (const t of tokens) if (qTokens.has(t)) score += 1;
      if (q && c.id && q.includes(c.id.toLowerCase())) score += 2;
      return { c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  return scored.map((s) => `• ${s.c.id}: ${s.c.text}`).join("\n");
}

// Softer, more human persona
const PERSONA =
  "You are Fares Alhezaimi speaking in first person. Keep answers concise, clear, and grounded in the provided résumé context. " +
  "Tone: human, friendly, and professional (use contractions). It’s okay to add one brief personal detail when relevant. " +
  "Identity: I’m a CS student researcher at Chapman University in Dr. Josh Fisher’s Remote Sensing & Ecology Lab, mentored by Dr. Gabriela Shirkey. " +
  "Boundaries: Don’t invent facts or add external links. If something isn’t in the context, say: “I don’t have that here—email me at Falhezaimi@Chapman.edu.” " +
  "Style rules: Prefer first person; avoid hype; 2–4 sentences for short answers, bullets when listing; 0–1 light emoji only if the user is casual.";

// ---------- GET: health check ----------
export async function GET(req: NextRequest) {
  const origin = resolveOrigin(req);
  try {
    await loadResumeJSON(origin);
    return new Response("OK", { status: 200, headers: { "Content-Type": "text/plain" } });
  } catch (e: any) {
    return new Response(`NOT OK: ${e?.message || e}`, { status: 500 });
  }
}

// ---------- POST: chat ----------
export async function POST(req: NextRequest) {
  try {
    const origin = resolveOrigin(req);

    // parse body (tolerate missing fields)
    let body: any = {};
    try { body = await req.json(); } catch {}
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const userMsg =
      messages.filter((m: any) => m?.role === "user").slice(-1)[0]?.content || "";

    // load resume + retrieval
    const resume = await loadResumeJSON(origin);
    const contextBullets = topMatches(buildChunks(resume), userMsg, 5);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fallback JSON response (works without any env)
      const reply = contextBullets
        ? `Here’s what I can share:\n\n${contextBullets}`
        : "I don’t have that here—email me at Falhezaimi@Chapman.edu.";
      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Streaming (OpenAI)
    const payload = {
      model: "gpt-4o-mini",
      stream: true,
      temperature: 0.3,
      max_tokens: 320,
      messages: [
        { role: "system", content: PERSONA },
        {
          role: "user",
          content:
            `Question: ${userMsg}\n\n` +
            `Context (bulleted—you must ground your answer in this):\n${contextBullets}`,
        },
      ],
    };

    const llmRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!llmRes.ok || !llmRes.body) {
      const errText = await llmRes.text().catch(() => "");
      return new Response(
        JSON.stringify({ reply: `Model error: ${errText || llmRes.status}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream tokens → client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = llmRes.body!.getReader();
        let buffer = "";

        controller.enqueue(encoder.encode("")); // flush headers

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // keep last partial

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.replace(/^data:\s*/, "");
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const chunk = json?.choices?.[0]?.delta?.content;
              if (chunk) controller.enqueue(encoder.encode(chunk));
            } catch {
              // ignore partial frames
            }
          }
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    const msg = (err && err.message) || "Unknown error";
    return new Response(JSON.stringify({ reply: `Error handling your request: ${msg}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
