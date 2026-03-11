import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — bAInder",
};

const EN = () => (
  <div>
    <h1>Privacy Policy</h1>
    <p style={{ color: "#6A90AA" }}>Last updated: March 2026</p>

    <h2>1. Controller</h2>
    <p>
      <strong>[YOUR COMPANY NAME]</strong><br />
      [Street, City, Postal Code, Country]<br />
      E-mail: <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>
    </p>

    <h2>2. Data We Collect</h2>
    <ul>
      <li><strong>Account data:</strong> email address and encrypted password (managed by Supabase Auth).</li>
      <li><strong>Documents:</strong> PDF files and images you upload, stored in a private Supabase Storage bucket accessible only to you.</li>
      <li><strong>Document metadata:</strong> AI-extracted summaries, keywords, categories, and follow-up items derived from your documents.</li>
      <li><strong>Payment information:</strong> Stripe handles all payment processing. We store only your subscription status and plan tier; we never see your card number.</li>
      <li><strong>Cookies:</strong> A strictly necessary session cookie issued by Supabase to keep you signed in. No tracking or advertising cookies are set.</li>
    </ul>

    <h2>3. Legal Basis (GDPR Art. 6)</h2>
    <p>
      Processing is necessary for the performance of the contract between you and bainder (Art. 6(1)(b) GDPR).
      Session cookies are strictly necessary for the service to function.
    </p>

    <h2>4. Processors</h2>
    <ul>
      <li><strong>Supabase (EU):</strong> database and file storage — <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a></li>
      <li><strong>Anthropic:</strong> AI text extraction via the Claude API — <a href="https://www.anthropic.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>. Document text is sent to the Claude API for processing and is not used to train models.</li>
      <li><strong>Stripe:</strong> payment processing — <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a></li>
      <li><strong>Resend:</strong> transactional email delivery — <a href="https://resend.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a></li>
      <li><strong>Vercel:</strong> application hosting — <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a></li>
    </ul>

    <h2>5. Retention</h2>
    <p>
      Your data is retained for as long as your account is active. You may delete your account at any time
      from <strong>Settings → Billing → Danger Zone</strong>, which permanently erases all documents,
      metadata, and your account credentials. Payment records may be retained by Stripe as required by law.
    </p>
    <p>
      <strong>Inactivity policy:</strong> Accounts that have not been signed into for 11 months will receive
      an email warning. If no sign-in occurs within 30 days of that warning (12 months total inactivity),
      the account and all associated data will be permanently deleted. Active Pro subscribers are exempt
      from this policy while their subscription remains active.
    </p>

    <h2>6. Your Rights</h2>
    <p>Under the GDPR you have the right to:</p>
    <ul>
      <li><strong>Access</strong> a copy of the personal data we hold about you.</li>
      <li><strong>Rectification</strong> of inaccurate data.</li>
      <li><strong>Erasure</strong> ("right to be forgotten") — use the in-app account deletion or contact us.</li>
      <li><strong>Portability</strong> of your data in a machine-readable format.</li>
      <li><strong>Object</strong> to processing based on legitimate interests.</li>
      <li><strong>Lodge a complaint</strong> with your national supervisory authority (in Germany: <em>Bundesbeauftragte für den Datenschutz und die Informationsfreiheit</em>).</li>
    </ul>
    <p>To exercise any right, contact us at <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>.</p>

    <h2>7. Contact</h2>
    <p>
      For any privacy-related questions, email <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>.
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
      E-Mail: <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>
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
      <a href="mailto:privacy@bainder.net">privacy@bainder.net</a> kontaktieren.
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
      <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>
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
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div style={{ marginBottom: "32px", borderRadius: "8px", border: "1px solid rgba(230,126,34,0.3)", background: "rgba(230,126,34,0.08)", padding: "12px 16px", fontSize: "0.875rem", color: "#F5A623" }}>
          ⚠️ Review and fill in your company details (name, address) before going live.
        </div>
        <div className="prose prose-invert max-w-none">
          {locale === "de" ? <DE /> : <EN />}
        </div>
      </div>
    </div>
  );
}
