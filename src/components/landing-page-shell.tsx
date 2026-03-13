import Link from "next/link";

interface Bullet {
  text: string;
}

interface LandingPageShellProps {
  /** Small label above headline */
  eyebrow: string;
  headline: string;
  subheadline: string;
  bullets: Bullet[];
  ctaText: string;
  ctaHref: string;
  /** Small trust line below CTA */
  trustLine?: string;
  /** Optional social proof quote */
  quote?: string;
  /** Page accent — defaults to orange */
  locale?: string;
}

export default function LandingPageShell({
  eyebrow,
  headline,
  subheadline,
  bullets,
  ctaText,
  ctaHref,
  trustLine,
  quote,
}: LandingPageShellProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#0A1929", color: "white", display: "flex", flexDirection: "column" }}>

      {/* Minimal header */}
      <header style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.4rem", color: "white" }}>
            b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>nder
          </span>
        </div>
      </header>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", padding: "clamp(48px, 8vw, 96px) 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", width: "100%" }}>

          {/* Eyebrow */}
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#E67E22",
            marginBottom: "20px",
          }}>
            {eyebrow}
          </p>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)",
            lineHeight: 1.12,
            color: "white",
            marginBottom: "20px",
          }}>
            {headline}
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: "1rem",
            color: "#8AAEC7",
            lineHeight: 1.7,
            marginBottom: "36px",
            maxWidth: "520px",
          }}>
            {subheadline}
          </p>

          {/* Bullets */}
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: "#E67E22", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                <span style={{ fontSize: "0.9rem", color: "#C0D8E8", lineHeight: 1.55 }}>{b.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
            <Link href={ctaHref}>
              <button style={{
                background: "#E67E22",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "16px 36px",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}>
                {ctaText} →
              </button>
            </Link>
            {trustLine && (
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                {trustLine}
              </p>
            )}
          </div>

          {/* Quote */}
          {quote && (
            <div style={{
              marginTop: "56px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "var(--font-dm-serif)",
              fontSize: "1rem",
              color: "#6A90AA",
              fontStyle: "italic",
              lineHeight: 1.6,
            }}>
              &ldquo;{quote}&rdquo;
            </div>
          )}
        </div>
      </main>

      {/* Minimal footer */}
      <footer style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[
            { href: "/en/privacy", label: "Privacy" },
            { href: "/en/terms", label: "Terms" },
            { href: "/en/login", label: "Sign in" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
