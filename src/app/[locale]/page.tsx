import { redirect } from "next/navigation";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import HowItWorks from "@/components/how-it-works";
import AppCardAnimated from "@/components/app-card-animated";

// ── CSS Binder Chaos Stack ──────────────────────────────────────────────────
function Binder({ color, spine, width, height, bottom, left, rotate, zIndex }: {
  color: string; spine: string; width: string; height: string;
  bottom: string; left: string; rotate: string; zIndex: number;
}) {
  return (
    <>
      {/* Main body */}
      <div className="absolute" style={{ width, height, background: color, bottom, left, transform: `rotate(${rotate})`, borderRadius: "3px 10px 10px 3px", zIndex, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12), 0 4px 12px rgba(0,0,0,0.4)" }} />
      {/* Spine */}
      <div className="absolute" style={{ width: "5%", height, background: spine, bottom, left, transform: `rotate(${rotate})`, borderRadius: "3px 0 0 3px", zIndex }} />
      {/* Label strip */}
      <div className="absolute" style={{ width: "28%", height: `calc(${height} * 0.38)`, background: "rgba(255,255,255,0.13)", bottom: `calc(${bottom} + ${height} * 0.31)`, left: `calc(${left} + 7%)`, transform: `rotate(${rotate})`, borderRadius: "2px", zIndex: zIndex + 1 }} />
      {/* Ring holes on spine */}
      <div className="absolute" style={{ width: "1.8%", height: "1.8%", background: spine, borderRadius: "50%", bottom: `calc(${bottom} + ${height} * 0.25)`, left: `calc(${left} + 1.5%)`, transform: `rotate(${rotate})`, zIndex: zIndex + 1, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }} />
      <div className="absolute" style={{ width: "1.8%", height: "1.8%", background: spine, borderRadius: "50%", bottom: `calc(${bottom} + ${height} * 0.55)`, left: `calc(${left} + 1.5%)`, transform: `rotate(${rotate})`, zIndex: zIndex + 1, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }} />
    </>
  );
}

function BinderChaosStack() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #1E1408 0%, #2E2010 40%, #120E04 70%, #201408 100%)" }} />
      {/* Desk */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "22%", background: "linear-gradient(0deg, #2A1C08, #1A1006)", zIndex: 1 }} />

      <Binder color="#D4891A" spine="#8A5510" width="72%" height="14%" bottom="32%" left="14%" rotate="2.5deg"  zIndex={2} />
      <Binder color="#B8741A" spine="#7A4A10" width="66%" height="13%" bottom="44%" left="17%" rotate="-2deg"  zIndex={3} />
      <Binder color="#E8A020" spine="#A06418" width="74%" height="15%" bottom="55%" left="12%" rotate="4deg"   zIndex={4} />
      <Binder color="#C47C18" spine="#844E0E" width="60%" height="13%" bottom="68%" left="20%" rotate="-3deg"  zIndex={5} />
      <Binder color="#F0A820" spine="#AA6C14" width="68%" height="14%" bottom="79%" left="15%" rotate="1.5deg" zIndex={6} />
      {/* Fallen binder */}
      <Binder color="#B06818" spine="#784210" width="50%" height="13%" bottom="26%" left="5%"  rotate="-9deg"  zIndex={7} />

      {/* Papers sticking out */}
      <div className="absolute" style={{ width: "55%", height: "2.5%", background: "rgba(255,248,230,0.45)", bottom: "56%", left: "19%", transform: "rotate(4deg)", zIndex: 8 }} />
      <div className="absolute" style={{ width: "44%", height: "2%",   background: "rgba(255,248,230,0.35)", bottom: "69%", left: "23%", transform: "rotate(-3deg)", zIndex: 8 }} />
      <div className="absolute" style={{ width: "36%", height: "2%",   background: "rgba(255,248,230,0.25)", bottom: "80%", left: "18%", transform: "rotate(1.5deg)", zIndex: 8 }} />
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

        {/* Left: clean dark background + text */}
        <div style={{
          background: "#0A1929",
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

        {/* Right: animated app card demo */}
        <div style={{
          background: "#0F2337",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "480px",
          padding: "40px 24px",
        }}>
          <AppCardAnimated />
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
        &ldquo;{t("taglineQuote")}&rdquo;
      </div>

      {/* ── How it works ── */}
      <section style={{ background: "#0F2337", padding: "64px 24px" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            color: "white",
            textAlign: "center",
            marginBottom: "36px",
          }}>
            {locale === "de" ? "So funktioniert es" : "How it works"}
          </h2>
          <HowItWorks locale={locale} />
        </div>
      </section>

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
            {t("featureSectionLabel")}
          </p>
          <h2 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "1.7rem",
            color: "white",
            marginBottom: "48px",
          }}>
            {t("featureSectionTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
            {[
              { title: t("featureExtractTitle"),  desc: t("featureExtractDesc") },
              { title: t("featureTrackTitle"),    desc: t("featureTrackDesc") },
              { title: t("featureRemindTitle"),   desc: t("featureRemindDesc") },
              { title: t("featureSearchTitle"),   desc: t("featureSearchDesc") },
              { title: t("featurePrivateTitle"),  desc: t("featurePrivateDesc") },
              { title: t("featureLanguageTitle"), desc: t("featureLanguageDesc") },
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
            © {new Date().getFullYear()} bAInder
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
