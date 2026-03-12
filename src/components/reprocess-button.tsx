"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

export default function ReprocessButton({ docId }: { docId: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const t = useTranslations("reprocessButton");
  const locale = useLocale();

  async function handleReprocess() {
    setState("loading");
    setErrorMsg("");

    const res = await fetch(`/api/documents/${docId}/process?locale=${locale}`, { method: "POST" });
    const data = await res.json();

    if (!res.ok) {
      setState("error");
      setErrorMsg(data.error ?? "Processing failed");
    } else {
      setState("idle");
      router.refresh();
    }
  }

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleReprocess}
        disabled={state === "loading"}
      >
        {state === "loading" ? t("processing") : t("reprocess")}
      </Button>
      {state === "error" && (
        <p className="text-xs text-red-600">{errorMsg}</p>
      )}
    </div>
  );
}
