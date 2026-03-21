"use client";

import { useEffect, useState } from "react";

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "14px",
  padding: "22px",
  width: "100%",
  boxShadow: "0 24px 56px rgba(0,0,0,0.35)",
};

const items = [
  { color: "#E74C3C", label: "Notice to vacate deadline",   date: "⚠ Due in 12 days — Mar 22", urgent: true  },
  { color: "#E67E22", label: "Annual rent increase clause", date: "Apr 1 — review recommended", urgent: false },
  { color: "#27AE60", label: "Lease renewal window opens",  date: "May 15 — 67 days away",      urgent: false },
];

export default function AppCardAnimated() {
  const [phase, setPhase] = useState<"scanning" | "done">("scanning");
  const [visibleItems, setVisibleItems] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar 0 → 100 over 1.6s
    const start = Date.now();
    const duration = 1600;
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          setPhase("done");
          // Reveal items one by one
          items.forEach((_, i) => {
            setTimeout(() => setVisibleItems(i + 1), i * 300);
          });
        }, 200);
      }
    }, 30);
    return () => clearInterval(tick);
  }, []);

  return (
    <div style={cardStyle}>
      <p style={{ fontFamily: "monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A8AAA", marginBottom: "10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        Apartment Lease — Just uploaded
      </p>
      <p style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.96rem", color: "white", marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        Rental Agreement 2024.pdf
      </p>

      {/* Scanning phase */}
      {phase === "scanning" && (
        <div style={{ padding: "8px 0 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <span style={{ fontSize: "0.72rem", color: "#4A8AAA", fontFamily: "monospace" }}>AI analyzing document</span>
            <span style={{ fontSize: "0.72rem", color: "#E67E22", fontFamily: "monospace", animation: "blink 1s step-end infinite" }}>▋</span>
          </div>
          {/* Progress bar */}
          <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #1565C0, #E67E22)",
              borderRadius: "2px",
              transition: "width 0.03s linear",
            }} />
          </div>
          <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", marginTop: "6px" }}>
            {progress < 40 ? "Reading clauses..." : progress < 75 ? "Extracting deadlines..." : "Generating summary..."}
          </p>
        </div>
      )}

      {/* Results phase */}
      {phase === "done" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "flex-start", gap: "9px",
                opacity: visibleItems > i ? 1 : 0,
                transform: visibleItems > i ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: item.color,
                marginTop: "5px", flexShrink: 0,
                boxShadow: item.urgent ? `0 0 6px ${item.color}` : "none",
                animation: item.urgent ? "pulse 2s ease-in-out infinite" : "none",
              }} />
              <div>
                <p style={{ fontSize: "0.76rem", color: "#9AC4DC", lineHeight: 1.4 }}>{item.label}</p>
                <p style={{ fontSize: "0.66rem", color: "#F5A623", fontFamily: "monospace" }}>{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Badge */}
      <div style={{
        marginTop: "14px",
        background: "rgba(230,126,34,0.14)",
        border: "1px solid rgba(230,126,34,0.28)",
        borderRadius: "6px",
        padding: "7px 11px",
        fontSize: "0.72rem",
        color: "#F5A623",
        opacity: phase === "done" && visibleItems >= items.length ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        ✦ 3 obligations found · 1 urgent reminder set
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px #E74C3C; }
          50%       { opacity: 0.6; box-shadow: 0 0 10px #E74C3C; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
