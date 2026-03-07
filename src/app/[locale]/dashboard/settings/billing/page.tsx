"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

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

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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

  const renewalDate = profile?.current_period_end
    ? new Date(profile.current_period_end).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-stone-500 mt-1">{t("subtitle")}</p>
      </div>

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {t("subscriptionActivated")}
        </div>
      )}

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        {loading ? (
          <p className="text-sm text-stone-400">{t("loading")}</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-700">{t("currentPlan")}</span>
              <span
                className={`text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  profile?.tier === "pro"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {profile?.tier ?? "free"}
              </span>
            </div>

            {profile?.tier === "pro" && renewalDate && (
              <p className="text-sm text-stone-500">
                {t("renewsOn", { date: renewalDate })}
              </p>
            )}

            {profile?.tier === "free" ? (
              <div className="pt-2">
                <Button
                  onClick={handleUpgrade}
                  className="bg-amber-600 hover:bg-amber-700 text-white border-0"
                >
                  {t("upgradeToPro")}
                </Button>
                <p className="mt-2 text-xs text-stone-400">{t("unlimitedDocs")}</p>
              </div>
            ) : (
              <div className="pt-2">
                <Button variant="outline" onClick={handlePortal}>
                  {t("manageBilling")}
                </Button>
                <p className="mt-2 text-xs text-stone-400">{t("updatePayment")}</p>
              </div>
            )}
          </>
        )}
      </div>

      <Link href="/dashboard" className="text-sm text-stone-500 hover:text-stone-700">
        {t("backToDocuments")}
      </Link>
    </div>
  );
}
