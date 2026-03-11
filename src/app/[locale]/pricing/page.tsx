"use client";

import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

export default function PricingPage() {
  const router = useRouter();
  const t = useTranslations("pricing");

  async function handleUpgrade() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) router.push(data.url);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0F2337", color: "white" }}>
      {/* Pricing section */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E67E22", marginBottom: "12px" }}>
            Plans
          </p>
          <h1 className="font-serif text-5xl tracking-tight text-white mb-4">{t("title")}</h1>
          <p style={{ color: "#6A90AA" }}>{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free card */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A90AA", marginBottom: "12px" }}>{t("freePlan")}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-serif text-4xl text-white">€0</span>
              <span style={{ color: "#6A90AA", fontSize: "0.875rem" }}>{t("perMonth")}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7" }}>
                <span style={{ color: "#E67E22" }}>✓</span>{t("freeFeature1")}
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7" }}>
                <span style={{ color: "#E67E22" }}>✓</span>{t("freeFeature2")}
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "rgba(255,255,255,0.25)" }}>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>✗</span>{t("freeFeatureNo")}
              </li>
            </ul>
            <Link href="/signup">
              <button style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: "7px", padding: "11px", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>
                {t("getStartedFree")}
              </button>
            </Link>
          </div>

          {/* Pro card */}
          <div style={{ background: "rgba(230,126,34,0.08)", border: "2px solid #E67E22", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column", position: "relative" }}>
            <span style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "#E67E22", color: "white", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", whiteSpace: "nowrap" }}>
              {t("mostPopular")}
            </span>
            <p style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E67E22", marginBottom: "12px" }}>{t("proPlan")}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-serif text-4xl text-white">€9</span>
              <span style={{ color: "#6A90AA", fontSize: "0.875rem" }}>{t("perMonth")}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7" }}>
                <span style={{ color: "#E67E22" }}>✓</span>{t("proFeature1")}
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7" }}>
                <span style={{ color: "#E67E22" }}>✓</span>{t("proFeature2")}
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "#8AAEC7" }}>
                <span style={{ color: "#E67E22" }}>✓</span>{t("proFeature3")}
              </li>
            </ul>
            <button
              onClick={handleUpgrade}
              style={{ width: "100%", background: "#E67E22", color: "white", border: "none", borderRadius: "7px", padding: "11px", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}
            >
              {t("upgradeToPro")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
