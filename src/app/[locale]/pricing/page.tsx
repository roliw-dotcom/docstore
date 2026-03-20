"use client";

import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(230,126,34,0.15)" />
      <polyline points="4.5,8 7,10.5 11.5,5.5" fill="none" stroke="#E67E22" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.04)" />
      <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function PricingPage() {
  const router = useRouter();
  const t = useTranslations("pricing");

  async function handleUpgrade() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) router.push(data.url);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0F2337", color: "white", position: "relative", overflow: "hidden" }}>
      {/* Ambient radial glow */}
      <div style={{
        position: "absolute",
        top: "10%", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(230,126,34,0.08) 0%, rgba(21,101,192,0.05) 40%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Page content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Logotype header */}
        <div style={{ textAlign: "center", paddingTop: "48px", paddingBottom: "0" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
            <span style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', Georgia, serif)", fontSize: "1.5rem", color: "white", letterSpacing: "-0.02em" }}>b</span>
            <span style={{ fontFamily: "var(--font-inter, Inter, sans-serif)", fontSize: "1.5rem", fontWeight: 700, color: "#E67E22", letterSpacing: "-0.02em" }}>AI</span>
            <span style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', Georgia, serif)", fontSize: "1.5rem", color: "white", letterSpacing: "-0.02em" }}>ndly</span>
          </Link>
        </div>

        {/* Pricing section */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <p style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E67E22", marginBottom: "12px" }}>
              Plans
            </p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', Georgia, serif)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.02em", color: "white", marginBottom: "16px", lineHeight: 1.15 }}>
              {t("title")}
            </h1>
            <p style={{ color: "#6A90AA", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>{t("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free card */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px",
              padding: "clamp(20px, 5vw, 32px)",
              display: "flex",
              flexDirection: "column",
            }}>
              <p style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A90AA", marginBottom: "12px" }}>
                {t("freePlan")}
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', Georgia, serif)", fontSize: "2.5rem", color: "white" }}>€0</span>
                <span style={{ color: "#6A90AA", fontSize: "0.875rem", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>{t("perMonth")}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#6A90AA", marginBottom: "24px", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                Get started for free
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                  <CheckIcon />{t("freeFeature1")}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                  <CheckIcon />{t("freeFeature2")}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                  <CrossIcon />{t("freeFeatureNo")}
                </li>
              </ul>
              <Link href="/signup">
                <button style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: "7px", padding: "11px", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                  {t("getStartedFree")}
                </button>
              </Link>
            </div>

            {/* Pro card */}
            <div style={{
              background: "rgba(230,126,34,0.08)",
              border: "2px solid #E67E22",
              borderRadius: "14px",
              padding: "clamp(20px, 5vw, 32px)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 0 0 1px rgba(230,126,34,0.3), 0 24px 48px rgba(230,126,34,0.08), 0 8px 16px rgba(0,0,0,0.4)",
            }}>
              <span style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "#E67E22", color: "white", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", whiteSpace: "nowrap", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                {t("mostPopular")}
              </span>
              <p style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E67E22", marginBottom: "12px" }}>
                {t("proPlan")}
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span style={{ fontFamily: "var(--font-dm-serif, 'DM Serif Display', Georgia, serif)", fontSize: "2.5rem", color: "white" }}>€9</span>
                <span style={{ color: "#6A90AA", fontSize: "0.875rem", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>{t("perMonth")}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#6A90AA", marginBottom: "24px", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                Everything you need, nothing you don&apos;t
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                  <CheckIcon />{t("proFeature1")}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                  <CheckIcon />{t("proFeature2")}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7", fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
                  <CheckIcon />{t("proFeature3")}
                </li>
              </ul>
              <button
                onClick={handleUpgrade}
                style={{
                  width: "100%",
                  background: "#E67E22",
                  color: "white",
                  border: "none",
                  borderRadius: "7px",
                  padding: "11px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-inter, Inter, sans-serif)",
                  boxShadow: "0 4px 24px rgba(230,126,34,0.38)",
                }}
              >
                {t("upgradeToPro")}
              </button>
            </div>
          </div>

          {/* Trust line */}
          <p style={{
            textAlign: "center",
            marginTop: "28px",
            fontFamily: "monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.25)",
          }}>
            No contracts · Cancel anytime · GDPR compliant
          </p>
        </section>
      </div>
    </div>
  );
}
