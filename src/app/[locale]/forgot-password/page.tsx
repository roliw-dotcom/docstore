"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslations, useLocale } from "next-intl";

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "14px",
  padding: "clamp(20px, 5vw, 36px)",
  width: "100%",
  maxWidth: "420px",
};

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

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const t = useTranslations("forgotPassword");
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const redirectTo = `${window.location.origin}/auth/callback?next=/${locale}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0F2337", padding: "24px" }}>
      <div style={cardStyle}>
        <div style={{ marginBottom: "28px" }}>
          <div className="font-serif text-2xl text-white mb-1">
            b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>nder
          </div>
          <p style={{ fontSize: "0.875rem", color: "#6A90AA" }}>{t("description")}</p>
        </div>

        {sent ? (
          <div>
            <div style={{ padding: "14px", fontSize: "0.875rem", color: "#86EFAC", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "6px", marginBottom: "20px" }}>
              {t("sentMessage", { email })}
            </div>
            <Link href="/login" style={{ fontSize: "0.825rem", color: "#E67E22" }}>
              {t("backToSignIn")}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {error && (
              <div style={{ padding: "10px 14px", fontSize: "0.825rem", color: "#FCA5A5", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "6px" }}>
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
              }}
            >
              {loading ? t("sending") : t("sendResetLink")}
            </button>
            <p style={{ fontSize: "0.825rem", textAlign: "center", color: "#6A90AA" }}>
              <Link href="/login" style={{ color: "#E67E22" }}>
                {t("backToSignIn")}
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
