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
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      borderTop: "1px solid rgba(230,126,34,0.18)",
      background: "rgba(8,20,32,0.98)",
      backdropFilter: "blur(8px)",
      padding: "16px 24px",
    }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p style={{ fontSize: "0.875rem", color: "#8AAEC7" }}>
          {t("text")}{" "}
          <Link href="/privacy" style={{ color: "#E67E22", textDecoration: "underline" }}>
            {t("privacyPolicy")}
          </Link>
        </p>
        <button
          onClick={accept}
          style={{
            flexShrink: 0,
            background: "#E67E22",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 18px",
            fontSize: "0.825rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
