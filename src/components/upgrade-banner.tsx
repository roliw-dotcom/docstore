"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function UpgradeBanner({ docCount }: { docCount: number }) {
  const t = useTranslations("upgradeBanner");

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
      <p className="text-amber-800">
        {t("message", { count: docCount })}
      </p>
      <Link href="/pricing" className="flex-shrink-0">
        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white border-0">
          {t("upgradeToPro")}
        </Button>
      </Link>
    </div>
  );
}
