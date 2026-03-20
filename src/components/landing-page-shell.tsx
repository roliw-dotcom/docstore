import Image from "next/image";
import Link from "next/link";
import HowItWorks from "@/components/how-it-works";
import ProductMockup from "@/components/product-mockup";

interface Bullet {
  text: string;
}

interface LandingPageShellProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  bullets: Bullet[];
  ctaText: string;
  ctaHref: string;
  trustLine?: string;
  quote?: string;
  screenshotSrc?: string;
  screenshotAlt?: string;
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "1px" }}>
      <circle cx="9" cy="9" r="9" fill="rgba(230,126,34,0.15)" />
      <polyline points="5,9 8,12 13,6" fill="none" stroke="#E67E22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
  screenshotAlt = "bAIndly dashboard",
}: LandingPageShellProps) {
  const hasScreenshot = Boolean(screenshotSrc);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1929", color: "white", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.4rem", color: "white" }}>
            b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>ndly
          </span>
          <Link href={ctaHref}>
            <button className="btn-ghost" style={{
              background: "transparent",
              color: "#E67E22",
              border: "1px solid rgba(230,126,34,0.4)",
              borderRadius: "6px",
              padding: "8px 18px",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-inter, sans-serif)",
            }}>
              Get started →
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", padding: "clamp(48px, 8vw, 88px) 24px", position: "relative", overflow: "hidden" }}>

        {/* Ambient glow behind headline */}
        <div style={{
          position: "absolute",
          top: "-10%", left: "-5%",
          width: "55%", height: "70%",
          background: "radial-gradient(ellipse at 30% 40%, rgba(230,126,34,0.07) 0%, rgba(21,101,192,0.06) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}
          className="lp-hero-grid"
        >
          {/* Left column: copy */}
          <div>
            {/* Mobile visual */}
            <div className="block md:hidden" style={{ marginBottom: "36px" }}>
              {hasScreenshot ? (
                <Image
                  src={screenshotSrc!}
                  alt={screenshotAlt}
                  width={600}
                  height={400}
                  style={{ width: "100%", height: "auto", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                  priority
                />
              ) : (
                <ProductMockup />
              )}
            </div>

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
              fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
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
              fontFamily: "var(--font-inter, sans-serif)",
            }}>
              {subheadline}
            </p>

            {/* Bullets */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0", display: "flex", flexDirection: "column", gap: "14px" }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <CheckIcon />
                  <span style={{ fontSize: "0.9rem", color: "#C0D8E8", lineHeight: 1.55, fontFamily: "var(--font-inter, sans-serif)" }}>{b.text}</span>
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
                  boxShadow: "0 4px 24px rgba(230,126,34,0.38)",
                  fontFamily: "var(--font-inter, sans-serif)",
                }}
                className="btn-cta"
              >
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
              <div style={{ marginTop: "52px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 28, height: 2, background: "#E67E22", marginBottom: 18, opacity: 0.5 }} />
                <p style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: "1rem",
                  color: "#6A90AA",
                  fontStyle: "italic",
                  lineHeight: 1.65,
                  marginBottom: 12,
                }}>
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Right column: visual — desktop only */}
          <div className="hidden md:flex" style={{ alignItems: "center", justifyContent: "center" }}>
            {hasScreenshot ? (
              <Image
                src={screenshotSrc!}
                alt={screenshotAlt}
                width={600}
                height={400}
                style={{ width: "100%", height: "auto", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
                priority
              />
            ) : (
              <ProductMockup />
            )}
          </div>
        </div>
      </main>

      {/* How it works */}
      <section style={{ padding: "0 24px 80px", background: "#081520" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", paddingTop: "72px" }}>
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#E67E22",
            textAlign: "center",
            marginBottom: "12px",
          }}>
            The process
          </p>
          <h2 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            color: "white",
            textAlign: "center",
            marginBottom: "36px",
          }}>
            How it works
          </h2>
          <HowItWorks />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1rem", color: "rgba(255,255,255,0.3)" }}>
            b<span style={{ color: "rgba(230,126,34,0.5)", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>ndly
          </span>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {[
              { href: "/en/privacy", label: "Privacy" },
              { href: "/en/terms",   label: "Terms" },
              { href: "/en/login",   label: "Sign in" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter, sans-serif)" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 767px) {
          .lp-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
