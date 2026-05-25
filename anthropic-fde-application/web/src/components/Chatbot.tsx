import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What makes Bill a fit for FDE?",
  "Walk me through robotics.press",
  "Tell me about Bill's healthcare experience",
  "What's the federated AI operating model?"
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);

    const placeholder: Msg = { role: "assistant", content: "" };
    setMessages((m) => [...m, placeholder]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      // Parse Anthropic SSE: lines like "data: { ... }" and "event: ..." headers.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        const lines = buf.split("\n");
        buf = lines.pop() || "";

        for (const raw of lines) {
          const line = raw.trim();
          if (!line || !line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const obj = JSON.parse(data);
            if (obj.type === "content_block_delta" && obj.delta?.type === "text_delta" && typeof obj.delta.text === "string") {
              acc += obj.delta.text;
              setMessages((m) => {
                const copy = m.slice();
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            } else if (obj.type === "message_stop") {
              // done
            } else if (obj.type === "error") {
              throw new Error(obj.error?.message || "Stream error");
            }
          } catch (e) {
            // ignore individual parse failures
          }
        }
      }

      if (!acc) {
        // Defensive: if we got nothing useful, show a soft error
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { role: "assistant", content: "(no response from model — try again)" };
          return copy;
        });
      }
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      // Remove the empty placeholder
      setMessages((m) => m.slice(0, -1));
    } finally {
      setBusy(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  }

  return (
    <>
      {!open && (
        <button
          aria-label="Open chat"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 rounded-full bg-ink-900 text-cream-50 pl-4 pr-5 py-3 shadow-lg hover:shadow-xl hover:bg-ink-800 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span className="font-medium text-sm">Ask about Bill</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-[min(420px,calc(100vw-3rem))] h-[min(620px,calc(100vh-3rem))] bg-cream-50 rounded-2xl shadow-2xl border border-ink-700/15 flex flex-col overflow-hidden fade-up">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-ink-700/10 bg-cream-100">
            <div>
              <p className="text-sm font-medium text-ink-900">Ask about Bill</p>
              <p className="text-xs text-ink-500">Grounded in the evidence on this page · powered by Claude</p>
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-md p-1.5 text-ink-500 hover:bg-ink-700/10 hover:text-ink-900 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll px-5 py-4 space-y-4">
            {messages.length === 0 && (
              <>
                <p className="text-sm text-ink-600 leading-relaxed">
                  Hi — I'm the assistant Bill set up for his Anthropic application. I can answer questions about his background, his work at athenahealth, robotics.press, his founder track, and anything in the evidence on this page. I'll cite where things come from and tell you when I don't know.
                </p>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-ink-500">Try asking</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-sm bg-white hover:bg-cream-100 border border-ink-700/10 rounded-lg px-3 py-2 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-ink-900 text-cream-50 px-4 py-2.5 text-sm leading-relaxed"
                      : "max-w-[85%] rounded-2xl rounded-bl-md bg-white border border-ink-700/10 text-ink-900 px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                  }
                >
                  {m.content || <span className="inline-block h-2 w-2 rounded-full bg-ink-400 animate-pulse"></span>}
                </div>
              </div>
            ))}

            {error && <p className="text-xs text-rust-600 text-center">{error}</p>}
          </div>

          <div className="border-t border-ink-700/10 px-3 py-3 bg-cream-100">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask a question…"
                rows={1}
                disabled={busy}
                className="flex-1 resize-none rounded-lg border border-ink-700/15 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-rust-500 focus:ring-1 focus:ring-rust-500/20 transition disabled:opacity-50"
                style={{ maxHeight: 120 }}
              />
              <button
                aria-label="Send"
                onClick={() => send(input)}
                disabled={busy || !input.trim()}
                className="rounded-lg bg-ink-900 text-cream-50 p-2.5 hover:bg-ink-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-ink-400 mt-1.5 px-1">
              Enter to send · Shift+Enter for newline
            </p>
          </div>
        </div>
      )}
    </>
  );
}
