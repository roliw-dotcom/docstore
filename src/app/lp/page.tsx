import Link from "next/link";

const pages = [
  {
    href: "/lp/fine-print",
    title: "Stop Losing Money to the Fine Print",
    lang: "EN",
    keyword: "fine print contracts",
  },
  {
    href: "/lp/freelancer-contracts",
    title: "Your Contracts Have Deadlines Your Calendar Doesn't Know About",
    lang: "EN",
    keyword: "freelancer contract review",
  },
  {
    href: "/lp/deadline-tracker",
    title: "Every Document You Sign Has a Deadline",
    lang: "EN",
    keyword: "document deadline tracker",
  },
  {
    href: "/lp/kuendigungsfrist",
    title: "Nie wieder die Kündigungsfrist verpassen",
    lang: "DE",
    keyword: "Kündigungsfrist Mietvertrag",
  },
  {
    href: "/lp/mietvertrag-ki",
    title: "KI liest deinen Mietvertrag",
    lang: "DE",
    keyword: "Mietvertrag KI",
  },
];

export default function LandingPageIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A1929", color: "white", padding: "48px 24px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        <p style={{ fontFamily: "monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E67E22", marginBottom: "12px" }}>
          Internal
        </p>
        <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "2rem", marginBottom: "8px" }}>
          Ad Landing Pages
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6A90AA", marginBottom: "40px" }}>
          {pages.length} pages · <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "#E67E22" }}>Google Ads ↗</a>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {pages.map((p) => (
            <div
              key={p.href}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <span style={{
                    fontSize: "0.65rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.08em",
                    background: p.lang === "DE" ? "rgba(99,102,241,0.2)" : "rgba(16,185,129,0.15)",
                    color: p.lang === "DE" ? "#A5B4FC" : "#6EE7B7",
                    border: `1px solid ${p.lang === "DE" ? "rgba(99,102,241,0.3)" : "rgba(16,185,129,0.25)"}`,
                    borderRadius: "4px",
                    padding: "2px 7px",
                  }}>
                    {p.lang}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#6A90AA", fontFamily: "monospace" }}>
                    {p.keyword}
                  </span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "white", margin: 0 }}>{p.title}</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: "4px 0 0", fontFamily: "monospace" }}>
                  bainder.com{p.href}
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                <Link
                  href={p.href}
                  target="_blank"
                  style={{
                    fontSize: "0.78rem",
                    color: "#E67E22",
                    border: "1px solid rgba(230,126,34,0.3)",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    textDecoration: "none",
                  }}
                >
                  Preview ↗
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: "48px", fontSize: "0.72rem", color: "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>
          To add a page: create src/app/lp/[slug]/page.tsx and add it to this list.
        </p>
      </div>
    </div>
  );
}
