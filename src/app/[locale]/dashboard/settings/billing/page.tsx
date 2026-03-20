"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";

interface Profile {
  tier: "free" | "pro";
  subscription_status: string | null;
  current_period_end: string | null;
}

export default function BillingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "1";
  const t = useTranslations("billing");
  const ta = useTranslations("account");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/stripe/profile");
      if (res.ok) setProfile(await res.json());
      setLoading(false);
    }
    load();
  }, []);

  async function handleUpgrade() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) router.push(data.url);
  }

  async function handlePortal() {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) router.push(data.url);
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

  const renewalDate = profile?.current_period_end
    ? new Date(profile.current_period_end).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : null;

  const cardStyle: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  return (
    <div style={{ maxWidth: "480px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 className="font-serif text-2xl" style={{ color: "#1A1A2E" }}>{t("title")}</h1>
        <p style={{ fontSize: "0.875rem", color: "#6B7280", marginTop: "4px" }}>{t("subtitle")}</p>
      </div>

      {success && (
        <div style={{ borderRadius: "8px", border: "1px solid rgba(22,163,74,0.25)", background: "rgba(22,163,74,0.07)", padding: "12px 16px", fontSize: "0.875rem", color: "#16A34A" }}>
          {t("subscriptionActivated")}
        </div>
      )}

      <div style={cardStyle}>
        {loading ? (
          <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{t("loading")}</p>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>{t("currentPlan")}</span>
              <span style={{
                fontSize: "0.65rem",
                fontFamily: "monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: "20px",
                background: profile?.tier === "pro" ? "rgba(230,126,34,0.12)" : "rgba(0,0,0,0.06)",
                color: profile?.tier === "pro" ? "#C86A10" : "#6B7280",
              }}>
                {profile?.tier ?? "free"}
              </span>
            </div>

            {profile?.tier === "pro" && renewalDate && (
              <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{t("renewsOn", { date: renewalDate })}</p>
            )}

            {profile?.tier === "free" ? (
              <div>
                <button
                  onClick={handleUpgrade}
                  style={{ background: "#E67E22", color: "white", border: "none", borderRadius: "7px", padding: "10px 20px", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}
                >
                  {t("upgradeToPro")}
                </button>
                <p style={{ marginTop: "8px", fontSize: "0.75rem", color: "rgba(0,0,0,0.35)" }}>{t("unlimitedDocs")}</p>
              </div>
            ) : (
              <div>
                <button
                  onClick={handlePortal}
                  style={{ background: "transparent", color: "#6B7280", border: "1px solid rgba(0,0,0,0.14)", borderRadius: "7px", padding: "10px 20px", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}
                >
                  {t("manageBilling")}
                </button>
                <p style={{ marginTop: "8px", fontSize: "0.75rem", color: "rgba(0,0,0,0.35)" }}>{t("updatePayment")}</p>
              </div>
            )}
          </>
        )}
      </div>

      <Link href="/dashboard" style={{ fontSize: "0.875rem", color: "#6B7280" }} className="transition-colors">
        {t("backToDocuments")}
      </Link>

      {/* Danger Zone */}
      <div style={{ ...cardStyle, border: "1px solid rgba(220,38,38,0.2)", background: "rgba(220,38,38,0.03)" }}>
        <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#DC2626" }}>{ta("dangerZone")}</h2>
        <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>{ta("confirmDesc")}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={deleting}
              style={{ alignSelf: "flex-start", background: "rgba(220,38,38,0.08)", color: "#DC2626", border: "1px solid rgba(220,38,38,0.25)", borderRadius: "7px", padding: "9px 18px", fontSize: "0.875rem", fontWeight: 600, cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.6 : 1 }}
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
