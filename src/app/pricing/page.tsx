"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const router = useRouter();

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
          <Link href="/" className="font-serif text-2xl tracking-tight">docket</Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-stone-500 hover:text-[#1C2333]">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white border-0">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Pricing section */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl tracking-tight text-[#1C2333] mb-4">Simple pricing</h1>
          <p className="text-stone-500 font-sans">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free card */}
          <div className="rounded-xl border border-stone-200 bg-white p-8 flex flex-col">
            <p className="text-xs uppercase tracking-widest text-stone-400 font-sans mb-3">Free</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-serif text-4xl text-[#1C2333]">$0</span>
              <span className="text-stone-400 font-sans text-sm">/month</span>
            </div>
            <ul className="space-y-3 text-sm text-stone-600 font-sans flex-1 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                10 documents (lifetime)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                AI extraction (keywords, summary, follow-ups)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-stone-300">✗</span>
                <span className="text-stone-400">Email reminders</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button variant="outline" className="w-full">Get started free</Button>
            </Link>
          </div>

          {/* Pro card */}
          <div className="rounded-xl border-2 border-amber-400 bg-white p-8 flex flex-col relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest bg-amber-400 text-white font-semibold px-3 py-1 rounded-full font-sans">
              Most popular
            </span>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-sans mb-3">Pro</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-serif text-4xl text-[#1C2333]">$9</span>
              <span className="text-stone-400 font-sans text-sm">/month</span>
            </div>
            <ul className="space-y-3 text-sm text-stone-600 font-sans flex-1 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                Unlimited documents
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                AI extraction (keywords, summary, follow-ups)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500">✓</span>
                Email reminders 5 days before deadlines
              </li>
            </ul>
            <Button
              onClick={handleUpgrade}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white border-0"
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
