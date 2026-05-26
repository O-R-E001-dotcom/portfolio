import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const CHATBOT_API_URL =
  import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:8010";

export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I can answer questions about Abolore from her CV.",
    },
  ]);

  const askQuestion = async (event) => {
    event.preventDefault();
    const cleanQuestion = question.trim();
    if (!cleanQuestion || loading) return;

    setQuestion("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: cleanQuestion }]);

    try {
      const response = await fetch(`${CHATBOT_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Chatbot request failed");

      setMessages((prev) => [...prev, { role: "assistant", text: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I could not reach the CV assistant right now. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-x-4 bottom-20 z-[1500] flex justify-end sm:inset-x-auto sm:right-5 sm:bottom-24">
      {open && (
        <div className="absolute bottom-16 right-0 flex max-h-[min(72vh,620px)] w-full flex-col overflow-hidden rounded-2xl border border-purple-900/70 bg-[#12051f] text-white shadow-2xl sm:w-[380px]">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-bold">Ask About Abolore</p>
              <p className="truncate text-xs text-white/60">Powered by her CV</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="shrink-0 rounded-full p-2 hover:bg-white/10"
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-purple-600 text-white"
                    : "mr-auto bg-white/10 text-white/90"
                }`}
              >
                {message.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto max-w-[88%] rounded-2xl bg-white/10 px-3 py-2 text-sm text-white/70">
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={askQuestion} className="flex shrink-0 gap-2 border-t border-white/10 p-3">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about skills, experience, projects..."
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/45 focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white transition hover:bg-purple-700 disabled:opacity-60"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white shadow-2xl transition hover:bg-purple-700"
        aria-label="Open chatbot"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
