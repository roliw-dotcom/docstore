"use client";

import { useState, useEffect } from "react";
import { Link, useRouter, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Menu, X } from "lucide-react";

export default function Navbar({ user }: { user?: User | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const supabase = createClient();
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function toggleLocale() {
    const next = locale === "en" ? "de" : "en";
    router.replace(pathname, { locale: next });
  }

  const localeBtn = (
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
        fontFamily: "monospace",
        letterSpacing: "0.05em",
        flexShrink: 0,
      }}
      title="Switch language"
    >
      {locale === "en" ? "DE" : "EN"}
    </button>
  );

  const authLinks = [
    { href: "/dashboard",                  label: t("documents"), exact: true },
    { href: "/dashboard/follow-ups",       label: t("followUps"), exact: false },
    { href: "/dashboard/chat",             label: t("chat"),      exact: false },
    { href: "/dashboard/upload",           label: t("upload"),    exact: false },
    { href: "/dashboard/settings/billing", label: t("billing"),   exact: false },
  ];

  return (
    <nav style={{
  background: scrolled ? "rgba(6,12,22,0.82)" : "#080F1A",
  backdropFilter: scrolled ? "blur(14px)" : "none",
  WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  position: "sticky",
  top: 0,
  zIndex: 50,
  transition: "background 0.3s ease, backdrop-filter 0.3s ease",
}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href={user ? "/dashboard" : "/"}
            className="font-serif text-2xl tracking-tight text-white flex-shrink-0"
          >
            b<span style={{ color: "#E67E22", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 700 }}>AI</span>ndly
          </Link>

          {/* Desktop nav */}
          {user ? (
            <div className="hidden md:flex items-center gap-6">
              <div className="flex gap-5">
                {authLinks.map(({ href, label, exact }) => {
                  const active = exact ? pathname === href : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="nav-link"
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
              <div className="flex items-center gap-3">
                {localeBtn}
                <Link
                  href="/dashboard/settings/account"
                  style={{ fontSize: "0.8rem", color: "#6A90AA" }}
                  className="hidden md:block hover:text-white transition-colors"
                >
                  {user.email}
                </Link>
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
                  }}
                >
                  {t("signOut")}
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-5">
              <Link href="/pricing" style={{ fontSize: "0.8rem", color: "#6A90AA" }} className="nav-link hover:text-white transition-colors">
                {t("pricing")}
              </Link>
              <Link href="/login" style={{ fontSize: "0.8rem", color: "#6A90AA" }} className="nav-link hover:text-white transition-colors">
                {t("signIn")}
              </Link>
              {localeBtn}
              <Link href="/signup">
                <button className="btn-cta" style={{ background: "#E67E22", color: "white", padding: "7px 16px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 600, border: "none", cursor: "pointer" }}>
                  {t("getStarted")}
                </button>
              </Link>
            </div>
          )}

          {/* Mobile: locale button + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {localeBtn}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "#6A90AA", background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{ background: "#080F1A", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
            {user ? (
              <>
                {authLinks.map(({ href, label, exact }) => {
                  const active = exact ? pathname === href : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        fontSize: "0.9rem",
                        color: active ? "white" : "#8AAEC7",
                        fontWeight: active ? 600 : 400,
                        padding: "13px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        display: "block",
                      }}
                    >
                      {label}
                    </Link>
                  );
                })}
                <div style={{ paddingTop: "13px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <Link
                    href="/dashboard/settings/account"
                    onClick={() => setMobileOpen(false)}
                    style={{ fontSize: "0.8rem", color: "#6A90AA", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {user.email}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    style={{ fontSize: "0.8rem", color: "#6A90AA", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", padding: "8px 16px", background: "transparent", cursor: "pointer", flexShrink: 0 }}
                  >
                    {t("signOut")}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/pricing" onClick={() => setMobileOpen(false)} style={{ fontSize: "0.9rem", color: "#8AAEC7", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "block" }}>
                  {t("pricing")}
                </Link>
                <Link href="/login" onClick={() => setMobileOpen(false)} style={{ fontSize: "0.9rem", color: "#8AAEC7", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "block" }}>
                  {t("signIn")}
                </Link>
                <div style={{ paddingTop: "12px" }}>
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    <button style={{ width: "100%", background: "#E67E22", color: "white", padding: "12px 16px", borderRadius: "6px", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer" }}>
                      {t("getStarted")}
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
