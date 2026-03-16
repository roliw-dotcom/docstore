import type { Metadata } from "next";
import LandingPageShell from "@/components/landing-page-shell";

export const metadata: Metadata = {
  title: "Stop Losing Money to the Fine Print — bAIndly",
  description:
    "bAIndly reads your contracts, leases, and agreements — and tells you every deadline before it costs you. Free for your first 10 documents.",
};

export default function FinePrintLandingPage() {
  return (
    <LandingPageShell
      eyebrow="AI document protection"
      headline="Stop losing money to the fine print."
      subheadline="Every lease, contract, and agreement you sign has clauses that cost you if you miss them. bAIndly reads every document and alerts you before any deadline — so nothing slips through."
      bullets={[
        { text: "AI extracts every deadline, cancellation window, and payment obligation automatically" },
        { text: "Email reminder 5 days before anything is due — so you always have time to act" },
        { text: "Works with PDF, Word, Excel, images, and scanned documents in any language" },
      ]}
      ctaText="Try free — no credit card needed"
      ctaHref="/en/signup"
      trustLine="Free for 10 documents · No credit card required"
      quote="I almost paid €1,200 because I missed one clause in my gym contract. bAIndly would have caught it."
    />
  );
}
