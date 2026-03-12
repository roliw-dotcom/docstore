import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — bAInder",
};

const DE = () => (
  <div>
    <h1>Nutzungsbedingungen</h1>
    <p style={{ color: "#6A90AA" }}>Zuletzt aktualisiert: März 2026</p>

    <h2>1. Geltungsbereich</h2>
    <p>
      Diese Nutzungsbedingungen regeln die Nutzung der Softwareplattform bAInder (nachfolgend „Dienst").
    </p>
    <p>Mit der Registrierung eines Kontos erklärst du dich mit diesen Bedingungen einverstanden.</p>

    <h2>2. Beschreibung des Dienstes</h2>
    <p>bAInder ist eine webbasierte Software zur Organisation und Analyse von Dokumenten.</p>
    <p>Der Dienst ermöglicht unter anderem:</p>
    <ul>
      <li>Upload und Speicherung von Dokumenten</li>
      <li>KI-gestützte Analyse und Zusammenfassungen</li>
      <li>Extraktion von Aufgaben, Fristen und Kategorien</li>
    </ul>
    <p>Die Funktionen können sich im Laufe der Zeit ändern oder erweitert werden.</p>

    <h2>3. Benutzerkonto</h2>
    <p>Zur Nutzung des Dienstes ist ein Benutzerkonto erforderlich.</p>
    <p>Du bist verantwortlich für:</p>
    <ul>
      <li>die Sicherheit deines Kontos</li>
      <li>die Geheimhaltung deines Passworts</li>
      <li>alle Aktivitäten, die über dein Konto erfolgen</li>
    </ul>
    <p>Du verpflichtest dich, korrekte Angaben bei der Registrierung zu machen.</p>

    <h2>4. Hochgeladene Inhalte</h2>
    <p>Du behältst alle Rechte an den Dokumenten, die du hochlädst.</p>
    <p>Mit dem Upload gewährst du bAInder das notwendige Recht, diese Inhalte zu:</p>
    <ul>
      <li>speichern</li>
      <li>analysieren</li>
      <li>verarbeiten</li>
    </ul>
    <p>ausschließlich zum Zweck der Bereitstellung des Dienstes.</p>
    <p>bAInder verwendet deine Dokumente nicht zum Training von KI-Modellen.</p>
    <p>Du bist dafür verantwortlich sicherzustellen, dass du berechtigt bist, die hochgeladenen Inhalte zu verarbeiten.</p>

    <h2>5. Abonnements und Zahlungen</h2>
    <p>Einige Funktionen können kostenpflichtig sein. Zahlungen werden über Stripe abgewickelt.</p>
    <p>Abonnements:</p>
    <ul>
      <li>verlängern sich automatisch</li>
      <li>können jederzeit über die Kontoeinstellungen gekündigt werden</li>
    </ul>
    <p>Bereits gezahlte Beträge werden grundsätzlich nicht erstattet, sofern gesetzlich nichts anderes vorgeschrieben ist.</p>

    <h2>6. Verfügbarkeit des Dienstes</h2>
    <p>Wir bemühen uns, den Dienst möglichst unterbrechungsfrei bereitzustellen.</p>
    <p>Es kann jedoch zu Wartungsarbeiten, technischen Störungen oder temporären Ausfällen kommen.</p>
    <p>Ein Anspruch auf permanente Verfügbarkeit besteht nicht.</p>

    <h2>7. Haftungsbeschränkung</h2>
    <p>Der Dienst wird „wie verfügbar" bereitgestellt.</p>
    <p>bAInder haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen.</p>
    <p>Für indirekte Schäden, Datenverlust oder entgangenen Gewinn wird keine Haftung übernommen, soweit gesetzlich zulässig.</p>

    <h2>8. Kündigung</h2>
    <p>Du kannst dein Konto jederzeit löschen.</p>
    <p>Wir behalten uns das Recht vor, Konten zu sperren oder zu löschen, wenn:</p>
    <ul>
      <li>diese Bedingungen verletzt werden</li>
      <li>der Dienst missbräuchlich genutzt wird</li>
    </ul>

    <h2>9. Änderungen der Bedingungen</h2>
    <p>Wir können diese Nutzungsbedingungen gelegentlich anpassen.</p>
    <p>Über wesentliche Änderungen informieren wir dich per E-Mail oder innerhalb der Anwendung.</p>

    <h2>10. Anwendbares Recht</h2>
    <p>
      Es gilt das Recht von [Land einsetzen, z. B. Österreich].
      Gerichtsstand ist [Stadt einsetzen], sofern gesetzlich zulässig.
    </p>

    <h2>11. Kontakt</h2>
    <p>
      Bei Fragen zu diesen Nutzungsbedingungen kontaktiere uns bitte unter:{" "}
      <a href="mailto:hello@bAInder.net">hello@bAInder.net</a>
    </p>
  </div>
);

const EN = () => (
  <div>
    <h1>Terms of Service</h1>
    <p style={{ color: "#6A90AA" }}>Last updated: March 2026</p>

    <h2>1. Scope</h2>
    <p>
      These Terms of Service govern the use of the bAInder software platform (the &ldquo;Service&rdquo;).
    </p>
    <p>By creating an account you agree to these Terms.</p>

    <h2>2. Service Description</h2>
    <p>bAInder is a web-based software for organising and analysing documents.</p>
    <p>The Service includes, among other things:</p>
    <ul>
      <li>Document upload and storage</li>
      <li>AI-powered analysis and summaries</li>
      <li>Extraction of tasks, deadlines, and categories</li>
    </ul>
    <p>Features may change or be extended over time.</p>

    <h2>3. User Account</h2>
    <p>A user account is required to use the Service.</p>
    <p>You are responsible for:</p>
    <ul>
      <li>the security of your account</li>
      <li>keeping your password confidential</li>
      <li>all activities that occur through your account</li>
    </ul>
    <p>You agree to provide accurate information when registering.</p>

    <h2>4. Uploaded Content</h2>
    <p>You retain all rights to the documents you upload.</p>
    <p>By uploading, you grant bAInder the necessary right to:</p>
    <ul>
      <li>store</li>
      <li>analyse</li>
      <li>process</li>
    </ul>
    <p>your content, solely for the purpose of providing the Service.</p>
    <p>bAInder does not use your documents to train AI models.</p>
    <p>You are responsible for ensuring that you are authorised to process the content you upload.</p>

    <h2>5. Subscriptions and Payments</h2>
    <p>Some features may require a paid subscription. Payments are processed via Stripe.</p>
    <p>Subscriptions:</p>
    <ul>
      <li>renew automatically</li>
      <li>can be cancelled at any time via account settings</li>
    </ul>
    <p>Payments already made are generally non-refundable unless required by law.</p>

    <h2>6. Service Availability</h2>
    <p>We strive to provide the Service with as little interruption as possible.</p>
    <p>However, maintenance, technical issues, or temporary outages may occur.</p>
    <p>No right to permanent availability exists.</p>

    <h2>7. Limitation of Liability</h2>
    <p>The Service is provided &ldquo;as available&rdquo;.</p>
    <p>bAInder is only liable for damages resulting from intentional or grossly negligent conduct.</p>
    <p>No liability is accepted for indirect damages, data loss, or loss of profit, to the extent permitted by law.</p>

    <h2>8. Termination</h2>
    <p>You may delete your account at any time.</p>
    <p>We reserve the right to suspend or delete accounts if:</p>
    <ul>
      <li>these Terms are violated</li>
      <li>the Service is used abusively</li>
    </ul>

    <h2>9. Changes to These Terms</h2>
    <p>We may update these Terms of Service from time to time.</p>
    <p>We will notify you of material changes by email or within the application.</p>

    <h2>10. Governing Law</h2>
    <p>
      The law of [insert country, e.g. Austria] applies.
      Place of jurisdiction is [insert city], to the extent permitted by law.
    </p>

    <h2>11. Contact</h2>
    <p>
      For questions about these Terms, please contact us at:{" "}
      <a href="mailto:hello@bAInder.net">hello@bAInder.net</a>
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
      <style>{`
        .terms-content h1 {
          font-family: var(--font-dm-serif);
          font-size: 2rem;
          color: white;
          margin: 0 0 6px 0;
        }
        .terms-content h2 {
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 48px 0 16px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(230,126,34,0.25);
        }
        .terms-content p {
          font-size: 0.9rem;
          color: #8AAEC7;
          line-height: 1.75;
          margin: 0 0 12px 0;
        }
        .terms-content ul {
          padding-left: 20px;
          margin: 0 0 14px 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .terms-content li {
          font-size: 0.9rem;
          color: #8AAEC7;
          line-height: 1.65;
        }
        .terms-content strong {
          color: rgba(255,255,255,0.85);
          font-weight: 600;
        }
        .terms-content a {
          color: #E67E22;
          text-decoration: none;
        }
        .terms-content a:hover {
          text-decoration: underline;
        }
      `}</style>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div style={{ marginBottom: "32px", borderRadius: "8px", border: "1px solid rgba(230,126,34,0.3)", background: "rgba(230,126,34,0.08)", padding: "12px 16px", fontSize: "0.875rem", color: "#F5A623" }}>
          ⚠️ Fill in your country and city (sections 10) before going live.
        </div>
        <div className="terms-content">
          {locale === "de" ? <DE /> : <EN />}
        </div>
      </div>
    </div>
  );
}
