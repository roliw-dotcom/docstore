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
      <div className="absolute" style={{ width, height, background: color, bottom, left, transform: `rotate(${rotate})`, borderRadius: "3px 10px 10px 3px", zIndex, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12), 0 4px 12px rgba(0,0,0,0.4)" }} />
      <div className="absolute" style={{ width: "5%", height, background: spine, bottom, left, transform: `rotate(${rotate})`, borderRadius: "3px 0 0 3px", zIndex }} />
      <div className="absolute" style={{ width: "28%", height: `calc(${height} * 0.38)`, background: "rgba(255,255,255,0.13)", bottom: `calc(${bottom} + ${height} * 0.31)`, left: `calc(${left} + 7%)`, transform: `rotate(${rotate})`, borderRadius: "2px", zIndex: zIndex + 1 }} />
      <div className="absolute" style={{ width: "1.8%", height: "1.8%", background: spine, borderRadius: "50%", bottom: `calc(${bottom} + ${height} * 0.25)`, left: `calc(${left} + 1.5%)`, transform: `rotate(${rotate})`, zIndex: zIndex + 1, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }} />
      <div className="absolute" style={{ width: "1.8%", height: "1.8%", background: spine, borderRadius: "50%", bottom: `calc(${bottom} + ${height} * 0.55)`, left: `calc(${left} + 1.5%)`, transform: `rotate(${rotate})`, zIndex: zIndex + 1, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }} />
    </>
  );
}

function BinderChaosStack() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #1E1408 0%, #2E2010 40%, #120E04 70%, #201408 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "22%", background: "linear-gradient(0deg, #2A1C08, #1A1006)", zIndex: 1 }} />
      <Binder color="#D4891A" spine="#8A5510" width="72%" height="14%" bottom="32%" left="14%" rotate="2.5deg"  zIndex={2} />
      <Binder color="#B8741A" spine="#7A4A10" width="66%" height="13%" bottom="44%" left="17%" rotate="-2deg"  zIndex={3} />
      <Binder color="#E8A020" spine="#A06418" width="74%" height="15%" bottom="55%" left="12%" rotate="4deg"   zIndex={4} />
      <Binder color="#C47C18" spine="#844E0E" width="60%" height="13%" bottom="68%" left="20%" rotate="-3deg"  zIndex={5} />
      <Binder color="#F0A820" spine="#AA6C14" width="68%" height="14%" bottom="79%" left="15%" rotate="1.5deg" zIndex={6} />
      <Binder color="#B06818" spine="#784210" width="50%" height="13%" bottom="26%" left="5%"  rotate="-9deg"  zIndex={7} />
      <div className="absolute" style={{ width: "55%", height: "2.5%", background: "rgba(255,248,230,0.45)", bottom: "56%", left: "19%", transform: "rotate(4deg)", zIndex: 8 }} />
      <div className="absolute" style={{ width: "44%", height: "2%",   background: "rgba(255,248,230,0.35)", bottom: "69%", left: "23%", transform: "rotate(-3deg)", zIndex: 8 }} />
      <div className="absolute" style={{ width: "36%", height: "2%",   background: "rgba(255,248,230,0.25)", bottom: "80%", left: "18%", transform: "rotate(1.5deg)", zIndex: 8 }} />
    </div>
  );
}

