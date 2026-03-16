"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

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
  const searchParams = useSearchParams();
  const t = useTranslations("resetPassword");

  const [ready, setReady] = useState(false);
  const [initialising, setInitialising] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function init() {
      // PKCE flow: ?code=xxx in the URL — exchange it client-side
      // (the verifier cookie lives in the browser, so this must happen here)
      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setError(t("invalidLink"));
          setInitialising(false);
          return;
        }
        setReady(true);
        setInitialising(false);
        return;
      }

      // Implicit flow: #access_token=xxx&type=recovery in the URL hash
      if (typeof window !== "undefined") {
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const access_token = hash.get("access_token");
        const refresh_token = hash.get("refresh_token") ?? "";
        const type = hash.get("type");
        if (access_token && type === "recovery") {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) {
            setError(t("invalidLink"));
            setInitialising(false);
            return;
          }
          setReady(true);
          setInitialising(false);
          return;
        }
      }

      // Already authenticated via a prior session (e.g. from the server callback)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setReady(true);
      } else {
        setError(t("invalidLink"));
      }
      setInitialising(false);
    }
    init();
  }, []);

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
      setDone(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0F2337", padding: "24px" }}>
      <div style={cardStyle}>
        <div style={{ marginBottom: "28px" }}>
          <div className="font-serif text-2xl text-white mb-1">
            b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>ndly
          </div>
          <p style={{ fontSize: "0.875rem", color: "#6A90AA" }}>{t("description")}</p>
        </div>

        {initialising && (
          <p style={{ fontSize: "0.875rem", color: "#6A90AA" }}>{t("verifying")}</p>
        )}

        {!initialising && error && !ready && (
          <div>
            <div style={{ padding: "10px 14px", fontSize: "0.825rem", color: "#FCA5A5", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "6px", marginBottom: "16px" }}>
              {error}
            </div>
            <Link href="/forgot-password" style={{ fontSize: "0.825rem", color: "#E67E22" }}>
              {t("requestNewLink")}
            </Link>
          </div>
        )}

        {!initialising && done && (
          <div style={{ padding: "14px", fontSize: "0.875rem", color: "#86EFAC", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "6px" }}>
            {t("success")}
          </div>
        )}

        {!initialising && ready && !done && (
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
        )}
      </div>
    </div>
  );
}
