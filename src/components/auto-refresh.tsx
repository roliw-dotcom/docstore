"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoRefresh({ active }: { active: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => router.refresh(), 3000);
    return () => clearInterval(id);
  }, [active, router]);

  if (!active) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      Processing documents… page updates automatically.
    </div>
  );
}
