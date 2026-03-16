import type { Metadata } from "next";
import LandingPageShell from "@/components/landing-page-shell";

export const metadata: Metadata = {
  title: "Never Miss a Document Deadline Again — bAIndly",
  description:
    "bAIndly automatically tracks every deadline in your contracts, leases, and agreements — and emails you before anything is due.",
};

export default function DeadlineTrackerLandingPage() {
  return (
    <LandingPageShell
      eyebrow="AI deadline tracking"
      headline="Every document you sign has a deadline. Most people miss them."
      subheadline="Contracts, leases, subscriptions, insurance policies — they all contain deadlines buried in the fine print. bAIndly reads every document and tracks every date, so nothing slips through."
      bullets={[
        { text: "AI scans your documents and extracts every deadline, renewal date, and cancellation window" },
        { text: "Email reminder 5 days before anything is due — enough time to act, never too late" },
        { text: "Upload once, tracked forever — works with PDF, Word, Excel, images, and scans" },
      ]}
      ctaText="Start tracking for free"
      ctaHref="/en/signup"
      trustLine="Free for 10 documents · No credit card required"
      quote="I was auto-renewed on a €600/year subscription I forgot about. With bAIndly, I would have had a reminder two weeks before the cancellation window closed."
    />
  );
}
