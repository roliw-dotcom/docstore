import { redirect } from "next/navigation";
import { Link } from "@/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

function Ring() {
  return (
    <div className="w-4 h-4 rounded-full border-[2.5px] border-amber-300 bg-amber-400 shadow-inner" />
  );
}

function BinderVisual() {
  return (
    <div className="relative w-[300px] h-[340px] select-none" aria-hidden="true">

      {/* Binder 3 — back */}
      <div className="absolute" style={{ left: 32, top: 40, transform: "rotate(-9deg)", transformOrigin: "bottom center", zIndex: 1 }}>
        <div className="flex h-[248px] w-[196px] rounded-r-xl overflow-hidden shadow-md opacity-50">
          <div className="w-6 flex-shrink-0 bg-stone-300 flex flex-col items-center justify-center gap-5" />
          <div className="flex-1 bg-stone-100 border border-l-0 border-stone-200 rounded-r-xl" />
        </div>
      </div>

      {/* Binder 2 — middle */}
      <div className="absolute" style={{ left: 20, top: 22, transform: "rotate(-4deg)", transformOrigin: "bottom center", zIndex: 2 }}>
        <div className="flex h-[256px] w-[196px] rounded-r-xl overflow-hidden shadow-md">
          <div className="w-6 flex-shrink-0 bg-stone-400 flex flex-col items-center justify-center gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-3.5 h-3.5 rounded-full border-2 border-stone-300 bg-stone-350" />
            ))}
          </div>
          <div className="flex-1 bg-white border border-l-0 border-stone-200 rounded-r-xl p-3">
            <p className="text-[7px] uppercase tracking-widest text-stone-300 mb-2">Lease 2025</p>
            <div className="space-y-1.5 mt-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-px bg-stone-100" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Binder 1 — front (amber, main) */}
      <div className="absolute" style={{ left: 4, top: 0, zIndex: 3 }}>
        <div className="flex h-[280px] w-[200px] rounded-r-xl shadow-[0_12px_48px_-8px_rgba(0,0,0,0.18)]">
          {/* Spine */}
          <div className="w-7 flex-shrink-0 bg-amber-500 rounded-l-sm flex flex-col items-center justify-center gap-5">
            <Ring /><Ring /><Ring />
          </div>
          {/* Cover */}
          <div className="flex-1 bg-white border border-l-0 border-stone-200 rounded-r-xl p-4 flex flex-col gap-3">
            <div>
              <p className="text-[7px] uppercase tracking-[0.2em] text-stone-300">Service Agreement</p>
              <p className="text-[7px] text-stone-300 mt-0.5">Jan 1, 2025 · Confidential</p>
            </div>
            <div className="h-px bg-stone-100" />
            {/* AI-extracted items */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 bg-amber-50 border-l-2 border-amber-400 rounded-r px-2 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-[8px] text-stone-700 font-medium font-sans">Pay $4,200 · Mar 15</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-50 border-l-2 border-stone-300 rounded-r px-2 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                <span className="text-[8px] text-stone-500 font-sans">Sign contract · Apr 3</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-50 border-l-2 border-stone-200 rounded-r px-2 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300 flex-shrink-0" />
                <span className="text-[8px] text-stone-400 font-sans">Renew agreement · Jun 1</span>
              </div>
            </div>
            <div className="space-y-1.5 mt-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-px bg-stone-100" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating card 1 — Pay $4,200 */}
      <div className="absolute -right-2 top-10 w-[148px] bg-white rounded-lg border border-stone-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] p-3 z-10">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
          <span className="text-[10px] font-semibold text-stone-700 font-sans">Pay $4,200</span>
        </div>
        <p className="text-[9px] text-stone-400 font-sans mb-1.5">Due Mar 15</p>
        <span className="inline-block text-[8px] font-medium bg-amber-50 text-amber-700 rounded px-1.5 py-0.5 font-sans">9 days left</span>
      </div>

      {/* Floating card 2 — Renew agreement */}
      <div className="absolute -right-4 bottom-10 w-[148px] bg-white rounded-lg border border-stone-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] p-3 z-10">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-stone-300 flex-shrink-0" />
          <span className="text-[10px] font-semibold text-stone-700 font-sans">Renew agreement</span>
        </div>
        <p className="text-[9px] text-stone-400 font-sans mb-1.5">Due Jun 1</p>
        <span className="inline-block text-[8px] font-medium bg-stone-100 text-stone-500 rounded px-1.5 py-0.5 font-sans">77 days left</span>
      </div>

    </div>
  );
}

export default async function RootPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(`/${locale}/dashboard`);
  }

  const t = await getTranslations("landing");

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1C2333]">

      {/* Nav */}
      <header className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-2xl tracking-tight">b<span className="font-sans font-bold">AI</span>nder</span>
          <div className="flex items-center gap-3">
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="text-stone-500 hover:text-[#1C2333]">
                {t("pricing")}
              </Button>
            </Link>
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

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-sans mb-6">
              {t("heroTagline")}
            </p>
            <h1 className="font-serif text-6xl md:text-7xl tracking-tight leading-tight text-[#1C2333]">
              {t("heroTitle")}
            </h1>
            <p className="mt-8 text-lg text-stone-500 max-w-xl leading-relaxed font-sans">
              {t("heroDesc")}
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white border-0 px-8 text-base">
                  {t("getStartedFree")}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="ghost" className="text-stone-500 hover:text-[#1C2333] px-8 text-base">
                  {t("signInArrow")}
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-stone-400 font-sans">
              {t("freeNote")}
            </p>
          </div>
          <div className="hidden lg:flex justify-center">
            <BinderVisual />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-stone-200" />
      </div>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">{t("featureExtractTitle")}</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">{t("featureExtractDesc")}</p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">{t("featureTrackTitle")}</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">{t("featureTrackDesc")}</p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">{t("featureRemindTitle")}</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">{t("featureRemindDesc")}</p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">{t("featureUploadTitle")}</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">{t("featureUploadDesc")}</p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">{t("featureSearchTitle")}</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">{t("featureSearchDesc")}</p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">{t("featurePrivateTitle")}</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">{t("featurePrivateDesc")}</p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl text-[#1C2333]">{t("ctaTitle")}</h2>
            <p className="mt-2 text-stone-500 font-sans text-sm">{t("ctaDesc")}</p>
          </div>
          <Link href="/signup" className="flex-shrink-0">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white border-0 px-10 text-base">
              {t("getStartedFree")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-stone-400 font-sans">
          <span>© {new Date().getFullYear()} bainder</span>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-stone-600">{t("pricing")}</Link>
            <Link href="/privacy" className="hover:text-stone-600">{t("privacy")}</Link>
            <Link href="/terms" className="hover:text-stone-600">{t("terms")}</Link>
            <Link href="/login" className="hover:text-stone-600">{t("signIn")}</Link>
            <Link href="/signup" className="hover:text-stone-600">{t("footerSignUp")}</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
