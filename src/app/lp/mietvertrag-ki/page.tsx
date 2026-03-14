import type { Metadata } from "next";
import LandingPageShell from "@/components/landing-page-shell";

export const metadata: Metadata = {
  title: "KI liest deinen Mietvertrag — bAInder",
  description:
    "bAInder analysiert deinen Mietvertrag mit KI und erkennt automatisch alle Fristen, Klauseln und Pflichten — bevor sie dich Geld kosten.",
};

export default function MietvertragKiLandingPage() {
  return (
    <LandingPageShell
      eyebrow="KI-Mietvertragsanalyse"
      headline="Dein Mietvertrag hat Klauseln, die dich Geld kosten — wenn du sie übersiehst."
      subheadline="Kündigungsfristen, Nebenkostenabrechnungen, Schönheitsreparaturen, Renovierungspflichten — bAInder liest deinen Mietvertrag und erklärt dir genau, was wann fällig ist."
      bullets={[
        { text: "KI erkennt alle Fristen, Pflichten und Klauseln in deinem Mietvertrag automatisch" },
        { text: "E-Mail-Erinnerung 5 Tage vor jeder Frist — Kündigungstermin, Nebenkostenprüfung, Renovierungspflicht" },
        { text: "Einfach PDF hochladen — Ergebnis in unter 30 Sekunden, keine Installation nötig" },
      ]}
      ctaText="Kostenlos testen — keine Kreditkarte"
      ctaHref="/de/signup"
      trustLine="Kostenlos für 10 Dokumente · Ab €9/Monat"
      quote="Ich hätte Hunderte Euro für Schönheitsreparaturen zahlen müssen, die laut Vertrag gar nicht fällig waren. bAInder hätte das sofort erkannt."
    />
  );
}
