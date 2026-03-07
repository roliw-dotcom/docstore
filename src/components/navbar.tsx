"use client";

import { Link, useRouter, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function Navbar({ user }: { user: User }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const supabase = createClient();
  const t = useTranslations("nav");

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  function toggleLocale() {
    const next = locale === "en" ? "de" : "en";
    router.replace(pathname, { locale: next });
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="font-serif text-2xl tracking-tight text-[#1C2333]">
              b<span className="font-sans font-bold">AI</span>nder
            </Link>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {t("documents")}
              </Link>
              <Link
                href="/dashboard/follow-ups"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {t("followUps")}
              </Link>
              <Link
                href="/dashboard/upload"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {t("upload")}
              </Link>
              <Link
                href="/dashboard/settings/billing"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {t("billing")}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLocale}
              className="text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 rounded px-2 py-1 transition-colors"
              title="Switch language"
            >
              {locale === "en" ? "DE" : "EN"}
            </button>
            <span className="text-sm text-gray-500 hidden sm:block">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              {t("signOut")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
