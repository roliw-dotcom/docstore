import Image from "next/image";
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
  /** Optional product screenshot — place file in /public/screenshots/ */
  screenshotSrc?: string;
  screenshotAlt?: string;
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
  screenshotSrc,
  screenshotAlt = "bAInder dashboard",
}: LandingPageShellProps) {
  const hasScreenshot = Boolean(screenshotSrc);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1929", color: "white", display: "flex", flexDirection: "column" }}>

      {/* Minimal header */}
      <header style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: hasScreenshot ? "1100px" : "680px", margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.4rem", color: "white" }}>
            b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>nder
          </span>
        </div>
      </header>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", padding: "clamp(48px, 8vw, 96px) 24px" }}>
        <div style={{
          maxWidth: hasScreenshot ? "1100px" : "640px",
          margin: "0 auto",
          width: "100%",
          display: hasScreenshot ? "grid" : "block",
          gridTemplateColumns: hasScreenshot ? "1fr 1fr" : undefined,
          gap: hasScreenshot ? "clamp(40px, 6vw, 80px)" : undefined,
          alignItems: hasScreenshot ? "center" : undefined,
        }}>
          {/* Left column: copy */}
          <div>
            {/* Screenshot — mobile only (above text) */}
            {hasScreenshot && (
              <div className="block md:hidden" style={{ marginBottom: "36px" }}>
                <Image
                  src={screenshotSrc!}
                  alt={screenshotAlt}
                  width={600}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                  priority
                />
              </div>
            )}

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
          </div>{/* end left column */}

          {/* Right column: screenshot — desktop only */}
          {hasScreenshot && (
            <div className="hidden md:flex" style={{ alignItems: "center" }}>
              <Image
                src={screenshotSrc!}
                alt={screenshotAlt}
                width={600}
                height={400}
                style={{ width: "100%", height: "auto", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
                priority
              />
            </div>
          )}
        </div>
      </main>

      {/* How it works */}
      <section style={{ padding: "0 24px 72px" }}>
        <div style={{ maxWidth: hasScreenshot ? "1100px" : "720px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            color: "white",
            textAlign: "center",
            marginBottom: "28px",
          }}>
            How it works
          </h2>

          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "16px",
            padding: "28px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "24px",
          }}>
            {[
              {
                label: <><strong>Upload</strong> contract</>,
                icon: (
                  <svg viewBox="0 0 40 40" width="38" height="38" fill="none">
                    <rect x="7" y="4" width="18" height="24" rx="2" fill="#1E6FA8" opacity="0.9"/>
                    <path d="M21 4 L25 8 L21 8 Z" fill="#155E91"/>
                    <line x1="11" y1="13" x2="21" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="11" y1="17" x2="21" y2="17" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="29" cy="30" r="8" fill="#0F4C75"/>
                    <path d="M29 34 L29 27 M26 30 L29 27 L32 30" stroke="#5BC8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                label: <>AI reads <strong>fine print</strong></>,
                icon: (
                  <svg viewBox="0 0 40 40" width="38" height="38" fill="none">
                    <circle cx="20" cy="20" r="14" fill="#0F4C75"/>
                    <path d="M14 24 C14 18 17 14 20 14 C23 14 26 18 26 24" stroke="#5BC8F5" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <circle cx="16" cy="22" r="2" fill="#5BC8F5"/>
                    <circle cx="24" cy="22" r="2" fill="#5BC8F5"/>
                    <path d="M17 27 C17 27 18.5 29 20 29 C21.5 29 23 27 23 27" stroke="#5BC8F5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M12 16 C9 13 9 9 12 8" stroke="#1E6FA8" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M28 16 C31 13 31 9 28 8" stroke="#1E6FA8" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                label: <><strong>Deadlines</strong> detected</>,
                icon: (
                  <svg viewBox="0 0 40 40" width="38" height="38" fill="none">
                    <rect x="7" y="10" width="26" height="22" rx="3" fill="#0F4C75"/>
                    <line x1="7" y1="16" x2="33" y2="16" stroke="#5BC8F5" strokeWidth="1.5"/>
                    <rect x="13" y="6" width="3" height="7" rx="1.5" fill="#1E6FA8"/>
                    <rect x="24" y="6" width="3" height="7" rx="1.5" fill="#1E6FA8"/>
                    <circle cx="26" cy="28" r="6" fill="#1E6FA8"/>
                    <path d="M22.5 28 L25 30.5 L29.5 25.5" stroke="#5BC8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                label: <><strong>Reminders</strong> scheduled</>,
                icon: (
                  <svg viewBox="0 0 40 40" width="38" height="38" fill="none">
                    <path d="M20 6 C13 6 10 12 10 18 L10 24 L8 27 L32 27 L30 24 L30 18 C30 12 27 6 20 6 Z" fill="#0F4C75"/>
                    <path d="M10 18 L10 24 L8 27 L32 27 L30 24 L30 18" stroke="#1E6FA8" strokeWidth="1"/>
                    <path d="M17 27 C17 28.7 18.3 30 20 30 C21.7 30 23 28.7 23 27" fill="#1E6FA8"/>
                    <circle cx="20" cy="6" r="2.5" fill="#5BC8F5"/>
                    <line x1="15" y1="18" x2="25" y2="18" stroke="#5BC8F5" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="15" y1="22" x2="22" y2="22" stroke="#5BC8F5" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ flexShrink: 0 }}>{step.icon}</div>
                <p style={{ fontSize: "0.88rem", color: "#C0D8E8", lineHeight: 1.4, margin: 0 }}>
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