// ── Product UI Mockup ────────────────────────────────────────────────────────
function ProductMockup() {
  return (
    <div style={{
      width: "min(480px, 100%)",
      borderRadius: "14px",
      overflow: "hidden",
      boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)",
    }}>
      {/* Browser chrome */}
      <div style={{
        background: "#060F1A",
        padding: "9px 14px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {(["#555","#555","#555"] as const).map((c, i) => (
          <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
        ))}
        <div style={{
          flex: 1, marginLeft: 10,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 4, height: 20,
          display: "flex", alignItems: "center", paddingLeft: 10,
        }}>
          <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
            baindly.com/en/dashboard
          </span>
        </div>
      </div>

      {/* Dashboard UI */}
      <div style={{ background: "#0F2337", padding: "16px 18px 18px" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 14, paddingBottom: 12,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{ fontSize: "0.85rem", color: "white", fontFamily: "var(--font-dm-serif)" }}>
            My Documents
          </span>
          <span style={{
            fontSize: "0.6rem", background: "#E67E22",
            color: "white", padding: "5px 11px",
            borderRadius: 5, fontWeight: 600,
          }}>+ Upload</span>
        </div>

        {/* 2 mini document cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {/* Urgent card */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(231,76,60,0.3)",
            borderRadius: 8, padding: "10px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <span style={{ fontSize: "0.55rem", color: "#F5A623", fontFamily: "monospace", textTransform: "uppercase" }}>Legal</span>
              <span style={{ fontSize: "0.48rem", background: "rgba(231,76,60,0.15)", color: "#E74C3C", padding: "1px 5px", borderRadius: 10 }}>urgent</span>
            </div>
            <p style={{ fontSize: "0.66rem", color: "white", fontWeight: 500, lineHeight: 1.3, marginBottom: 7 }}>
              Rental Agreement<br />2024.pdf
            </p>
            <div style={{ fontSize: "0.56rem", color: "#E74C3C", fontFamily: "monospace" }}>⚠ Due in 12 days</div>
          </div>

          {/* Ready card */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8, padding: "10px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <span style={{ fontSize: "0.55rem", color: "#4A8AAA", fontFamily: "monospace", textTransform: "uppercase" }}>Insurance</span>
              <span style={{ fontSize: "0.48rem", background: "rgba(39,174,96,0.15)", color: "#4ADE80", padding: "1px 5px", borderRadius: 10 }}>ready</span>
            </div>
            <p style={{ fontSize: "0.66rem", color: "white", fontWeight: 500, lineHeight: 1.3, marginBottom: 7 }}>
              Health Insurance<br />Policy.pdf
            </p>
            <div style={{ fontSize: "0.56rem", color: "#6A90AA", fontFamily: "monospace" }}>Renewal: Jan 2026</div>
          </div>
        </div>

        {/* Animated AI card */}
        <AppCardAnimated />
      </div>
    </div>
  );
}

// ── Feature Icons ────────────────────────────────────────────────────────────
function IconExtract() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M11 2l2 6h6l-5 3.5 2 6L11 14l-5 3.5 2-6L3 8h6L11 2z" fill="#E67E22" fillOpacity="0.85"/>
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="8.5" stroke="#E67E22" strokeWidth="1.5" strokeOpacity="0.85"/>
      <path d="M11 6.5V11l3.5 3.5" stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.85"/>
    </svg>
  );
}
function IconBell() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M11 3a6 6 0 0 1 6 6c0 3.5 1.5 4.5 2 5.5H3c.5-1 2-2 2-5.5a6 6 0 0 1 6-6z" stroke="#E67E22" strokeWidth="1.5" strokeOpacity="0.85"/>
      <path d="M9 15.5a2 2 0 0 0 4 0" stroke="#E67E22" strokeWidth="1.5" strokeOpacity="0.85"/>
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="6.5" stroke="#E67E22" strokeWidth="1.5" strokeOpacity="0.85"/>
      <path d="M15 15l4 4" stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.85"/>
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="4.5" y="10" width="13" height="10" rx="2" stroke="#E67E22" strokeWidth="1.5" strokeOpacity="0.85"/>
      <path d="M7.5 10V8a3.5 3.5 0 0 1 7 0v2" stroke="#E67E22" strokeWidth="1.5" strokeOpacity="0.85"/>
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="8.5" stroke="#E67E22" strokeWidth="1.5" strokeOpacity="0.85"/>
      <path d="M11 2.5c-2.5 3.5-2.5 13.5 0 17M11 2.5c2.5 3.5 2.5 13.5 0 17M2.5 11h17" stroke="#E67E22" strokeWidth="1.5" strokeOpacity="0.85"/>
    </svg>
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

  const featureItems = [
    { Icon: IconExtract, title: t("featureExtractTitle"),  desc: t("featureExtractDesc") },
    { Icon: IconClock,   title: t("featureTrackTitle"),    desc: t("featureTrackDesc") },
    { Icon: IconBell,    title: t("featureRemindTitle"),   desc: t("featureRemindDesc") },
    { Icon: IconSearch,  title: t("featureSearchTitle"),   desc: t("featureSearchDesc") },
    { Icon: IconLock,    title: t("featurePrivateTitle"),  desc: t("featurePrivateDesc") },
    { Icon: IconGlobe,   title: t("featureLanguageTitle"), desc: t("featureLanguageDesc") },
  ];

  const quotes = locale === "de"
    ? [
        { quote: "Zwischen Schulorganisation, Versicherungsverlängerungen und Arztterminen hab ich ständig etwas übersehen. bAIndly ist jetzt das organisierte Familienmitglied.", who: "Mutter von 2, München" },
        { quote: "Ich manage 6 Kundenverträge gleichzeitig. bAIndly zeigt mir jedes Kündigungsfenster bevor ich überhaupt daran denke. Jeden Cent wert.", who: "Freiberufliche Designerin, Berlin" },
        { quote: "Ich hab meinen Mietvertrag hochgeladen und hatte alle Klauseln und Fristen in unter einer Minute markiert.", who: "Mieter, Hamburg" },
      ]
    : [
        { quote: "Between school letters, insurance renewals and medical referrals, I was always missing something. bAIndly is now the organised family member.", who: "Parent of 2, Munich" },
        { quote: "I juggle 6 client contracts at once. bAIndly flags every cancellation window before I even think to check. Worth every cent.", who: "Freelance consultant, Berlin" },
        { quote: "Uploaded my lease and had every clause and deadline flagged in under a minute. I had no idea what I'd signed.", who: "Renter, Hamburg" },
      ];

  return (
    <div style={{ background: "#0F2337", color: "white" }}>

      {/* ── Hero ── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "580px" }}>

        {/* Left: binders background, gradient overlay, text on top */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: "580px", display: "flex", alignItems: "center" }}>
          <BinderChaosStack />
          <div style={{
            position: "absolute", inset: 0, zIndex: 9,
            background: "linear-gradient(100deg, rgba(10,25,41,0.92) 0%, rgba(10,25,41,0.78) 55%, rgba(10,25,41,0.25) 100%)",
          }} />
          <div style={{ position: "relative", zIndex: 10, padding: "clamp(32px, 6vw, 56px) clamp(20px, 6vw, 50px)" }}>
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
              fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)",
              lineHeight: 1.1,
              color: "white",
              marginBottom: "22px",
            }}>
              {t("heroTitle")}
            </h1>
            <p style={{
              color: "#8AAEC7",
              fontSize: "0.9rem",
              lineHeight: 1.75,
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
                  padding: "13px 28px",
                  borderRadius: "7px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(230,126,34,0.35)",
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

        {/* Right: product UI mockup */}
        <div style={{
          background: "linear-gradient(160deg, #0D1E2E 0%, #0F2337 60%, #081829 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "580px",
          padding: "40px 28px",
        }}>
          <ProductMockup />
        </div>

      </section>

      {/* ── Social proof ── */}
      <section style={{
        background: "#0A1929",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        padding: "60px 24px",
      }}>
        <div className="max-w-5xl mx-auto">
          <p style={{
            textAlign: "center",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#E67E22",
            fontFamily: "monospace",
            marginBottom: "44px",
          }}>
            {locale === "de" ? "Was Nutzer sagen" : "What users say"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {quotes.map(({ quote, who }, i) => (
              <div key={i}>
                <div style={{ width: 28, height: 2, background: "#E67E22", marginBottom: 20, opacity: 0.45 }} />
                <p style={{
                  fontSize: "0.875rem",
                  color: "#8AAEC7",
                  lineHeight: 1.8,
                  marginBottom: 18,
                  fontStyle: "italic",
                }}>
                  &ldquo;{quote}&rdquo;
                </p>
                <p style={{
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "monospace",
                }}>
                  — {who}
                </p>
              </div>
            ))}
          </div>
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
      <section style={{ background: "#0F2337", padding: "72px 24px" }}>
        <div className="max-w-3xl mx-auto">
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#E67E22",
            textAlign: "center",
            marginBottom: "12px",
          }}>
            {locale === "de" ? "Der Prozess" : "The process"}
          </p>
          <h2 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            color: "white",
            textAlign: "center",
            marginBottom: "40px",
          }}>
            {locale === "de" ? "So funktioniert es" : "How it works"}
          </h2>
          <HowItWorks locale={locale} />
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ background: "#0A1929", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-6">
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
            fontSize: "1.75rem",
            color: "white",
            marginBottom: "56px",
            maxWidth: "480px",
          }}>
            {t("featureSectionTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
            {featureItems.map(({ Icon, title, desc }) => (
              <div key={title}>
                <div style={{ marginBottom: "14px" }}><Icon /></div>
                <div style={{ width: "28px", height: "2px", background: "#E67E22", marginBottom: "14px", opacity: 0.6 }} />
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
      <section style={{ background: "#0F2337", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div style={{
            background: "rgba(230,126,34,0.07)",
            border: "1px solid rgba(230,126,34,0.18)",
            borderRadius: "16px",
            padding: "clamp(32px, 5vw, 56px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "white", marginBottom: "10px" }}>
                {t("ctaTitle")}
              </h2>
              <p style={{ color: "#6A90AA", fontSize: "0.875rem", maxWidth: "420px", lineHeight: 1.7 }}>
                {t("ctaDesc")}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
              <Link href="/signup">
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
                  boxShadow: "0 4px 20px rgba(230,126,34,0.3)",
                }}>
                  {t("getStartedFree")} →
                </button>
              </Link>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
                {t("freeNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "36px 0" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <span style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.1rem", color: "white" }}>
              b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>ndly
            </span>
            <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", fontFamily: "monospace", marginTop: "4px" }}>
              © {new Date().getFullYear()} bAIndly
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
            {[
              { href: "/pricing",   label: t("pricing") },
              { href: "/privacy",   label: t("privacy") },
              { href: "/terms",     label: t("terms") },
              { href: "/impressum", label: t("impressum") },
              { href: "/login",     label: t("signIn") },
              { href: "/signup",    label: t("footerSignUp") },
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
