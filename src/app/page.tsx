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
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">DocStore</span>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Your documents,<br />intelligently organised
        </h1>
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Upload PDFs and let AI extract keywords, summaries, and action items automatically.
          Never miss a deadline buried in a contract again.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="px-8">Start for free</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="px-8">Sign in</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="text-2xl mb-3">📄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart upload</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Drag and drop multiple PDFs at once. Each document is processed in parallel and stored securely in your private vault.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI extraction</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Claude AI reads every document and pulls out keywords, categories, and a plain-language summary — automatically.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-3">✅</div>
              <h3 className="font-semibold text-gray-900 mb-2">Follow-up tracking</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Deadlines, signatures, payments — AI spots every obligation and turns them into trackable action items with due dates.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-3">🔔</div>
              <h3 className="font-semibold text-gray-900 mb-2">Email reminders</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Get an email reminder 5 days before any deadline so nothing slips through the cracks.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant search</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Search by keyword or filter by category across your entire document library in milliseconds.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Private by default</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Every document is stored privately. Only you can access your files — enforced at the database level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Ready to get organised?</h2>
        <p className="mt-4 text-gray-500">Create a free account and upload your first document in minutes.</p>
        <div className="mt-8">
          <Link href="/signup">
            <Button size="lg" className="px-10">Create free account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-gray-400">
          <span>© {new Date().getFullYear()} DocStore</span>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-gray-600">Sign in</Link>
            <Link href="/signup" className="hover:text-gray-600">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
