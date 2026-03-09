"use client";

import { Link } from "@/navigation";
import { useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function PricingPage() {
  const router = useRouter();
  const t = useTranslations("pricing");

  async function handleUpgrade() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) router.push(data.url);
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1C2333]">
      {/* Nav */}
      <header className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-tight">b<span className="font-sans font-bold">AI</span>nder</Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-stone-500 hover:text-[#1C2333]">
                {t("signIn")}
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white border-0">
                {t("getStarted")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Pricing section */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl tracking-tight text-[#1C2333] mb-4">{t("title")}</h1>
          <p className="text-stone-500 font-sans">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free card */}
          <div className="rounded-xl border border-stone-200 bg-white p-8 flex flex-col">
            <p className="text-xs uppercase tracking-widest text-stone-400 font-sans mb-3">{t("freePlan")}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-serif text-4xl text-[#1C2333]">€0</span>
              <span className="text-stone-400 font-sans text-sm">{t("perMonth")}</span>
            </div>
            <ul className="space-y-3 text-sm text-stone-600 font-sans flex-1 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                {t("freeFeature1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                {t("freeFeature2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-stone-300">✗</span>
                <span className="text-stone-400">{t("freeFeatureNo")}</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button variant="outline" className="w-full">{t("getStartedFree")}</Button>
            </Link>
          </div>

          {/* Pro card */}
          <div className="rounded-xl border-2 border-amber-400 bg-white p-8 flex flex-col relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest bg-amber-400 text-white font-semibold px-3 py-1 rounded-full font-sans">
              {t("mostPopular")}
            </span>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-sans mb-3">{t("proPlan")}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-serif text-4xl text-[#1C2333]">€9</span>
              <span className="text-stone-400 font-sans text-sm">{t("perMonth")}</span>
            </div>
            <ul className="space-y-3 text-sm text-stone-600 font-sans flex-1 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                {t("proFeature1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                {t("proFeature2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                {t("proFeature3")}
              </li>
            </ul>
            <Button
              onClick={handleUpgrade}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white border-0"
            >
              {t("upgradeToPro")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
