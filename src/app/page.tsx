import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function RootPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1C2333]">

      {/* Nav */}
      <header className="border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-2xl tracking-tight">docket</span>
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

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-24 text-center">
        <p className="text-xs uppercase tracking-widest text-amber-600 font-sans mb-6">
          by docket-ai
        </p>
        <h1 className="font-serif text-6xl md:text-7xl tracking-tight leading-tight text-[#1C2333]">
          Your AI that reads<br />
          <em>the fine print.</em>
        </h1>
        <p className="mt-8 text-lg text-stone-500 max-w-xl mx-auto leading-relaxed font-sans">
          Upload any document. Docket&apos;s AI extracts every deadline, obligation,
          and action item — and reminds you before anything is due.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white border-0 px-8 text-base">
              Clear the docket
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="ghost" className="text-stone-500 hover:text-[#1C2333] px-8 text-base">
              Sign in →
            </Button>
          </Link>
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
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">Extract</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">
              AI reads every clause so you don&apos;t have to. Upload a PDF or photo
              and get keywords, categories, and a plain-language summary instantly.
            </p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">Track</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">
              Every obligation — signatures, payments, renewals, deadlines —
              becomes a trackable action item with a due date, automatically.
            </p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">Remind</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">
              Get an email reminder 5 days before any deadline. Nothing buried
              in a contract will ever slip through the cracks again.
            </p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">Smart upload</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">
              Drag and drop PDFs or photos of documents. Docket reads scanned
              pages, printed contracts, and handwritten notes alike.
            </p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">Instant search</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">
              Search by keyword or filter by category across your entire
              document library in milliseconds.
            </p>
          </div>
          <div>
            <div className="w-8 h-px bg-amber-600 mb-4" />
            <h3 className="font-serif text-lg text-[#1C2333] mb-2">Private by default</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-sans">
              Every document is stored privately. Only you can access your
              files — enforced at the database level, not just the UI.
            </p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl text-[#1C2333]">Nothing buried. Nothing missed.</h2>
            <p className="mt-2 text-stone-500 font-sans text-sm">
              Create a free account and upload your first document in minutes.
            </p>
          </div>
          <Link href="/signup" className="flex-shrink-0">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white border-0 px-10 text-base">
              Clear the docket
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-stone-400 font-sans">
          <span>© {new Date().getFullYear()} docket-ai</span>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-stone-600">Sign in</Link>
            <Link href="/signup" className="hover:text-stone-600">Sign up</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
