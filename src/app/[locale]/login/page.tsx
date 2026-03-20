"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

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

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
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
              Your documents, deadlines and obligations — all in one place.
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
              &ldquo;I had no idea what I&rsquo;d signed — bAIndly showed me everything in under a
              minute.&rdquo; — Renter, Hamburg
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

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "6px",
                  }}
                >
                  <label style={{ ...labelStyle, marginBottom: 0 }}>{t("password")}</label>
                  <Link href="/forgot-password" style={{ fontSize: "0.75rem", color: "#6A90AA" }}>
                    {t("forgotPassword")}
                  </Link>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ ...inputStyle, paddingRight: "42px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6A90AA",
                      padding: 0,
                      lineHeight: 1,
                    }}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
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
                {loading ? t("signingIn") : t("signIn")}
              </button>
            </form>

            <p style={{ marginTop: "20px", fontSize: "0.825rem", textAlign: "center", color: "#6A90AA" }}>
              {t("noAccount")}{" "}
              <Link href="/signup" style={{ color: "#E67E22" }}>
                {t("createOne")}
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
