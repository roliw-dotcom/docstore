import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — bAIndly",
};

const EN = () => (
  <div>
    <h1>Privacy Policy</h1>
    <p style={{ color: "#6A90AA" }}>Last updated: March 2026</p>

    <h2>1. Controller</h2>
    <p>
      The controller within the meaning of the General Data Protection Regulation (GDPR) is:<br /><br />
      <strong>[COMPANY NAME]</strong><br />
      [Street + Number]<br />
      [Postal Code, City]<br />
      [Country]<br /><br />
      E-mail: <a href="mailto:privacy@baindly.com">privacy@baindly.com</a>
    </p>
    <p>For any questions regarding data protection, please contact us at the email address above.</p>

    <h2>2. Data We Collect</h2>
    <p>We process personal data only to the extent necessary to provide and operate our service.</p>

    <h3>Account data</h3>
    <ul>
      <li>Email address</li>
      <li>Encrypted password</li>
    </ul>
    <p>Authentication is provided by Supabase Auth.</p>

    <h3>Uploaded documents</h3>
    <p>When you upload documents, we process:</p>
    <ul>
      <li>PDF files</li>
      <li>Images</li>
      <li>Other document files</li>
    </ul>
    <p>These files are stored in a private Supabase Storage bucket associated exclusively with your user account.</p>

    <h3>Document metadata</h3>
    <p>The following information may be automatically extracted from your documents:</p>
    <ul>
      <li>Summaries</li>
      <li>Keywords</li>
      <li>Categories</li>
      <li>Tasks or follow-up items</li>
    </ul>
    <p>This metadata is stored to improve the usability of the service.</p>

    <h3>Server log data</h3>
    <p>When you access our application, technical data is automatically processed:</p>
    <ul>
      <li>IP address</li>
      <li>Time of request</li>
      <li>Browser type</li>
      <li>Operating system</li>
    </ul>
    <p>This data is used exclusively for system security and stability.</p>

    <h3>Payment information</h3>
    <p>Payment processing is handled by Stripe. We store only:</p>
    <ul>
      <li>your subscription status</li>
      <li>payment events (e.g. active, cancelled)</li>
    </ul>
    <p>We have no access to your credit card details.</p>

    <h3>Cookies</h3>
    <p>
      We use only strictly necessary session cookies set by Supabase to keep you signed in during your
      session. No tracking or advertising cookies are used.
    </p>

    <h2>3. Legal Basis for Processing (Art. 6 GDPR)</h2>
    <p>Processing of your data is based on the following legal grounds:</p>

    <p><strong>Art. 6(1)(b) GDPR — Performance of a contract</strong><br />
    Processing is necessary to provide our service, including:</p>
    <ul>
      <li>User accounts</li>
      <li>Document storage</li>
      <li>AI-powered analysis</li>
      <li>Subscription management</li>
    </ul>

    <p><strong>Art. 6(1)(f) GDPR — Legitimate interests</strong><br />
    Some processing is based on our legitimate interests, in particular:</p>
    <ul>
      <li>Ensuring IT security</li>
      <li>Preventing abuse and fraud</li>
      <li>System stability and error analysis</li>
    </ul>

    <h2>4. Processors</h2>
    <p>
      We use third-party service providers (processors) to deliver our service. They process data solely
      according to our instructions and under data processing agreements pursuant to Art. 28 GDPR.
    </p>
    <ul>
      <li><strong>Supabase (EU):</strong> Database, authentication, and file storage.</li>
      <li><strong>Anthropic:</strong> AI text extraction via the Claude API. Document text may be transmitted to the API for analysis. According to the provider, this data is not used to train models.</li>
      <li><strong>Stripe:</strong> Payment processing and subscription management.</li>
      <li><strong>Resend:</strong> Delivery of system-relevant emails (e.g. login or notifications).</li>
      <li><strong>Vercel:</strong> Hosting of the web application.</li>
    </ul>

    <h2>5. International Data Transfers</h2>
    <p>
      Some of our service providers may process data outside the European Union or the European Economic
      Area. In such cases, data transfers take place only in compliance with the legal requirements of the
      GDPR, in particular on the basis of:
    </p>
    <ul>
      <li>EU Standard Contractual Clauses (Art. 46 GDPR), or</li>
      <li>other appropriate safeguards to protect personal data.</li>
    </ul>

    <h2>6. Retention</h2>
    <p>We store personal data only for as long as necessary for the respective purpose.</p>

    <p><strong>Account data</strong><br />Stored for as long as your user account is active.</p>

    <p><strong>Documents and metadata</strong><br />
    Stored for as long as your account exists. When you delete your account, all documents, metadata,
    and credentials are permanently deleted.</p>

    <p>
      <strong>Inactivity policy:</strong> Accounts with no sign-in for 11 months will receive a reminder
      email. If no sign-in occurs within 30 days, the account, all documents, and all associated data will
      be permanently deleted. Active Pro subscribers are exempt from this policy while their subscription
      remains active.
    </p>

    <p><strong>Payment data</strong><br />Stripe may retain payment information in accordance with statutory retention obligations.</p>

    <p><strong>Server logs</strong><br />Server log data is stored for a maximum of 30 days for security purposes.</p>

    <h2>7. Your Rights</h2>
    <p>Under the GDPR you have the following rights:</p>
    <ul>
      <li><strong>Access</strong> (Art. 15 GDPR) to your stored personal data</li>
      <li><strong>Rectification</strong> (Art. 16 GDPR) of inaccurate data</li>
      <li><strong>Erasure</strong> (Art. 17 GDPR) of your data</li>
      <li><strong>Restriction of processing</strong> (Art. 18 GDPR)</li>
      <li><strong>Data portability</strong> (Art. 20 GDPR)</li>
      <li><strong>Object</strong> to processing (Art. 21 GDPR)</li>
    </ul>
    <p>
      To exercise your rights, you may delete your account within the application or contact us at{" "}
      <a href="mailto:privacy@baindly.com">privacy@baindly.com</a>.
    </p>

    <h2>8. Right to Lodge a Complaint</h2>
    <p>You have the right to lodge a complaint with a data protection supervisory authority.</p>
    <p>The competent authority in Austria is:</p>
    <p>
      Österreichische Datenschutzbehörde<br />
      Barichgasse 40–42<br />
      1030 Vienna, Austria<br />
      <a href="https://www.dsb.gv.at" target="_blank" rel="noreferrer">https://www.dsb.gv.at</a>
    </p>

    <h2>9. Data Security</h2>
    <p>
      We implement appropriate technical and organisational measures (TOMs) to protect your data,
      including:
    </p>
    <ul>
      <li>Encrypted data transmission (HTTPS)</li>
      <li>Access controls</li>
      <li>Secure cloud infrastructure</li>
      <li>Regular security updates</li>
    </ul>

    <h2>10. Automated Decision-Making</h2>
    <p>
      No automated decision-making within the meaning of Art. 22 GDPR takes place. The AI features
      are used solely to assist with document analysis.
    </p>

    <h2>11. Contact</h2>
    <p>
      For any questions regarding data protection or the processing of your data, please contact us at:{" "}
      <a href="mailto:privacy@baindly.com">privacy@baindly.com</a>
    </p>
  </div>
);

