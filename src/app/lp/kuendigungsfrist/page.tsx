import type { Metadata } from "next";
import LandingPageShell from "@/components/landing-page-shell";

export const metadata: Metadata = {
  title: "Kündigungsfrist verpasst? So vermeidest du es in Zukunft — bAIndly",
  description:
    "bAIndly liest deinen Mietvertrag und erinnert dich automatisch vor jeder Frist. Nie wieder Kündigungsfrist verpassen.",
};

export default function KuendigungsfristLandingPage() {
  return (
    <LandingPageShell
      eyebrow="KI-Dokumentenschutz"
      headline="Nie wieder die Kündigungsfrist verpassen."
      subheadline="Im deutschen Mietrecht gilt: 3 Monate schriftliche Kündigung, bis zum 3. Werktag des Monats. Eine verpasste Frist bedeutet 3 Monate zusätzliche Miete. bAIndly liest deinen Vertrag und erinnert dich rechtzeitig."
      bullets={[
        { text: "KI erkennt automatisch Fristen, Kündigungsklauseln und Zahlungspflichten in deinem Mietvertrag" },
        { text: "E-Mail-Erinnerung 5 Tage vor jeder Frist — genug Zeit zum Handeln" },
        { text: "Funktioniert mit PDF, Word, Fotos und gescannten Dokumenten — auf Deutsch und Englisch" },
      ]}
      ctaText="Kostenlos testen — keine Kreditkarte"
      ctaHref="/de/signup"
      trustLine="Kostenlos für 10 Dokumente · Keine Kreditkarte erforderlich"
      quote="Ich hätte 3 Monate Miete extra zahlen müssen, weil ich die Kündigungsfrist vergessen hatte. Das passiert mir nicht mehr."
    />
  );
}
