"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function UpgradeBanner({ docCount }: { docCount: number }) {
  const t = useTranslations("upgradeBanner");

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      borderRadius: "8px",
      border: "1px solid rgba(230,126,34,0.3)",
      background: "rgba(230,126,34,0.08)",
      padding: "12px 16px",
      fontSize: "0.875rem",
    }}>
      <p style={{ color: "#F5A623" }}>
        {t("message", { count: docCount })}
      </p>
      <Link href="/pricing" style={{ flexShrink: 0 }}>
        <button style={{
          background: "#E67E22",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "6px 14px",
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: "pointer",
        }}>
          {t("upgradeToPro")}
        </button>
      </Link>
    </div>
  );
}
