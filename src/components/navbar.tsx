"use client";

import { Link, useRouter, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export default function Navbar({ user }: { user?: User | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const supabase = createClient();
  const t = useTranslations("nav");

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function toggleLocale() {
    const next = locale === "en" ? "de" : "en";
    router.replace(pathname, { locale: next });
  }

  const localeButton = (
    <button
      onClick={toggleLocale}
      style={{
        fontSize: "0.7rem",
        fontWeight: 500,
        color: "#6A90AA",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "4px",
        padding: "4px 8px",
        background: "transparent",
        cursor: "pointer",
        transition: "color 0.15s",
        fontFamily: "monospace",
        letterSpacing: "0.05em",
      }}
      title="Switch language"
    >
      {locale === "en" ? "DE" : "EN"}
    </button>
  );

  return (
    <nav style={{ background: "#080F1A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {user ? (
            <>
              <div className="flex items-center gap-8">
                <Link href="/dashboard" className="font-serif text-xl tracking-tight text-white">
                  b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>nder
                </Link>
                <div className="flex gap-5">
                  {[
                    { href: "/dashboard",                  label: t("documents"), exact: true },
                    { href: "/dashboard/follow-ups",       label: t("followUps"), exact: false },
                    { href: "/dashboard/upload",           label: t("upload"),    exact: false },
                    { href: "/dashboard/settings/billing", label: t("billing"),   exact: false },
                  ].map(({ href, label, exact }) => {
                    const active = exact ? pathname === href : pathname.startsWith(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        style={{
                          fontSize: "0.82rem",
                          color: active ? "white" : "#6A90AA",
                          borderBottom: active ? "2px solid #E67E22" : "2px solid transparent",
                          paddingBottom: "2px",
                          transition: "color 0.15s",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {localeButton}
                <span style={{ fontSize: "0.8rem", color: "#6A90AA" }} className="hidden sm:block">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  style={{
                    fontSize: "0.8rem",
                    color: "#6A90AA",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "color 0.15s, border-color 0.15s",
                  }}
                >
                  {t("signOut")}
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/" className="font-serif text-xl tracking-tight text-white">
                b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>nder
              </Link>
              <div className="flex items-center gap-5">
                <Link href="/pricing" style={{ fontSize: "0.8rem", color: "#6A90AA" }} className="hover:text-white transition-colors">
                  {t("pricing")}
                </Link>
                <Link href="/login" style={{ fontSize: "0.8rem", color: "#6A90AA" }} className="hover:text-white transition-colors">
                  {t("signIn")}
                </Link>
                {localeButton}
                <Link href="/signup">
                  <button style={{
                    background: "#E67E22",
                    color: "white",
                    padding: "7px 16px",
                    borderRadius: "6px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}>
                    {t("getStarted")}
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
