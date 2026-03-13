"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  fontFamily: "monospace",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "7px",
  padding: "10px 14px",
  color: "white",
  fontSize: "0.875rem",
  outline: "none",
};

const saveBtn: React.CSSProperties = {
  background: "#E67E22",
  color: "white",
  border: "none",
  borderRadius: "7px",
  padding: "9px 20px",
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
  alignSelf: "flex-start",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", margin: 0 }}>{title}</h2>
      {children}
    </div>
  );
}

function Feedback({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <p style={{ fontSize: "0.8rem", color: ok ? "#4ADE80" : "#FCA5A5", marginTop: "2px" }}>{msg}</p>
  );
}

export default function AccountSettingsPage() {
  const t = useTranslations("accountSettings");
  const ta = useTranslations("account");
  const locale = useLocale();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [currentName, setCurrentName] = useState("");

  const [nameFeedback, setNameFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const [emailFeedback, setEmailFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const [passwordFeedback, setPasswordFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

  const [nameLoading, setNameLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentEmail(user.email ?? "");
      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      const name = profile?.display_name ?? "";
      setCurrentName(name);
      setDisplayName(name);
    }
    load();
  }, []);

  async function saveName() {
    if (displayName === currentName) return;
    setNameLoading(true);
    setNameFeedback(null);
    const res = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ display_name: displayName }),
    });
    setNameLoading(false);
    if (res.ok) {
      setCurrentName(displayName);
      setNameFeedback({ msg: t("saved"), ok: true });
    } else {
      const d = await res.json();
      setNameFeedback({ msg: d.error ?? t("errorGeneric"), ok: false });
    }
  }

  async function saveEmail() {
    if (!email.trim() || email === currentEmail) return;
    setEmailLoading(true);
    setEmailFeedback(null);
    const res = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setEmailLoading(false);
    if (res.ok) {
      const d = await res.json();
      if (d.emailConfirmationSent) {
        setEmailFeedback({ msg: t("emailConfirmationSent", { email }), ok: true });
      } else {
        setEmailFeedback({ msg: t("saved"), ok: true });
      }
    } else {
      const d = await res.json();
      setEmailFeedback({ msg: d.error ?? t("errorGeneric"), ok: false });
    }
  }

  async function sendPasswordReset() {
    setPasswordLoading(true);
    setPasswordFeedback(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(currentEmail, {
      redirectTo: `${window.location.origin}/${locale}/dashboard/settings/account`,
    });
    setPasswordLoading(false);
    if (error) {
      setPasswordFeedback({ msg: error.message, ok: false });
    } else {
      setPasswordFeedback({ msg: t("passwordResetSent"), ok: true });
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    const res = await fetch("/api/account", { method: "DELETE" });
    if (res.ok) {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
    } else {
      setDeleting(false);
    }
  }

  return (
    <div style={{ maxWidth: "480px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 className="font-serif text-2xl text-white">{t("title")}</h1>
        <p style={{ fontSize: "0.875rem", color: "#6A90AA", marginTop: "4px" }}>{t("subtitle")}</p>
      </div>

      {/* Profile */}
      <Section title={t("profileSection")}>
        <div>
          <p style={labelStyle}>{t("displayName")}</p>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder={t("displayNamePlaceholder")}
            style={inputStyle}
          />
          {nameFeedback && <Feedback {...nameFeedback} />}
        </div>
        <button
          onClick={saveName}
          disabled={nameLoading || displayName === currentName}
          style={{ ...saveBtn, opacity: nameLoading || displayName === currentName ? 0.4 : 1 }}
        >
          {nameLoading ? t("saving") : t("save")}
        </button>
      </Section>

      {/* Email */}
      <Section title={t("emailSection")}>
        <div>
          <p style={labelStyle}>{t("emailAddress")}</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          {emailFeedback && <Feedback {...emailFeedback} />}
          {!emailFeedback && (
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", marginTop: "6px" }}>
              {t("emailHint")}
            </p>
          )}
        </div>
        <button
          onClick={saveEmail}
          disabled={emailLoading || !email.trim() || email === currentEmail}
          style={{ ...saveBtn, opacity: emailLoading || !email.trim() || email === currentEmail ? 0.4 : 1 }}
        >
          {emailLoading ? t("saving") : t("saveEmail")}
        </button>
      </Section>

      {/* Password */}
      <Section title={t("passwordSection")}>
        <p style={{ fontSize: "0.875rem", color: "#6A90AA" }}>{t("passwordDesc")}</p>
        {passwordFeedback && <Feedback {...passwordFeedback} />}
        <button
          onClick={sendPasswordReset}
          disabled={passwordLoading}
          style={{
            alignSelf: "flex-start",
            background: "transparent",
            color: "#8AAEC7",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "7px",
            padding: "9px 20px",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: passwordLoading ? "not-allowed" : "pointer",
            opacity: passwordLoading ? 0.5 : 1,
          }}
        >
          {passwordLoading ? t("sending") : t("sendPasswordReset")}
        </button>
      </Section>

      {/* Danger zone */}
      <div style={{ ...cardStyle, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)" }}>
        <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#FCA5A5", margin: 0 }}>{ta("dangerZone")}</h2>
        <p style={{ fontSize: "0.875rem", color: "#6A90AA" }}>{ta("confirmDesc")}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={deleting}
              style={{ alignSelf: "flex-start", background: "rgba(239,68,68,0.15)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "7px", padding: "9px 18px", fontSize: "0.875rem", fontWeight: 600, cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.6 : 1 }}
            >
              {deleting ? ta("deleting") : ta("deleteAccount")}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{ta("confirmTitle")}</AlertDialogTitle>
              <AlertDialogDescription>{ta("confirmDesc")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{ta("cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">
                {ta("confirm")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
