import { redirect } from "next/navigation";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";

// ── CSS Binder Chaos Stack ──────────────────────────────────────────────────
function BinderChaosStack() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Warm gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(145deg, #2C2015 0%, #3E3020 35%, #1C1608 60%, #302218 100%)" }}
      />
      {/* Desk surface */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "30%", background: "linear-gradient(0deg, #3A2810, #2A1C0A)", zIndex: 1 }}
      />
      {/* Binder 1 */}
      <div className="absolute" style={{ width: "65%", height: "10%", background: "#C07828", bottom: "40%", left: "18%", transform: "rotate(2deg)", borderRadius: "3px 8px 8px 3px", zIndex: 2 }} />
      <div className="absolute" style={{ width: "4%", height: "10%", background: "#8A5020", bottom: "40%", left: "18%", transform: "rotate(2deg)", borderRadius: "3px 0 0 3px", zIndex: 2 }} />
      {/* Binder 2 */}
      <div className="absolute" style={{ width: "60%", height: "10%", background: "#9A6020", bottom: "49%", left: "20%", transform: "rotate(-1.5deg)", borderRadius: "3px 8px 8px 3px", zIndex: 2 }} />
      <div className="absolute" style={{ width: "4%", height: "10%", background: "#6A4015", bottom: "49%", left: "20%", transform: "rotate(-1.5deg)", borderRadius: "3px 0 0 3px", zIndex: 2 }} />
      {/* Binder 3 */}
      <div className="absolute" style={{ width: "68%", height: "11%", background: "#E09030", bottom: "58%", left: "16%", transform: "rotate(3.5deg)", borderRadius: "3px 8px 8px 3px", zIndex: 2 }} />
      <div className="absolute" style={{ width: "4%", height: "11%", background: "#A06020", bottom: "58%", left: "16%", transform: "rotate(3.5deg)", borderRadius: "3px 0 0 3px", zIndex: 2 }} />
      {/* Binder 4 */}
      <div className="absolute" style={{ width: "55%", height: "9%", background: "#B07028", bottom: "68%", left: "22%", transform: "rotate(-3deg)", borderRadius: "3px 8px 8px 3px", zIndex: 2 }} />
      <div className="absolute" style={{ width: "4%", height: "9%", background: "#7A4C18", bottom: "68%", left: "22%", transform: "rotate(-3deg)", borderRadius: "3px 0 0 3px", zIndex: 2 }} />
      {/* Binder 5 */}
      <div className="absolute" style={{ width: "62%", height: "10%", background: "#D08030", bottom: "76%", left: "19%", transform: "rotate(4deg)", borderRadius: "3px 8px 8px 3px", zIndex: 2 }} />
      <div className="absolute" style={{ width: "4%", height: "10%", background: "#905520", bottom: "76%", left: "19%", transform: "rotate(4deg)", borderRadius: "3px 0 0 3px", zIndex: 2 }} />
      {/* Fallen binder */}
      <div className="absolute" style={{ width: "45%", height: "8%", background: "#A86825", bottom: "36%", left: "8%", transform: "rotate(-8deg)", borderRadius: "3px 8px 8px 3px", zIndex: 2, opacity: 0.8 }} />
      {/* Papers sticking out */}
      <div className="absolute" style={{ width: "50%", height: "2%", background: "rgba(255,248,235,0.4)", bottom: "59%", left: "22%", transform: "rotate(3.5deg)", zIndex: 3 }} />
      <div className="absolute" style={{ width: "40%", height: "2%", background: "rgba(255,248,235,0.3)", bottom: "69%", left: "26%", transform: "rotate(-3deg)", zIndex: 3 }} />
    </div>
  );
}

