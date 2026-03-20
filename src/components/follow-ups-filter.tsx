"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function FollowUpsFilter({ current }: { current?: string }) {
  const isPending = current === "pending";
  const t = useTranslations("followUpsFilter");

  const activeStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    padding: "6px 14px",
    borderRadius: "6px",
    border: "1px solid #E67E22",
    background: "#E67E22",
    color: "white",
    transition: "all 0.15s",
  };

  const inactiveStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    padding: "6px 14px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent",
    color: "#6A90AA",
    transition: "all 0.15s",
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Link href="/dashboard/follow-ups" style={!isPending ? activeStyle : inactiveStyle}>
        {t("all")}
      </Link>
      <Link href="/dashboard/follow-ups?filter=pending" style={isPending ? activeStyle : inactiveStyle}>
        {t("pendingOnly")}
      </Link>
    </div>
  );
}
