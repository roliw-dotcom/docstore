import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

function DocumentVisual() {
  return (
    <div className="relative max-w-[340px] select-none" aria-hidden="true">
      {/* Main document card */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.14)] p-5">
        {/* Header */}
        <p className="text-[8px] uppercase tracking-[0.22em] text-stone-400">SERVICE AGREEMENT</p>
        <p className="text-[8px] text-stone-300">Effective January 1, 2025 · Confidential</p>
        <div className="h-px bg-stone-100 mt-3 mb-3" />

        {/* Body */}
        <div className="font-mono text-[9px] leading-[1.65] text-stone-400 space-y-2.5">
          <p>
            This Agreement is entered into as of the date first written above between the parties
            identified herein and shall govern all services rendered thereunder.
          </p>

          {/* Highlight 1 — Payment */}
          <div className="-mx-1.5 px-2.5 py-2 bg-amber-50 border-l-[2.5px] border-amber-400 rounded-r">
            <p className="text-[7px] uppercase tracking-[0.2em] text-amber-500 font-semibold mb-0.5">§ 4.1 · Payment</p>
            <p className="text-stone-600">
              Client shall remit payment of $4,200 no later than{" "}
              <span className="font-bold">March 15, 2025</span>. Late payments
              accrue interest at 1.5% per month.
            </p>
          </div>

          <p>
            Either party may renegotiate the terms of this Agreement upon 30 days written notice
            prior to the commencement of any renewal period.
          </p>

          {/* Highlight 2 — Renewal */}
          <div className="-mx-1.5 px-2.5 py-2 bg-amber-50 border-l-[2.5px] border-amber-400 rounded-r">
            <p className="text-[7px] uppercase tracking-[0.2em] text-amber-500 font-semibold mb-0.5">§ 7.2 · Renewal</p>
            <p className="text-stone-600">
              This Agreement auto-renews for successive one-year terms unless
              cancelled in writing by{" "}
              <span className="font-bold">June 1, 2025</span>.
            </p>
          </div>

          <p>
            All representations and warranties shall survive termination of this Agreement
            and remain in full force for a period of two (2) years thereafter.
          </p>

          {/* Highlight 3 — Execution */}
          <div className="-mx-1.5 px-2.5 py-2 bg-amber-50 border-l-[2.5px] border-amber-400 rounded-r">
            <p className="text-[7px] uppercase tracking-[0.2em] text-amber-500 font-semibold mb-0.5">§ 9.1 · Execution</p>
            <p className="text-stone-600">
              Both parties must execute and return signed counterparts no later than{" "}
              <span className="font-bold">April 3, 2025</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Floating card 1 — Pay $4,200 */}
      <div className="absolute -right-6 top-8 w-[156px] bg-white rounded-lg border border-stone-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
          <span className="text-[10px] font-semibold text-stone-700 font-sans">Pay $4,200</span>
        </div>
        <p className="text-[9px] text-stone-400 font-sans mb-1.5">Due Mar 15</p>
        <span className="inline-block text-[8px] font-medium bg-amber-50 text-amber-700 rounded px-1.5 py-0.5 font-sans">9 days left</span>
      </div>

      {/* Floating card 2 — Sign contract */}
      <div className="absolute -right-4 bottom-16 w-[156px] bg-white rounded-lg border border-stone-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
          <span className="text-[10px] font-semibold text-stone-700 font-sans">Sign contract</span>
        </div>
        <p className="text-[9px] text-stone-400 font-sans mb-1.5">Due Apr 3</p>
        <span className="inline-block text-[8px] font-medium bg-stone-100 text-stone-500 rounded px-1.5 py-0.5 font-sans">28 days left</span>
      </div>

      {/* Floating card 3 — Renew agreement */}
      <div className="absolute -left-8 bottom-4 w-[156px] bg-white rounded-lg border border-stone-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] p-3">
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
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600 font-sans mb-6">
              by docket-ai
            </p>
            <h1 className="font-serif text-6xl md:text-7xl tracking-tight leading-tight text-[#1C2333]">
              Your AI that reads<br />
              <em>the fine print.</em>
            </h1>
            <p className="mt-8 text-lg text-stone-500 max-w-xl leading-relaxed font-sans">
              Upload any document. Docket&apos;s AI extracts every deadline, obligation,
              and action item — and reminds you before anything is due.
            </p>
            <div className="mt-10 flex items-center gap-4">
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
          </div>
          <div className="hidden lg:flex justify-center">
            <DocumentVisual />
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
