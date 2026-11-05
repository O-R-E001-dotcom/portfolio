import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { UserRoundIcon, LightbulbIcon } from "./icons";

const CHATBOT_API_URL =
  import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:8010";

const suggestions = [
  "What are your core skills?",
  "Tell me about your AI projects",
  "What is your experience with FastAPI?",
  "How can I contact you?",
];

const greeting = {
  role: "assistant",
  text: "Hi! I'm Abolore's AI assistant. I can answer questions about skills, experience, and projects using the CV knowledge base. What would you like to know?",
};

const AVAILABILITY = {
  checking: { label: "Checking availability...", dot: "bg-amber-400" },
  online: { label: "Online · grounded in the CV", dot: "bg-green-400" },
  offline: { label: "Offline · email instead", dot: "bg-red-400" },
};

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [availability, setAvailability] = useState("checking");

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const toggleRef = useRef(null);
  const abortRef = useRef(null);
  const hasUserMessage = messages.some((message) => message.role === "user");
  const status = AVAILABILITY[availability] || AVAILABILITY.checking;
  const lastMessage = messages[messages.length - 1];
  const isStreaming =
    loading && lastMessage?.role === "assistant" && lastMessage.text.length > 0;
  const showTyping = loading && !isStreaming;

  // Check once on load so the header never claims the assistant is online
  // when the service is down or misconfigured.
  useEffect(() => {
    let alive = true;

    fetch(`${CHATBOT_API_URL}/health`)
      .then((response) => {
        if (!response.ok) throw new Error("Unavailable");
        return response.json();
      })
      .then((data) => {
        if (alive) setAvailability(data?.status === "ok" ? "online" : "offline");
      })
      .catch(() => {
        if (alive) setAvailability("offline");
      });

    return () => {
      alive = false;
    };
  }, []);

  // On open: first-time visitors see the greeting from the top, while an
  // existing conversation jumps straight to the latest message. The composer
  // is focused immediately so people can start typing without scrolling.
  useEffect(() => {
    if (!open) return;
    const body = bodyRef.current;
    if (body) body.scrollTop = hasUserMessage ? body.scrollHeight : 0;
    inputRef.current?.focus({ preventScroll: true });
    // `hasUserMessage` is intentionally read only at open time; new messages
    // are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    if (!open || !hasUserMessage) return;
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages, loading, open, hasUserMessage]);

  // If a suggestion button disappears after it is clicked, focus falls back to
  // the page. Return it to the composer once the reply has finished.
  useEffect(() => {
    if (!open || loading) return;
    if (document.activeElement === document.body) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [open, loading]);

  const closeChat = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Stop an in-flight stream if the widget is removed from the page.
  useEffect(() => () => abortRef.current?.abort(), []);

  const sendQuestion = async (rawQuestion) => {
    const cleanQuestion = rawQuestion.trim();
    if (!cleanQuestion || loading) return;

    const history = messages
      .filter((message) => message !== greeting && message.text)
      .slice(-6)
      .map((message) => ({ role: message.role, content: message.text }));

    setQuestion("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: cleanQuestion }]);

    const controller = new AbortController();
    abortRef.current = controller;

    let answer = "";
    let started = false;

    // Append the assistant bubble on the first token, then grow it in place.
    const renderAnswer = (text) => {
      answer = text;
      if (!started) {
        started = true;
        setMessages((prev) => [...prev, { role: "assistant", text }]);
        return;
      }
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", text };
        return next;
      });
    };

    const failAnswer = () => {
      const fallback =
        "I couldn't reach the CV assistant right now. Please try again shortly, or contact Abolore directly at aboloresanni001@gmail.com.";
      if (started) {
        renderAnswer(answer.trim() || fallback);
      } else {
        started = true;
        setMessages((prev) => [...prev, { role: "assistant", text: fallback }]);
      }
    };

    try {
      const response = await fetch(`${CHATBOT_API_URL}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion, history }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "Chatbot request failed");
      }

      // Fallback for browsers/proxies that do not expose a readable body.
      if (!response.body) {
        renderAnswer(await response.text());
        setAvailability("online");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        if (answer) renderAnswer(answer);
      }

      answer += decoder.decode();
      renderAnswer(answer.trim() || "I don't have that detail.");
      setAvailability("online");
    } catch (error) {
      if (error?.name === "AbortError") return;
      setAvailability("offline");
      failAnswer();
    } finally {
      abortRef.current = null;
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendQuestion(question);
  };

  return (
    <div className="fixed bottom-3 right-3 z-[1500] sm:bottom-5 sm:right-5">
      {open && (
        <div
          role="dialog"
          aria-label="AI assistant chat"
          className="mb-3 flex h-[min(78dvh,620px)] max-h-[calc(100dvh-6rem)] w-[calc(100vw-1.5rem)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-2xl sm:mb-4 sm:w-[390px]"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-gradient-to-r from-brand-600 to-ai-600 px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <UserRoundIcon size={18} />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-brand-600 ${status.dot}`}
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight">Abolore's AI Assistant</p>
                <p className="truncate text-xs text-white/70" aria-live="polite">
                  {status.label}
                </p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="shrink-0 rounded-full p-2 hover:bg-white/15 transition"
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={bodyRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-background px-3 py-4 sm:px-4"
          >
            {messages.map((message, index) => {
              const streamingHere =
                loading && index === messages.length - 1 && message.role === "assistant";
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex items-start gap-2 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
                      <UserRoundIcon size={15} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-md bg-brand-600 text-white"
                        : "rounded-bl-md border border-border bg-card text-foreground"
                    }`}
                  >
                    {message.text}
                    {streamingHere && (
                      <span
                        aria-hidden="true"
                        className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-current align-middle"
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {showTyping && (
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <UserRoundIcon size={15} />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {!hasUserMessage && !loading && (
              <div className="pt-1">
                <p className="mb-2 flex items-center gap-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <LightbulbIcon size={12} /> Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendQuestion(suggestion)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            className="flex shrink-0 items-center gap-2 border-t border-border bg-card p-3"
          >
            <input
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about skills, experience, projects..."
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      )}

      <button
        ref={toggleRef}
        onClick={() => (open ? closeChat() : setOpen(true))}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-ai-600 text-white shadow-2xl transition-transform hover:scale-105"
        aria-label={open ? "Close chatbot" : "Open AI assistant"}
        aria-expanded={open}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            {availability === "online" && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-3.5 w-3.5 rounded-full ${
                availability === "offline" ? "bg-red-500" : "bg-green-500"
              }`}
            />
          </span>
        )}
      </button>
    </div>
  );
}
