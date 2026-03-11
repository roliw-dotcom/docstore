"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const t = useTranslations("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0F2337", padding: "24px" }}>
      <div style={cardStyle}>
        <div style={{ marginBottom: "28px" }}>
          <div className="font-serif text-2xl text-white mb-1">
            b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>nder
          </div>
          <p style={{ fontSize: "0.875rem", color: "#6A90AA" }}>{t("description")}</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
          <div>
            <label style={labelStyle}>{t("password")}</label>
            <input
              type="password"
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
  );
}
