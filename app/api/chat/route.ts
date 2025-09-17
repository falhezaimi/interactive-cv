// app/api/chat/route.ts
export const runtime = "edge";
import type { NextRequest } from "next/server";
// was: import resume from "@/public/content/resume.json";
import resume from "../../content/resume.json";

type Chunk = { id: string; text: string };

function buildChunks(res: any): Chunk[] {
  const out: Chunk[] = [];
  const push = (id: string, text: string) => out.push({ id, text: String(text || "").trim() });

  if (res.summary) push("summary", res.summary);

  if (res.personal) {
    const p = res.personal;
    const personalText = [
      p.location ? `Location: ${p.location}.` : "",
      p.goals ? `Goals: ${p.goals}` : "",
      Array.isArray(p.interests) && p.interests.length ? `Interests: ${p.interests.join(", ")}.` : "",
      p.availability ? `Availability: ${p.availability}.` : "",
      Array.isArray(p.fun_facts) && p.fun_facts.length ? `Fun facts: ${p.fun_facts.join(" | ")}` : "",
      p.contact_pref ? `Contact: ${p.contact_pref}` : "",
    ].filter(Boolean).join(" ");
    push("personal", personalText);
  }

  for (const e of res.experience || []) {
    const bullets = (e.bullets || []).join(" ");
    push(e.id || e.role || "experience", `${e.role || ""} at ${e.org || ""} — ${e.dates || ""}. ${bullets}`.trim());
  }

  for (const r of res.research || []) {
    push(r.id || r.title || "research", `${r.title || ""}: ${r.desc || ""} ${r.tagline || ""}`.trim());
  }

  for (const p of res.projects || []) {
    push(p.id || p.name || "project", `${p.name || ""}: ${p.desc || ""}. Stack: ${p.stack || ""}`.trim());
  }

  return out;
}

function topMatches(chunks: Chunk[], query: string, k = 5): string {
  const q = (query || "").toLowerCase();
  const qTokens = new Set(q.split(/\W+/).filter(Boolean));
  return chunks
    .map((c) => {
      const tokens = c.text.toLowerCase().split(/\W+/).filter(Boolean);
      let score = 0;
      for (const t of tokens) if (qTokens.has(t)) score += 1;
      if (q.includes((c.id || "").toLowerCase())) score += 2;
      return { c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => `• ${s.c.id}: ${s.c.text}`)
    .join("\n");
}

const PERSONA =
  "You are Fares Alhezaimi speaking in first person. Keep answers concise, friendly, and professional (use contractions). " +
  "Identity: I’m a CS student researcher at Chapman University in Dr. Josh Fisher’s Remote Sensing & Ecology Lab, mentored by Dr. Gabriela Shirkey. " +
  "Use only the résumé context. If something isn’t in it, say: \"I don’t have that here—email me at Falhezaimi@Chapman.edu.\" " +
  "No external links. Prefer 2–4 sentences; bullets for lists; light emoji only if the user is casual.";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as any;
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const userMsg = messages.filter((m: any) => m?.role === "user").slice(-1)[0]?.content || "";

    // Build retrieval context from imported JSON
    const contextBullets = topMatches(buildChunks(resume), userMsg, 5);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const reply = contextBullets
        ? `Here’s what I can share:\n\n${contextBullets}`
        : "I don’t have that here—email me at Falhezaimi@Chapman.edu.";
      return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
    }

    // Stream from OpenAI
    const payload = {
      model: "gpt-4o-mini",
      stream: true,
      temperature: 0.3,
      max_tokens: 320,
      messages: [
        { role: "system", content: PERSONA },
        { role: "user", content: `Question: ${userMsg}\n\nContext:\n${contextBullets}` },
      ],
    };

    const llmRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    });

    if (!llmRes.ok || !llmRes.body) {
      const errText = await llmRes.text().catch(() => "");
      return new Response(JSON.stringify({ reply: `Model error: ${errText || llmRes.status}` }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

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
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.replace(/^data:\s*/, "");
            if (data === "[DONE]") { controller.close(); return; }
            try {
              const json = JSON.parse(data);
              const chunk = json?.choices?.[0]?.delta?.content;
              if (chunk) controller.enqueue(encoder.encode(chunk));
            } catch { /* ignore partial frames */ }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ reply: `Error handling your request: ${err?.message || "Unknown"}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
