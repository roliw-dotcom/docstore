import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — bAInder",
};

const EN = () => (
  <div className="prose prose-invert max-w-none">
    <h1>Terms of Service</h1>
    <p style={{ color: "#6A90AA" }}>Last updated: March 2026</p>

    <h2>1. Service Description</h2>
    <p>
      bAInder (&ldquo;Service&rdquo;) is an AI-powered document management tool operated by
      <strong> [YOUR COMPANY NAME]</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;). The Service allows users
      to upload PDF documents, extract deadlines and action items using AI, and receive email reminders.
    </p>

    <h2>2. Eligibility</h2>
    <p>
      You must be at least 18 years old to use the Service. By creating an account you confirm that the
      information you provide is accurate and that you have the legal authority to accept these Terms.
    </p>

    <h2>3. User Obligations</h2>
    <ul>
      <li>You are responsible for all documents you upload and for ensuring you have the right to process them.</li>
      <li>You must not upload content that is illegal, harmful, or infringes third-party intellectual property rights.</li>
      <li>You must not attempt to reverse-engineer, abuse, or interfere with the Service.</li>
      <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
    </ul>

    <h2>4. Subscription and Payment</h2>
    <p>
      The Free plan provides up to 10 document uploads. The Pro plan is a monthly subscription billed through
      Stripe. Prices are listed on the pricing page and may change with 30 days&rsquo; notice. Refunds are
      not provided for partial months except where required by law.
    </p>

    <h2>5. Intellectual Property</h2>
    <p>
      You retain all rights to the documents you upload. You grant us a limited, non-exclusive licence to
      process your documents solely to provide the Service. We retain all rights to the Service itself,
      including its AI models, interface, and code.
    </p>

    <h2>6. Availability and Modifications</h2>
    <p>
      We strive for high availability but do not guarantee uninterrupted access. We may modify, suspend, or
      discontinue the Service at any time. We will provide reasonable notice of material changes.
    </p>

    <h2>7. Limitation of Liability</h2>
    <p>
      To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential
      damages arising from your use of the Service, including missed deadlines or decisions made based on
      AI-extracted data. The Service is provided &ldquo;as is&rdquo; without warranties of any kind.
    </p>

    <h2>8. Account Termination</h2>
    <p>
      You may delete your account at any time from Settings → Billing → Danger Zone. We may suspend or
      terminate your account for violations of these Terms. Upon termination, your data will be deleted in
      accordance with our Privacy Policy.
    </p>

    <h2>9. Governing Law and Dispute Resolution</h2>
    <p>
      These Terms are governed by the laws of Germany. Any disputes shall be resolved in the competent courts
      of <strong>[YOUR CITY]</strong>, Germany, unless mandatory consumer protection law in your country
      requires otherwise.
    </p>

    <h2>10. Contact</h2>
    <p>
      For any questions about these Terms, contact us at{" "}
      <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>.
    </p>
  </div>
);

const DE = () => (
  <div className="prose prose-invert max-w-none">
    <h1>Nutzungsbedingungen</h1>
    <p style={{ color: "#6A90AA" }}>Zuletzt aktualisiert: März 2026</p>

    <h2>1. Leistungsbeschreibung</h2>
    <p>
      bAInder (&bdquo;Dienst&ldquo;) ist ein KI-gestütztes Dokumentenverwaltungstool, betrieben von
      <strong> [IHR UNTERNEHMENSNAME]</strong> (&bdquo;wir&ldquo;). Der Dienst ermöglicht es Nutzern,
      PDF-Dokumente hochzuladen, Fristen und Aufgaben per KI zu extrahieren und E-Mail-Erinnerungen zu empfangen.
    </p>

    <h2>2. Nutzungsberechtigung</h2>
    <p>
      Du musst mindestens 18 Jahre alt sein, um den Dienst zu nutzen. Durch die Erstellung eines Kontos
      bestätigst du, dass die von dir angegebenen Informationen korrekt sind.
    </p>

    <h2>3. Nutzerpflichten</h2>
    <ul>
      <li>Du bist für alle hochgeladenen Dokumente verantwortlich und musst das Recht haben, diese zu verarbeiten.</li>
      <li>Du darfst keine rechtswidrigen, schädlichen oder urheberrechtsverletzenden Inhalte hochladen.</li>
      <li>Du darfst den Dienst nicht missbrauchen oder zu stören versuchen.</li>
      <li>Du bist für die Vertraulichkeit deiner Zugangsdaten verantwortlich.</li>
    </ul>

    <h2>4. Abonnement und Zahlung</h2>
    <p>
      Der Free-Plan umfasst bis zu 10 Dokument-Uploads. Der Pro-Plan ist ein monatliches Abonnement,
      das über Stripe abgerechnet wird. Preise können sich mit einer Frist von 30 Tagen ändern.
      Rückerstattungen für Teilmonate werden grundsätzlich nicht gewährt, sofern gesetzlich nichts anderes
      vorgesehen ist.
    </p>

    <h2>5. Geistiges Eigentum</h2>
    <p>
      Du behältst alle Rechte an deinen hochgeladenen Dokumenten. Du räumst uns eine eingeschränkte,
      nicht-exklusive Lizenz zur Verarbeitung deiner Dokumente ausschließlich zur Erbringung des Dienstes ein.
      Alle Rechte am Dienst selbst verbleiben bei uns.
    </p>

    <h2>6. Verfügbarkeit und Änderungen</h2>
    <p>
      Wir bemühen uns um hohe Verfügbarkeit, garantieren jedoch keinen ununterbrochenen Zugang.
      Wesentliche Änderungen werden mit angemessener Vorankündigung bekannt gegeben.
    </p>

    <h2>7. Haftungsbeschränkung</h2>
    <p>
      Soweit gesetzlich zulässig, haften wir nicht für indirekte, zufällige oder Folgeschäden, die aus der
      Nutzung des Dienstes entstehen, einschließlich verpasster Fristen oder Entscheidungen auf Basis
      KI-extrahierter Daten. Der Dienst wird &bdquo;wie besehen&ldquo; ohne jegliche Garantien bereitgestellt.
    </p>

    <h2>8. Kontokündigung</h2>
    <p>
      Du kannst dein Konto jederzeit unter Einstellungen → Abrechnung → Gefahrenzone löschen. Wir können
      dein Konto bei Verstößen gegen diese Bedingungen sperren oder kündigen.
    </p>

    <h2>9. Anwendbares Recht und Gerichtsstand</h2>
    <p>
      Diese Bedingungen unterliegen deutschem Recht. Gerichtsstand ist <strong>[DEINE STADT]</strong>,
      Deutschland, sofern zwingendes Verbraucherschutzrecht in deinem Land nichts anderes vorschreibt.
    </p>

    <h2>10. Kontakt</h2>
    <p>
      Bei Fragen zu diesen Bedingungen wende dich an{" "}
      <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>.
    </p>
  </div>
);

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div style={{ minHeight: "100vh", background: "#0F2337", color: "white" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div style={{ marginBottom: "32px", borderRadius: "8px", border: "1px solid rgba(230,126,34,0.3)", background: "rgba(230,126,34,0.08)", padding: "12px 16px", fontSize: "0.875rem", color: "#F5A623" }}>
          ⚠️ Review and fill in your company details (name, city, governing law) before going live.
        </div>
        {locale === "de" ? <DE /> : <EN />}
      </div>
    </div>
  );
}
