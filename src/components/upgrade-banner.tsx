"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UpgradeBanner({ docCount }: { docCount: number }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
      <p className="text-amber-800">
        You&apos;ve used <strong>{docCount}</strong> of 10 free documents.{" "}
        Upgrade to Pro for unlimited documents and email reminders.
      </p>
      <Link href="/pricing" className="flex-shrink-0">
        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white border-0">
          Upgrade to Pro
        </Button>
      </Link>
    </div>
  );
}