// ── Glassmorphism App Card ──────────────────────────────────────────────────
function AppCard() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "14px",
      padding: "22px",
      width: "270px",
      boxShadow: "0 24px 56px rgba(0,0,0,0.35)",
    }}>
      <p style={{ fontFamily: "monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A8AAA", marginBottom: "10px" }}>
        Apartment Lease — Just uploaded
      </p>
      <p style={{ fontFamily: "var(--font-dm-serif)", fontSize: "0.96rem", color: "white", marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        Rental Agreement 2024.pdf
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E74C3C", marginTop: "5px", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: "0.76rem", color: "#9AC4DC", lineHeight: 1.4 }}>Notice to vacate deadline</p>
            <p style={{ fontSize: "0.66rem", color: "#F5A623", fontFamily: "monospace" }}>⚠ Due in 12 days — Mar 22</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E67E22", marginTop: "5px", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: "0.76rem", color: "#9AC4DC", lineHeight: 1.4 }}>Annual rent increase clause</p>
            <p style={{ fontSize: "0.66rem", color: "#F5A623", fontFamily: "monospace" }}>Apr 1 — review recommended</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#27AE60", marginTop: "5px", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: "0.76rem", color: "#9AC4DC", lineHeight: 1.4 }}>Lease renewal window opens</p>
            <p style={{ fontSize: "0.66rem", color: "#F5A623", fontFamily: "monospace" }}>May 15 — 67 days away</p>
          </div>
        </div>
      </div>
      <div style={{
        marginTop: "14px",
        background: "rgba(230,126,34,0.14)",
        border: "1px solid rgba(230,126,34,0.28)",
        borderRadius: "6px",
        padding: "7px 11px",
        fontSize: "0.72rem",
        color: "#F5A623",
      }}>
        ✦ 3 obligations found · 1 urgent reminder set
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function RootPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect(`/${locale}/dashboard`);
  }

  const t = await getTranslations("landing");

  return (
    <div style={{ background: "#0F2337", color: "white" }}>

      {/* ── Hero ── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "480px" }}>

        {/* Left: binder art + text overlay */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <BinderChaosStack />
          {/* Dark overlay for text legibility */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 3,
            background: "linear-gradient(100deg, rgba(15,35,55,0.92) 0%, rgba(15,35,55,0.65) 50%, rgba(15,35,55,0.2) 100%)",
          }} />
          {/* Content */}
          <div style={{
            position: "relative", zIndex: 4,
            padding: "clamp(32px, 6vw, 56px) clamp(20px, 6vw, 50px)",
            display: "flex", flexDirection: "column", justifyContent: "center",
            minHeight: "480px",
          }}>
            <p style={{
              fontFamily: "monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#E67E22",
              marginBottom: "20px",
            }}>
              {t("heroTagline")}
            </p>
            <h1 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(1.8rem, 3vw, 2.55rem)",
              lineHeight: 1.13,
              color: "white",
              marginBottom: "22px",
            }}>
              {t("heroTitle")}
            </h1>
            <p style={{
              color: "#8AAEC7",
              fontSize: "0.9rem",
              lineHeight: 1.72,
              marginBottom: "34px",
              maxWidth: "400px",
            }}>
              {t("heroDesc")}
            </p>
            <div style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
              <Link href="/signup">
                <button style={{
                  background: "#E67E22",
                  color: "white",
                  padding: "13px 26px",
                  borderRadius: "7px",
                  fontSize: "0.86rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}>
                  {t("getStartedFree")} →
                </button>
              </Link>
              <Link href="/login" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>
                {t("signInArrow")}
              </Link>
            </div>
            <p style={{
              marginTop: "14px",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.28)",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}>
              {t("freeNote")}
            </p>
          </div>
        </div>

        {/* Right: glassmorphism app card */}
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          background: "rgba(8,20,32,0.96)",
        }}>
          <AppCard />
        </div>
      </section>

      {/* ── Tagline bar ── */}
      <div style={{
        background: "rgba(8,20,32,0.98)",
        borderTop: "1px solid rgba(230,126,34,0.18)",
        padding: "13px 24px",
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#C4956A",
        fontStyle: "italic",
        fontFamily: "var(--font-dm-serif)",
      }}>
        &ldquo;Free for your first 10 documents — no credit card required&rdquo;
      </div>

      {/* ── Features ── */}
      <section style={{ background: "#0F2337", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section label */}
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#E67E22",
            marginBottom: "10px",
          }}>
            What bAInder does
          </p>
          <h2 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "1.7rem",
            color: "white",
            marginBottom: "48px",
          }}>
            Every document. Every deadline. Under control.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
            {[
              { title: t("featureExtractTitle"), desc: t("featureExtractDesc") },
              { title: t("featureTrackTitle"),   desc: t("featureTrackDesc") },
              { title: t("featureRemindTitle"),  desc: t("featureRemindDesc") },
              { title: t("featureUploadTitle"),  desc: t("featureUploadDesc") },
              { title: t("featureSearchTitle"),  desc: t("featureSearchDesc") },
              { title: t("featurePrivateTitle"), desc: t("featurePrivateDesc") },
            ].map(({ title, desc }) => (
              <div key={title}>
                <div style={{ width: "32px", height: "2px", background: "#E67E22", marginBottom: "16px" }} />
                <h3 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.05rem", color: "white", marginBottom: "8px" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6A90AA", lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section style={{ background: "rgba(8,20,32,0.98)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.9rem", color: "white", marginBottom: "8px" }}>
              {t("ctaTitle")}
            </h2>
            <p style={{ color: "#6A90AA", fontSize: "0.875rem" }}>
              {t("ctaDesc")}
            </p>
          </div>
          <Link href="/signup" className="flex-shrink-0">
            <button style={{
              background: "#E67E22",
              color: "white",
              padding: "14px 32px",
              borderRadius: "7px",
              fontSize: "0.95rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}>
              {t("getStartedFree")} →
            </button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 0" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
            © {new Date().getFullYear()} bainder
          </span>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
            {[
              { href: "/pricing",    label: t("pricing") },
              { href: "/privacy",    label: t("privacy") },
              { href: "/terms",      label: t("terms") },
              { href: "/impressum",  label: t("impressum") },
              { href: "/login",      label: t("signIn") },
              { href: "/signup",     label: t("footerSignUp") },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}
                className="hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
