"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

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

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const t = useTranslations("resetPassword");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError(t("passwordMismatch"));
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {error && (
            <div style={{ padding: "10px 14px", fontSize: "0.825rem", color: "#FCA5A5", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "6px" }}>
              {error}
            </div>
          )}
          <div>
            <label style={labelStyle}>{t("newPassword")}</label>
            <input
              type="password"
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>{t("confirmPassword")}</label>
            <input
              type="password"
              placeholder={t("passwordPlaceholder")}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={6}
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
            {loading ? t("saving") : t("setNewPassword")}
          </button>
        </form>
      </div>
    </div>
  );
}
