interface HowItWorksProps {
  locale?: string;
}

const steps = {
  en: [
    { top: "Upload",    bottom: "document"    },
    { top: "AI reads",  bottom: "fine print"  },
    { top: "AI detects", bottom: "deadlines"  },
    { top: "Reminders", bottom: "scheduled"   },
    { top: "Ask & Manage", bottom: "documents" },
  ],
  de: [
    { top: "Hochladen",  bottom: "deines Dokuments"   },
    { top: "KI liest",   bottom: "das Kleingedruckte" },
    { top: "KI erkennt", bottom: "Fristen"              },
    { top: "Erinnerung", bottom: "geplant"             },
    { top: "Fragen & Verwalten", bottom: "von Dokumenten" },
  ],
};

const nodes = [
  // 1 — Document upload
  (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      <rect x="10" y="4" width="30" height="38" rx="3" fill="#1565C0"/>
      <path d="M36 4 L40 10 L36 10 Z" fill="#0D47A1"/>
      <line x1="16" y1="20" x2="34" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="16" y1="28" x2="34" y2="28" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="16" y1="36" x2="28" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  // 2 — AI reads fine print (magnifying glass + AI badge)
  (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      {/* Lens */}
      <circle cx="26" cy="26" r="18" fill="#1565C0"/>
      {/* Text lines inside lens */}
      <line x1="17" y1="20" x2="34" y2="20" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="17" y1="26" x2="32" y2="26" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="17" y1="32" x2="28" y2="32" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Handle */}
      <line x1="39" y1="39" x2="52" y2="52" stroke="#0D47A1" strokeWidth="6" strokeLinecap="round"/>
      {/* AI badge */}
      <circle cx="52" cy="12" r="10" fill="#E67E22"/>
      <text x="52" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">AI</text>
    </svg>
  ),
  // 3 — Deadlines detected (calendar + AI badge)
  (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      {/* Calendar body */}
      <rect x="6" y="12" width="40" height="34" rx="4" fill="#1565C0"/>
      {/* Header */}
      <rect x="6" y="12" width="40" height="12" rx="4" fill="#0D47A1"/>
      <rect x="6" y="19" width="40" height="5" fill="#0D47A1"/>
      {/* Pin tabs */}
      <rect x="15" y="6" width="5" height="10" rx="2.5" fill="#1A3A6A"/>
      <rect x="32" y="6" width="5" height="10" rx="2.5" fill="#1A3A6A"/>
      {/* Date grid */}
      <circle cx="16" cy="33" r="3" fill="rgba(255,255,255,0.35)"/>
      <circle cx="26" cy="33" r="3" fill="rgba(255,255,255,0.35)"/>
      <circle cx="36" cy="33" r="3" fill="rgba(255,255,255,0.35)"/>
      <circle cx="16" cy="42" r="3" fill="rgba(255,255,255,0.35)"/>
      {/* Highlighted deadline */}
      <circle cx="26" cy="42" r="5" fill="#E74C3C"/>
      <circle cx="36" cy="42" r="3" fill="rgba(255,255,255,0.35)"/>
      {/* AI badge */}
      <circle cx="52" cy="12" r="10" fill="#E67E22"/>
      <text x="52" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">AI</text>
    </svg>
  ),
  // 4 — Checkmark
  (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      <circle cx="32" cy="32" r="26" fill="#1565C0"/>
      <polyline points="19,32 26,40 45,20" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 5 — Chat bubble with document lines
  (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      <rect x="6" y="8" width="44" height="32" rx="8" fill="#1565C0"/>
      <line x1="14" y1="19" x2="38" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="14" y1="27" x2="34" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      {/* chat tail */}
      <path d="M14 40 L10 52 L24 44" fill="#1565C0"/>
      {/* small AI spark */}
      <circle cx="48" cy="10" r="8" fill="#E67E22"/>
      <text x="48" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white" fontFamily="Arial">AI</text>
    </svg>
  ),
];

export default function HowItWorks({ locale = "en" }: HowItWorksProps) {
  const labels = locale === "de" ? steps.de : steps.en;

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: "16px",
      padding: "28px 24px",
    }}>

      {/* ── Mobile: vertical pipeline ── */}
      <div className="flex flex-col md:hidden" style={{ gap: 0 }}>
        {nodes.map((node, i) => (
          <div key={i} style={{ display: "flex", alignItems: "stretch", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "52px", flexShrink: 0 }}>
              <div style={{ zIndex: 1 }}>{node}</div>
              {i < nodes.length - 1 && (
                <div style={{ width: "3px", flex: 1, background: "#1A3550", minHeight: "24px" }} />
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", paddingBottom: i < nodes.length - 1 ? "24px" : 0 }}>
              <div>
                <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>{labels[i].top}</p>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#6A90AA", lineHeight: 1.3 }}>{labels[i].bottom}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop: horizontal pipeline ── */}
      <div className="hidden md:flex" style={{ alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
        <div style={{ position: "absolute", top: "26px", left: "26px", right: "26px", height: "3px", background: "#1A3550", zIndex: 0 }} />
        {nodes.map((node, i) => (
          <div key={i} style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "20%" }}>
            {node}
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>{labels[i].top}</p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#6A90AA", lineHeight: 1.3 }}>{labels[i].bottom}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
