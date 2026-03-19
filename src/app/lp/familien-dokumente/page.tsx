import type { Metadata } from "next";
import LandingPageShell from "@/components/landing-page-shell";

export const metadata: Metadata = {
  title: "Nie wieder wichtige Familiendokumente verpassen — bAIndly",
  description:
    "bAIndly liest Schulbriefe, Versicherungen, Arztbriefe und Verträge — und erinnert dich automatisch an jede Frist und Aufgabe.",
};

export default function FamilienDokumenteLandingPage() {
  return (
    <LandingPageShell
      eyebrow="Für Familien mit vollem Alltag"
      headline="Familienleben bedeutet jede Menge Papierkram. Nichts davon sollte untergehen."
      subheadline="Schulbriefe, Versicherungsverlängerungen, Arztüberweisungen, Mietverträge, Behördenbescheide — bAIndly liest jedes Dokument, das du hochlädst, extrahiert jeden Termin und jede Aufgabe und erinnert dich rechtzeitig."
      bullets={[
        { text: "KI liest jedes Dokument — Schulbriefe, Krankenkassenbescheide, Versicherungspolicen, Behördenschreiben und mehr" },
        { text: "Alle Fristen und Aufgaben werden automatisch erkannt — kein mühsames Durchlesen des Kleingedruckten" },
        { text: "E-Mail-Erinnerung 5 Tage vor jeder Frist — damit die ganze Familie den Überblick behält" },
      ]}
      ctaText="Kostenlos testen — keine Kreditkarte"
      ctaHref="/de/signup"
      trustLine="Kostenlos für 10 Dokumente · Ab €9/Monat"
      quote="Zwischen Schulorganisation, Versicherungsverlängerungen und Arztterminen für die Kinder hab ich ständig etwas übersehen. bAIndly ist jetzt das organisierte Familienmitglied."
    />
  );
}
