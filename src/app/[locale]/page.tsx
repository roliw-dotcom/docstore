import { redirect } from "next/navigation";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import HowItWorks from "@/components/how-it-works";
import ProductMockup from "@/components/product-mockup";

// ── CSS Binder Chaos Stack ──────────────────────────────────────────────────
function Binder({ color, spine, pageEdge, width, height, bottom, left, rotate, zIndex }: {
  color: string; spine: string; pageEdge: string; width: string; height: string;
  bottom: string; left: string; rotate: string; zIndex: number;
}) {
  return (
    <>
      {/* Main body */}
      <div className="absolute" style={{ width, height, background: color, bottom, left, transform: `rotate(${rotate})`, borderRadius: "3px 10px 10px 3px", zIndex, boxShadow: `inset 0 2px 0 rgba(255,255,255,0.1), inset -2px 0 8px rgba(0,0,0,0.25), 0 6px 18px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.4)` }} />
      {/* Spine */}
      <div className="absolute" style={{ width: "6%", height, background: spine, bottom, left, transform: `rotate(${rotate})`, borderRadius: "3px 0 0 3px", zIndex, boxShadow: "inset -2px 0 4px rgba(0,0,0,0.3)" }} />
      {/* Page edge — white sliver on the right */}
      <div className="absolute" style={{ width: "3%", height: `calc(${height} * 0.94)`, background: pageEdge, bottom: `calc(${bottom} + ${height} * 0.03)`, left: `calc(${left} + ${width} - 3%)`, transform: `rotate(${rotate})`, borderRadius: "0 8px 8px 0", zIndex, opacity: 0.85 }} />
      {/* Label paper */}
      <div className="absolute" style={{ width: "30%", height: `calc(${height} * 0.36)`, background: "rgba(255,255,255,0.11)", bottom: `calc(${bottom} + ${height} * 0.32)`, left: `calc(${left} + 8%)`, transform: `rotate(${rotate})`, borderRadius: "2px", zIndex: zIndex + 1, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)" }} />
      {/* Ring dots */}
      <div className="absolute" style={{ width: "1.8%", height: "1.8%", background: spine, borderRadius: "50%", bottom: `calc(${bottom} + ${height} * 0.25)`, left: `calc(${left} + 1.8%)`, transform: `rotate(${rotate})`, zIndex: zIndex + 1, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6)" }} />
      <div className="absolute" style={{ width: "1.8%", height: "1.8%", background: spine, borderRadius: "50%", bottom: `calc(${bottom} + ${height} * 0.55)`, left: `calc(${left} + 1.8%)`, transform: `rotate(${rotate})`, zIndex: zIndex + 1, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6)" }} />
    </>
  );
}

function BinderChaosStack() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0D1008 0%, #181410 45%, #0E0C08 70%, #141008 100%)" }} />

      {/* Warm lamp glow from top-right */}
      <div className="absolute" style={{ width: "60%", height: "60%", top: "-10%", right: "-10%", background: "radial-gradient(ellipse, rgba(200,140,60,0.13) 0%, transparent 70%)", zIndex: 1 }} />

      {/* Shelf surface — solid dark wood plank */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "20%", background: "linear-gradient(0deg, #1C1208 0%, #2A1C0E 55%, #3A2614 100%)", zIndex: 2 }} />
      {/* Top edge of shelf — bright highlight line */}
      <div className="absolute" style={{ bottom: "20%", left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent 0%, rgba(180,130,60,0.5) 20%, rgba(220,170,80,0.75) 50%, rgba(180,130,60,0.5) 80%, transparent 100%)", zIndex: 3 }} />
      {/* Surface sheen / reflection */}
      <div className="absolute" style={{ bottom: "14%", left: "5%", right: "5%", height: "5%", background: "radial-gradient(ellipse at 50% 0%, rgba(220,170,80,0.12) 0%, transparent 70%)", zIndex: 3 }} />
      {/* Wood grain lines */}
      <div className="absolute" style={{ bottom: "16%", left: "8%", right: "8%", height: "1px", background: "rgba(0,0,0,0.25)", zIndex: 3 }} />
      <div className="absolute" style={{ bottom: "12%", left: "15%", right: "20%", height: "1px", background: "rgba(0,0,0,0.18)", zIndex: 3 }} />

      {/* Binders — varied leather colors */}
      <Binder color="#C4822A" spine="#7A4E18" pageEdge="#F0EAD6" width="70%" height="14%" bottom="36%" left="15%" rotate="2.5deg"  zIndex={4} />
      <Binder color="#2A5A6B" spine="#1A3A47" pageEdge="#E8EEF0" width="64%" height="13%" bottom="48%" left="18%" rotate="-2deg"  zIndex={5} />
      <Binder color="#6B2430" spine="#44161E" pageEdge="#F0E8E8" width="72%" height="15%" bottom="59%" left="13%" rotate="3.5deg"  zIndex={6} />
      <Binder color="#3A5A3A" spine="#243A24" pageEdge="#E8F0E8" width="58%" height="13%" bottom="72%" left="21%" rotate="-2.5deg" zIndex={7} />
      <Binder color="#C4882A" spine="#7A5418" pageEdge="#F0EAD6" width="66%" height="14%" bottom="83%" left="16%" rotate="1.5deg"  zIndex={8} />
      <Binder color="#3A3A6B" spine="#242450" pageEdge="#E8E8F0" width="48%" height="13%" bottom="30%" left="6%"  rotate="-8deg"   zIndex={9} />

      {/* Paper strips / loose sheets */}
      <div className="absolute" style={{ width: "52%", height: "2%", background: "rgba(240,236,220,0.4)", bottom: "60.5%", left: "20%", transform: "rotate(3.5deg)", zIndex: 10, borderRadius: "1px" }} />
      <div className="absolute" style={{ width: "42%", height: "1.8%", background: "rgba(232,236,240,0.3)", bottom: "73.5%", left: "24%", transform: "rotate(-2.5deg)", zIndex: 10, borderRadius: "1px" }} />
      <div className="absolute" style={{ width: "34%", height: "1.8%", background: "rgba(232,240,232,0.22)", bottom: "84.5%", left: "19%", transform: "rotate(1.5deg)", zIndex: 10, borderRadius: "1px" }} />
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
