"use client";

import { useEffect, useState } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(true); // start true to avoid flash
  const t = useTranslations("cookieBanner");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setDismissed(false);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white/95 backdrop-blur-sm px-6 py-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-stone-600 font-sans">
          {t("text")}{" "}
          <Link href="/privacy" className="underline hover:text-stone-900">
            {t("privacyPolicy")}
          </Link>
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
