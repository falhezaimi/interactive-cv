// app/ResumeClient.tsx
"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Msg = { role: "user" | "assistant"; content: string };

export default function ResumeClient() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey—I’m Fares. I can talk about my research, projects, or what I’m looking for next. Try: “What is AUREUM?” or “What motivates you?”",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;

    // push user + empty assistant message
    const base = [
      ...messages,
      { role: "user", content: text } as Msg,
      { role: "assistant", content: "" } as Msg,
    ];
    setMessages(base);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: base.slice(-12),
          context: {
            sectionIds: ["about", "experience", "projects", "research", "education", "skills"],
            url: typeof window !== "undefined" ? window.location.href : "",
          },
        }),
      });

      // stream if available, otherwise JSON fallback
      if (res.body && res.headers.get("content-type")?.startsWith("text/plain")) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            copy[copy.length - 1] = { ...last, content: (last.content || "") + chunk };
            return copy;
          });
        }
      } else {
        const data = await res.json().catch(() => ({ reply: "Error: invalid response." }));
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: data.reply || "(No reply)" };
          return copy;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Error reaching the chat API. Please check /api/chat." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function printPDF() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-wide">Fares Alhezaimi — Curriculum Vitae</div>
          <div className="flex items-center gap-3">
            <button onClick={printPDF} className="text-sm underline">Download PDF</button>
            <button
              onClick={() => setOpen(true)}
              className="px-3 py-1.5 rounded-2xl border border-neutral-300 hover:bg-neutral-50 text-sm"
            >
              Ask my AI
            </button>
          </div>
        </div>
      </header>

      {/* Page */}
      <section className="max-w-4xl mx-auto my-8 px-4">
        <div className="bg-white shadow-md rounded-xl">
          <div className="p-8">
            {/* Header block */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <h1 className="text-3xl font-bold">Fares Alhezaimi</h1>
                <p className="text-sm text-neutral-600">
                  B.S. Computer Science · Integrated CADS Master’s (Admitted) — Chapman University
                </p>
              </div>
              <div className="text-sm text-neutral-700">
                <a className="underline me-3" href="mailto:Falhezaimi@Chapman.edu">Falhezaimi@Chapman.edu</a>
                <a
                  className="underline me-3"
                  href="https://linkedin.com/in/faresalhezaimi"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a className="underline" href="https://github.com/falhezaimi" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>

            <hr className="my-5" />

            {/* Summary */}
            <section id="about" className="leading-relaxed">
              <h2 className="text-lg font-semibold tracking-wide">Summary</h2>
              <p className="text-sm text-neutral-800">
                I’m a Computer Science student researcher at Chapman University in Dr. Josh Fisher’s Remote Sensing and Ecology Lab,
                mentored by Dr. Gabriela Shirkey. I work on AUREUM (JPL MOSAICS-supported ecological ML) and contribute to BioMNI agent
                development, with a focus on AI for sustainability and health.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Left column */}
              <div className="md:col-span-2 space-y-6">
                {/* Experience */}
                <section id="experience">
                  <h2 className="text-lg font-semibold tracking-wide">Experience</h2>
                  <div className="mt-3 space-y-4">
                    <article className="text-sm">
                      <h3 className="font-semibold">Student Researcher — AUREUM (JPL MOSAICS)</h3>
                      <p className="text-neutral-600">Chapman University, Dr. Josh Fisher’s Lab · 2024–Present</p>
                      <ul className="list-disc ms-5 mt-1 text-neutral-800">
                        <li>Built multimodel ML pipeline (NN, RF, LGBM, XGB) for species richness prediction using NEON & ECOSTRESS.</li>
                        <li>Designed validation (site/plot), applied SHAP, and produced visuals for NASA posters.</li>
                        <li>Mentored by Dr. Gabriela Shirkey.</li>
                      </ul>
                    </article>

                    <article className="text-sm">
                      <h3 className="font-semibold">Student Researcher — BioMNI Wrapper</h3>
                      <p className="text-neutral-600">Chapman University BioLab · 2024–Present</p>
                      <ul className="list-disc ms-5 mt-1 text-neutral-800">
                        <li>Agent framework for protein allostery; parsers, RMSD checks, multi-model comparison.</li>
                        <li>Environment setup, benchmarks, and module integration.</li>
                      </ul>
                    </article>

                    <article className="text-sm">
                      <h3 className="font-semibold">Lead Developer — EDRIVE iOS</h3>
                      <p className="text-neutral-600">Fowler School of Engineering · 2024–Present</p>
                      <ul className="list-disc ms-5 mt-1 text-neutral-800">
                        <li>CO₂ tracking, AI routing, and gamified sustainable driving; CarPlay plans.</li>
                        <li>Led a team of 6; modular repo with clear READMEs.</li>
                      </ul>
                    </article>
                  </div>
                </section>

                {/* Projects */}
                <section id="projects" className="pt-2">
                  <h2 className="text-lg font-semibold tracking-wide">Selected Projects</h2>
                  <div className="mt-3 space-y-4">
                    <article id="project-edrive" className="text-sm">
                      <h3 className="font-semibold">EDRIVE — Eco-Driving iOS App</h3>
                      <p className="text-neutral-600">Swift · CoreLocation · Supabase</p>
                      <p className="mt-1">Tracks CO₂, optimizes routes, and gamifies sustainable driving.</p>
                      <a className="text-xs underline" href="https://github.com/falhezaimi/EDRIVE" target="_blank" rel="noreferrer">
                        GitHub Repo
                      </a>
                    </article>

                    <article id="project-biomni" className="text-sm">
                      <h3 className="font-semibold">BioMNI Wrapper — Protein Allostery AI</h3>
                      <p className="text-neutral-600">Python · ReAct Agents · ML</p>
                      <p className="mt-1">AI agent framework for biomolecular analysis; parsers and automated RMSD evaluation.</p>
                    </article>

                    <article id="project-hoa" className="text-sm">
                      <h3 className="font-semibold">HOA Communication Website</h3>
                      <p className="text-neutral-600">Next.js · PostgreSQL</p>
                      <p className="mt-1">Auth-protected HOA portal with announcements, requests, and admin dashboard.</p>
                    </article>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <aside className="space-y-6">
                <section id="education">
                  <h2 className="text-lg font-semibold tracking-wide">Education</h2>
                  <div className="mt-2 text-sm">
                    <div className="font-medium">Chapman University</div>
                    <div className="text-neutral-700">B.S. Computer Science · Integrated CADS M.S. (Admitted)</div>
                  </div>
                </section>

                <section id="skills">
                  <h2 className="text-lg font-semibold tracking-wide">Skills</h2>
                  <ul className="mt-2 text-sm list-disc ms-5">
                    <li>Python, Java, C++, C#, JavaScript</li>
                    <li>PyTorch, XGBoost, LGBM</li>
                    <li>Cloud & Data: Supabase, PostgreSQL, Docker</li>
                  </ul>
                </section>

                <section id="links">
                  <h2 className="text-lg font-semibold tracking-wide">Links</h2>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>
                      <a className="underline" href="mailto:Falhezaimi@Chapman.edu">Falhezaimi@Chapman.edu</a>
                    </li>
                    <li>
                      <a className="underline" href="https://linkedin.com/in/faresalhezaimi" target="_blank" rel="noreferrer">
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a className="underline" href="https://github.com/falhezaimi" target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    </li>
                  </ul>
                </section>
              </aside>
            </div>

            {/* Footer */}
            <div className="mt-8 text-[11px] text-neutral-500">
              <span>Last updated: Sep 2025 · </span>
              <a className="underline" href="#about">Top</a>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1" onClick={() => setOpen(false)} />
          <div className="w-full sm:w-[420px] h-full bg-white border-l border-neutral-200 shadow-xl flex flex-col">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <div className="font-semibold">Ask about my work</div>
              <button onClick={() => setOpen(false)} className="text-sm underline">Close</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => {
                const isUser = m.role === "user";
                const isLastAssistant = !isUser && i === messages.length - 1 && loading;

                return (
                  <div key={i} className={isUser ? "text-right" : "text-left"}>
                    <div
                      className={`inline-block px-3 py-2 rounded-2xl text-sm max-w-[90%] break-words ${
                        isUser ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-900"
                      }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: (props) => <p className="whitespace-pre-wrap leading-6" {...props} />,
                          strong: (props) => <strong className="font-semibold" {...props} />,
                          em: (props) => <em className="italic" {...props} />,
                          ul: (props) => <ul className="list-disc ms-5 my-1 space-y-1" {...props} />,
                          ol: (props) => <ol className="list-decimal ms-5 my-1 space-y-1" {...props} />,
                          li: (props) => <li className="leading-6" {...props} />,
                          code: (props) => (
                            <code className="rounded bg-black/10 px-1 py-0.5 text-[0.9em]" {...props} />
                          ),
                          a: (props) => (
                            <a className="underline" target="_blank" rel="noreferrer" {...props} />
                          ),
                          br: () => <br />
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                      {isLastAssistant ? <span className="animate-pulse">▍</span> : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={sendMessage} className="p-3 border-t border-neutral-200 flex gap-2">
              <input
                className="flex-1 border border-neutral-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder="Ask about my projects, research, or skills…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="px-3 py-2 text-sm rounded-xl bg-neutral-900 text-white">Send</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
