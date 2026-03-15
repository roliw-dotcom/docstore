interface HowItWorksProps {
  locale?: string;
}

const steps = {
  en: [
    { top: "Upload",    bottom: "contract"   },
    { top: "AI reads",  bottom: "fine print" },
    { top: "Deadlines", bottom: "detected"   },
    { top: "Reminders", bottom: "scheduled"  },
  ],
  de: [
    { top: "Hochladen",  bottom: "deines Vertrags" },
    { top: "KI liest",   bottom: "das Kleingedruckte" },
    { top: "Fristen",    bottom: "erkannt"       },
    { top: "Erinnerung", bottom: "geplant"       },
  ],
};

export default function HowItWorks({ locale = "en" }: HowItWorksProps) {
  const labels = locale === "de" ? steps.de : steps.en;

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: "16px",
      padding: "36px 40px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
        {/* connecting line */}
        <div style={{ position: "absolute", top: "32px", left: "32px", right: "32px", height: "3px", background: "#1A3550", zIndex: 0 }} />

        {[
          {
            node: (
              <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
                <rect x="10" y="4" width="30" height="38" rx="3" fill="#1565C0"/>
                <path d="M36 4 L40 10 L36 10 Z" fill="#0D47A1"/>
                <line x1="16" y1="20" x2="34" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="16" y1="28" x2="34" y2="28" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="16" y1="36" x2="28" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            ),
          },
          {
            node: (
              <div style={{ width: "64px", height: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1A3550", border: "4px solid #2E6A9E" }} />
              </div>
            ),
          },
          {
            node: (
              <div style={{ width: "64px", height: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1A3550", border: "4px solid #2E6A9E" }} />
              </div>
            ),
          },
          {
            node: (
              <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
                <circle cx="32" cy="32" r="26" fill="#1565C0"/>
                <polyline points="19,32 26,40 45,20" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
          },
        ].map((s, i) => (
          <div key={i} style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "25%" }}>
            {s.node}
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>{labels[i].top}</p>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#6A90AA", lineHeight: 1.3 }}>{labels[i].bottom}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
