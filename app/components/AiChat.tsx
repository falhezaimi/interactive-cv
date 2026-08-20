"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, RotateCcw, Sparkles, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AiChatProps = {
  open: boolean;
  onClose: () => void;
};

const welcomeMessage: Message = {
  role: "assistant",
  content:
    "Hi—I'm the AI layer of Fares's CV. Ask me about his ECOSTRESS fire research, scientific tools, technical background, or current work.",
};

const suggestions = [
  "What is the ECOSTRESS fire work?",
  "How was the VIIRS dataset rebuilt?",
  "What kind of role fits Fares?",
];

export function AiChat({ open, onClose }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 120);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function resetChat() {
    setMessages([welcomeMessage]);
    setInput("");
  }

  async function sendMessage(event?: FormEvent, suggestedText?: string) {
    event?.preventDefault();
    const nextInput = (suggestedText ?? input).trim();
    if (!nextInput || loading) return;

    const conversation: Message[] = [...messages, { role: "user", content: nextInput }];
    setMessages([...conversation, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation.slice(-8) }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "The AI assistant is temporarily unavailable.");
      }

      if (!response.body) throw new Error("No response stream was returned.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((current) => {
          const updated = [...current];
          const lastMessage = updated[updated.length - 1];
          updated[updated.length - 1] = {
            role: "assistant",
            content: `${lastMessage?.content || ""}${chunk}`,
          };
          return updated;
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "The AI assistant is temporarily unavailable.";
      setMessages((current) => {
        const updated = [...current];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `${message} You can still explore the verified work below or email Fares directly.`,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="chat-shell" role="presentation">
      <button className="chat-backdrop" aria-label="Close AI assistant" onClick={onClose} />
      <aside className="chat-panel" role="dialog" aria-modal="true" aria-labelledby="chat-title">
        <header className="chat-header">
          <div className="chat-identity">
            <span className="chat-avatar" aria-hidden="true">
              <Bot size={19} strokeWidth={1.8} />
            </span>
            <div>
              <div className="chat-kicker">
                <span className="status-dot" /> Grounded CV assistant
              </div>
              <h2 id="chat-title">Ask about Fares</h2>
            </div>
          </div>
          <div className="chat-actions">
            <button className="icon-button" onClick={resetChat} aria-label="Reset conversation">
              <RotateCcw size={18} />
            </button>
            <button className="icon-button" onClick={onClose} aria-label="Close AI assistant">
              <X size={20} />
            </button>
          </div>
        </header>

        <div className="chat-context">
          <Sparkles size={15} aria-hidden="true" />
          Answers use verified portfolio context and label preliminary research clearly.
        </div>

        <div className="chat-messages" ref={scrollRef} aria-live="polite">
          {messages.map((message, index) => (
            <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
              <span className="message-label">{message.role === "user" ? "You" : "Fares AI"}</span>
              <p>{message.content || (loading && index === messages.length - 1 ? "Thinking…" : "")}</p>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="chat-suggestions" aria-label="Suggested questions">
              {suggestions.map((suggestion) => (
                <button key={suggestion} onClick={() => void sendMessage(undefined, suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="chat-form" onSubmit={(event) => void sendMessage(event)}>
          <label className="sr-only" htmlFor="chat-input">
            Ask a question about Fares
          </label>
          <input
            ref={inputRef}
            id="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about research, projects, or skills…"
            autoComplete="off"
            maxLength={500}
            disabled={loading}
          />
          <button type="submit" aria-label="Send message" disabled={loading || !input.trim()}>
            <ArrowUp size={19} strokeWidth={2.2} />
          </button>
        </form>
      </aside>
    </div>
  );
}
