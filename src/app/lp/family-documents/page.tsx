import type { Metadata } from "next";
import LandingPageShell from "@/components/landing-page-shell";

export const metadata: Metadata = {
  title: "Never Miss an Important Family Document Again — bAIndly",
  description:
    "bAIndly reads your family's documents — school letters, insurance policies, medical referrals, tenancy agreements — and tells you every deadline and action before it's too late.",
};

export default function FamilyDocumentsLandingPage() {
  return (
    <LandingPageShell
      eyebrow="For busy families"
      headline="Family life comes with a lot of paperwork. None of it should slip through."
      subheadline="School letters, insurance renewals, medical referrals, tenancy agreements, council notices — bAIndly reads every document you upload, extracts every date and action, and reminds you before anything is due."
      bullets={[
        { text: "AI reads any document — school letters, NHS referrals, insurance policies, mortgage papers, and more" },
        { text: "Every deadline and action item extracted automatically — no more reading the small print yourself" },
        { text: "Email reminder 5 days before anything is due — so the whole family stays on top of what matters" },
      ]}
      ctaText="Try free — no credit card needed"
      ctaHref="/en/signup"
      trustLine="Free for 10 documents · Upgrade from €9/month"
      quote="Between school admin, insurance renewals, and the kids' medical appointments, I was constantly missing things. bAIndly is the organised one in the family now."
    />
  );
}
