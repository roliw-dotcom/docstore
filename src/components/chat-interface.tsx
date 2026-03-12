"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Optimistically add empty assistant message for streaming
    setMessages([...newMessages, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessages([...newMessages, { role: "assistant", content: `Error: ${err.error ?? res.statusText}` }]);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages([...newMessages, { role: "assistant", content: assistantText }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: t("errorMessage") }]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", minHeight: "400px" }}>

      {/* Message area */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px", padding: "8px 0 16px" }}>
        {messages.length === 0 && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", padding: "40px 0", color: "#6A90AA" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.2rem", color: "white", marginBottom: "8px" }}>{t("emptyTitle")}</p>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{t("emptyDesc")}</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "440px" }}>
              {[t("suggestion1"), t("suggestion2"), t("suggestion3")].map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); textareaRef.current?.focus(); }}
                  style={{
                    fontSize: "0.775rem",
                    color: "#6A90AA",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    padding: "6px 14px",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: msg.role === "user" ? "#E67E22" : "rgba(255,255,255,0.06)",
                border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                fontSize: "0.875rem",
                color: msg.role === "user" ? "white" : "#D0E4F0",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {msg.content || (loading && i === messages.length - 1 ? (
                <span style={{ opacity: 0.5 }}>▋</span>
              ) : null)}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "flex-end",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "16px",
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("placeholder")}
          rows={1}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "10px 14px",
            color: "white",
            fontSize: "0.875rem",
            resize: "none",
            outline: "none",
            lineHeight: 1.5,
            maxHeight: "120px",
            overflowY: "auto",
            fontFamily: "inherit",
          }}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, 120) + "px";
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          style={{
            background: "#E67E22",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            opacity: input.trim() && !loading ? 1 : 0.4,
            flexShrink: 0,
            transition: "opacity 0.15s",
          }}
        >
          {loading ? "…" : t("send")}
        </button>
      </form>
    </div>
  );
}
