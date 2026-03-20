"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import { trackConversion, trackAdsConversion } from "@/components/google-analytics";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "6px",
  padding: "10px 14px",
  color: "white",
  fontSize: "0.875rem",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  color: "#8AAEC7",
  marginBottom: "6px",
};

export default function SignupPage() {
  const supabase = createClient();
  const t = useTranslations("signup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      trackConversion("sign_up", { method: "email" });
      trackAdsConversion(process.env.NEXT_PUBLIC_GADS_SIGNUP_LABEL ?? "");
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F2337",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "clamp(28px, 5vw, 44px)",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "1.5rem",
              color: "white",
              marginBottom: "10px",
            }}
          >
            {t("checkEmailTitle")}
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#6A90AA", marginBottom: "20px" }}>
            {t("checkEmailDesc", { email })}
          </p>
          <Link href="/login" style={{ fontSize: "0.825rem", color: "#E67E22" }}>
            {t("backToSignIn")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "45fr 55fr" }}
        className="auth-grid"
      >
        {/* Left panel */}
        <div
          className="auth-left"
          style={{
            background: "#081520",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(40px, 6vw, 72px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 40% 50%, rgba(230,126,34,0.1) 0%, rgba(21,101,192,0.07) 45%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Logo */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: "1.6rem",
                color: "white",
                fontFamily: "var(--font-dm-serif, Georgia, serif)",
                letterSpacing: "-0.01em",
              }}
            >
              b
              <span
                style={{
                  color: "#E67E22",
                  fontFamily: "var(--font-inter, sans-serif)",
                  fontWeight: 700,
                }}
              >
                AI
              </span>
              ndly
            </div>
          </div>

          {/* Center content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontFamily: "var(--font-dm-serif, Georgia, serif)",
                fontStyle: "italic",
                fontSize: "1.15rem",
                color: "#8AAEC7",
                maxWidth: "320px",
                lineHeight: 1.6,
                marginBottom: "32px",
              }}
            >
              Stop missing deadlines buried in fine print. Let AI handle it.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "✦ AI extracts every deadline automatically",
                "✦ Email reminders before anything is due",
                "✦ GDPR compliant · Data stays yours",
              ].map((point) => (
                <span
                  key={point}
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {point}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontStyle: "italic",
                color: "#6A90AA",
                fontSize: "0.8rem",
                lineHeight: 1.6,
                maxWidth: "300px",
              }}
            >
              &ldquo;Worth every cent. I manage 6 contracts and miss nothing now.&rdquo; — Freelancer,
              Berlin
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div
          style={{
            background: "#0F2337",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "clamp(28px, 5vw, 44px)",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ marginBottom: "28px" }}>
              <div className="font-serif text-2xl text-white mb-1">
                b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>ndly
              </div>
              <p style={{ fontSize: "0.875rem", color: "#6A90AA" }}>{t("description")}</p>
            </div>

            <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {error && (
                <div
                  style={{
                    padding: "10px 14px",
                    fontSize: "0.825rem",
                    color: "#FCA5A5",
                    background: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: "6px",
                  }}
                >
                  {error}
                </div>
              )}
              <div>
                <label style={labelStyle}>{t("email")}</label>
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>{t("password")}</label>
                <input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? "rgba(230,126,34,0.5)" : "#E67E22",
                  color: "white",
                  border: "none",
                  borderRadius: "7px",
                  padding: "12px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  marginTop: "4px",
                  transition: "all 0.15s",
                  boxShadow: "0 4px 20px rgba(230,126,34,0.3)",
                }}
              >
                {loading ? t("creatingAccount") : t("createAccount")}
              </button>
            </form>

            <p style={{ marginTop: "20px", fontSize: "0.825rem", textAlign: "center", color: "#6A90AA" }}>
              {t("alreadyHaveAccount")}{" "}
              <Link href="/login" style={{ color: "#E67E22" }}>
                {t("signIn")}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .auth-grid { grid-template-columns: 1fr !important; }
          .auth-left { display: none !important; }
        }
        input:focus {
          border-color: rgba(230,126,34,0.6) !important;
          box-shadow: 0 0 0 3px rgba(230,126,34,0.12) !important;
          outline: none !important;
        }
        button[type="submit"]:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
}