const DE = () => (
  <div>
    <h1>Datenschutzerklärung</h1>
    <p style={{ color: "#6A90AA" }}>Zuletzt aktualisiert: März 2026</p>

    <h2>1. Verantwortlicher</h2>
    <p>
      Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><br />
      <strong>[UNTERNEHMENSNAME]</strong><br />
      [Straße + Hausnummer]<br />
      [PLZ, Stadt]<br />
      [Land]<br /><br />
      E-Mail: <a href="mailto:privacy@baindly.com">privacy@baindly.com</a>
    </p>
    <p>Bei Fragen zum Datenschutz kannst du uns jederzeit unter der oben genannten E-Mail-Adresse kontaktieren.</p>

    <h2>2. Erhobene Daten</h2>
    <p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung und zum Betrieb unseres Dienstes erforderlich ist.</p>

    <h3>Kontodaten</h3>
    <ul>
      <li>E-Mail-Adresse</li>
      <li>Verschlüsseltes Passwort</li>
    </ul>
    <p>Die Authentifizierung wird über Supabase Auth bereitgestellt.</p>

    <h3>Hochgeladene Dokumente</h3>
    <p>Wenn du Dokumente hochlädst, verarbeiten wir:</p>
    <ul>
      <li>PDF-Dateien</li>
      <li>Bilder</li>
      <li>andere Dokumentdateien</li>
    </ul>
    <p>Diese Dateien werden in einem privaten Supabase Storage Bucket gespeichert, der ausschließlich deinem Benutzerkonto zugeordnet ist.</p>

    <h3>Dokument-Metadaten</h3>
    <p>Aus deinen Dokumenten können automatisch folgende Informationen extrahiert werden:</p>
    <ul>
      <li>Zusammenfassungen</li>
      <li>Schlagwörter</li>
      <li>Kategorien</li>
      <li>Aufgaben oder Follow-up-Punkte</li>
    </ul>
    <p>Diese Metadaten werden zur Verbesserung der Nutzbarkeit des Dienstes gespeichert.</p>

    <h3>Server-Logdaten</h3>
    <p>Beim Zugriff auf unsere Anwendung werden automatisch technische Daten verarbeitet:</p>
    <ul>
      <li>IP-Adresse</li>
      <li>Zeitpunkt der Anfrage</li>
      <li>Browsertyp</li>
      <li>Betriebssystem</li>
    </ul>
    <p>Diese Daten dienen ausschließlich der Sicherheit und Stabilität des Systems.</p>

    <h3>Zahlungsinformationen</h3>
    <p>Die Zahlungsabwicklung erfolgt über Stripe. Wir speichern lediglich:</p>
    <ul>
      <li>deinen Abonnementstatus</li>
      <li>Zahlungsereignisse (z. B. aktiv, gekündigt)</li>
    </ul>
    <p>Wir haben keinen Zugriff auf deine Kreditkartendaten.</p>

    <h3>Cookies</h3>
    <p>
      Wir verwenden ausschließlich technisch notwendige Session-Cookies, die von Supabase gesetzt werden,
      um dich während deiner Sitzung angemeldet zu halten. Es werden keine Tracking- oder Werbe-Cookies eingesetzt.
    </p>

    <h2>3. Rechtsgrundlage der Verarbeitung (Art. 6 DSGVO)</h2>
    <p>Die Verarbeitung deiner Daten erfolgt auf Grundlage folgender Rechtsgrundlagen:</p>

    <p><strong>Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung</strong><br />
    Die Verarbeitung ist erforderlich, um dir unseren Dienst bereitzustellen, einschließlich:</p>
    <ul>
      <li>Benutzerkonten</li>
      <li>Dokumentenspeicherung</li>
      <li>KI-gestützte Analyse</li>
      <li>Abonnementverwaltung</li>
    </ul>

    <p><strong>Art. 6 Abs. 1 lit. f DSGVO – Berechtigtes Interesse</strong><br />
    Einige Verarbeitungen erfolgen zur Wahrung berechtigter Interessen, insbesondere:</p>
    <ul>
      <li>Gewährleistung der IT-Sicherheit</li>
      <li>Missbrauchs- und Betrugsprävention</li>
      <li>Systemstabilität und Fehleranalyse</li>
    </ul>

    <h2>4. Auftragsverarbeiter</h2>
    <p>
      Wir nutzen externe Dienstleister (Auftragsverarbeiter) zur Bereitstellung unseres Dienstes.
      Diese verarbeiten Daten ausschließlich gemäß unseren Weisungen und auf Grundlage von
      Auftragsverarbeitungsverträgen gemäß Art. 28 DSGVO.
    </p>
    <ul>
      <li><strong>Supabase (EU):</strong> Bereitstellung von Datenbank, Authentifizierung und Dateispeicherung.</li>
      <li><strong>Anthropic:</strong> KI-Textextraktion über die Claude API. Dokumenttexte können zur Analyse an die API übermittelt werden. Laut Anbieter werden diese Daten nicht zum Training von Modellen verwendet.</li>
      <li><strong>Stripe:</strong> Zahlungsabwicklung und Abonnementverwaltung.</li>
      <li><strong>Resend:</strong> Versand von systemrelevanten E-Mails (z. B. Login oder Benachrichtigungen).</li>
      <li><strong>Vercel:</strong> Hosting der Webanwendung.</li>
    </ul>

    <h2>5. Internationale Datenübermittlungen</h2>
    <p>
      Einige unserer Dienstleister können Daten außerhalb der Europäischen Union oder des Europäischen
      Wirtschaftsraums verarbeiten. In solchen Fällen erfolgt die Datenübermittlung nur unter Einhaltung
      der gesetzlichen Vorgaben der DSGVO, insbesondere auf Grundlage von:
    </p>
    <ul>
      <li>EU-Standardvertragsklauseln (Art. 46 DSGVO) oder</li>
      <li>anderen geeigneten Garantien zum Schutz personenbezogener Daten.</li>
    </ul>

    <h2>6. Speicherdauer</h2>
    <p>Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist.</p>

    <p><strong>Kontodaten</strong><br />Werden gespeichert, solange dein Benutzerkonto aktiv ist.</p>

    <p><strong>Dokumente und Metadaten</strong><br />
    Werden gespeichert, solange dein Konto besteht. Wenn du dein Konto löschst, werden alle Dokumente,
    Metadaten und Zugangsdaten dauerhaft gelöscht.</p>

    <p>
      <strong>Inaktivitätsrichtlinie:</strong> Konten ohne Anmeldung über 11 Monate erhalten eine
      Erinnerungs-E-Mail. Wenn innerhalb von 30 Tagen keine Anmeldung erfolgt, werden das Konto, alle
      Dokumente und alle zugehörigen Daten dauerhaft gelöscht. Aktive Pro-Abonnenten sind von dieser
      Regelung ausgenommen, solange ihr Abonnement aktiv ist.
    </p>

    <p><strong>Zahlungsdaten</strong><br />Stripe kann Zahlungsinformationen gemäß gesetzlichen Aufbewahrungspflichten speichern.</p>

    <p><strong>Server-Logs</strong><br />Server-Logdaten werden aus Sicherheitsgründen für maximal 30 Tage gespeichert.</p>

    <h2>7. Deine Rechte</h2>
    <p>Du hast gemäß DSGVO folgende Rechte:</p>
    <ul>
      <li><strong>Auskunft</strong> (Art. 15 DSGVO) über deine gespeicherten personenbezogenen Daten</li>
      <li><strong>Berichtigung</strong> (Art. 16 DSGVO) unrichtiger Daten</li>
      <li><strong>Löschung</strong> (Art. 17 DSGVO) deiner Daten</li>
      <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
      <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
      <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
    </ul>
    <p>
      Zur Ausübung deiner Rechte kannst du dein Konto in der Anwendung löschen oder uns unter{" "}
      <a href="mailto:privacy@baindly.com">privacy@baindly.com</a> kontaktieren.
    </p>

    <h2>8. Beschwerderecht</h2>
    <p>Du hast das Recht, eine Beschwerde bei einer Datenschutzaufsichtsbehörde einzureichen.</p>
    <p>Zuständige Behörde in Österreich:</p>
    <p>
      Österreichische Datenschutzbehörde<br />
      Barichgasse 40–42<br />
      1030 Wien<br />
      <a href="https://www.dsb.gv.at" target="_blank" rel="noreferrer">https://www.dsb.gv.at</a>
    </p>

    <h2>9. Sicherheit der Daten</h2>
    <p>
      Wir verwenden angemessene technische und organisatorische Maßnahmen (TOMs), um deine Daten zu schützen.
      Dazu gehören insbesondere:
    </p>
    <ul>
      <li>verschlüsselte Datenübertragung (HTTPS)</li>
      <li>Zugriffsbeschränkungen</li>
      <li>sichere Cloud-Infrastruktur</li>
      <li>regelmäßige Sicherheitsupdates</li>
    </ul>

    <h2>10. Automatisierte Entscheidungen</h2>
    <p>
      Es findet keine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO statt.
      Die KI-Funktionen dienen ausschließlich der Unterstützung bei der Analyse von Dokumenten.
    </p>

    <h2>11. Kontakt</h2>
    <p>
      Bei Fragen zum Datenschutz oder zur Verarbeitung deiner Daten kontaktiere uns bitte unter:{" "}
      <a href="mailto:privacy@baindly.com">privacy@baindly.com</a>
    </p>
  </div>
);

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div style={{ minHeight: "100vh", background: "#0F2337", color: "white" }}>
      <style>{`
        .privacy-content h1 {
          font-family: var(--font-dm-serif);
          font-size: 2rem;
          color: white;
          margin: 0 0 6px 0;
        }
        .privacy-content h2 {
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 48px 0 16px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(230,126,34,0.25);
        }
        .privacy-content h3 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #E67E22;
          margin: 24px 0 8px 0;
        }
        .privacy-content p {
          font-size: 0.9rem;
          color: #8AAEC7;
          line-height: 1.75;
          margin: 0 0 12px 0;
        }
        .privacy-content ul {
          padding-left: 20px;
          margin: 0 0 14px 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .privacy-content li {
          font-size: 0.9rem;
          color: #8AAEC7;
          line-height: 1.65;
        }
        .privacy-content strong {
          color: rgba(255,255,255,0.85);
          font-weight: 600;
        }
        .privacy-content a {
          color: #E67E22;
          text-decoration: none;
        }
        .privacy-content a:hover {
          text-decoration: underline;
        }
      `}</style>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div style={{ marginBottom: "32px", borderRadius: "8px", border: "1px solid rgba(230,126,34,0.3)", background: "rgba(230,126,34,0.08)", padding: "12px 16px", fontSize: "0.875rem", color: "#F5A623" }}>
          ⚠️ Review and fill in your company details (name, address) before going live.
        </div>
        <div className="privacy-content">
          {locale === "de" ? <DE /> : <EN />}
        </div>
      </div>
    </div>
  );
}
