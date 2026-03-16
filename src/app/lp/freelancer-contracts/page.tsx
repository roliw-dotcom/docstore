import type { Metadata } from "next";
import LandingPageShell from "@/components/landing-page-shell";

export const metadata: Metadata = {
  title: "Never Miss a Client Contract Deadline Again — bAIndly",
  description:
    "bAIndly reads your freelance contracts and tells you every deadline, payment term, and renewal clause — before it costs you.",
};

export default function FreelancerContractsLandingPage() {
  return (
    <LandingPageShell
      eyebrow="For freelancers & solopreneurs"
      headline="Your contracts have deadlines your calendar doesn't know about."
      subheadline="Client contracts, invoices, insurance, platform agreements — each one has clauses that cost you if you miss them. bAIndly reads every document and tells you what to do and when."
      bullets={[
        { text: "AI extracts payment terms, renewal windows, notice periods, and penalties automatically" },
        { text: "Email reminder 5 days before any deadline — invoice due dates, contract renewals, cancellation windows" },
        { text: "Works with every format: PDF, Word, Excel, scanned documents, photos of signed papers" },
      ]}
      ctaText="Try free — no credit card needed"
      ctaHref="/en/signup"
      trustLine="Free for 10 documents · Upgrade from €9/month"
      quote="I forgot to invoice a client within the payment window specified in the contract. bAIndly would have flagged that clause on day one."
    />
  );
}
