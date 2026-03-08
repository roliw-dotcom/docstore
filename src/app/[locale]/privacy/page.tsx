import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — bAInder",
};

const EN = () => (
  <div className="prose prose-stone max-w-none">
    <h1>Privacy Policy</h1>
    <p className="text-stone-500">Last updated: March 2026</p>

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
  <div className="prose prose-stone max-w-none">
    <h1>Datenschutzerklärung</h1>
    <p className="text-stone-500">Zuletzt aktualisiert: März 2026</p>

    <h2>1. Verantwortlicher</h2>
    <p>
      <strong>[IHR UNTERNEHMENSNAME]</strong><br />
      [Straße, Stadt, PLZ, Land]<br />
      E-Mail: <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>
    </p>

    <h2>2. Erhobene Daten</h2>
    <ul>
      <li><strong>Kontodaten:</strong> E-Mail-Adresse und verschlüsseltes Passwort (verwaltet von Supabase Auth).</li>
      <li><strong>Dokumente:</strong> PDF-Dateien und Bilder, die du hochlädst, gespeichert in einem privaten Supabase-Storage-Bucket, der nur für dich zugänglich ist.</li>
      <li><strong>Dokumenten-Metadaten:</strong> KI-extrahierte Zusammenfassungen, Schlagwörter, Kategorien und Follow-up-Punkte.</li>
      <li><strong>Zahlungsinformationen:</strong> Stripe übernimmt die gesamte Zahlungsabwicklung. Wir speichern nur deinen Abonnementstatus; wir sehen niemals deine Kartennummer.</li>
      <li><strong>Cookies:</strong> Ein technisch notwendiges Session-Cookie von Supabase, um dich angemeldet zu halten. Es werden keine Tracking- oder Werbe-Cookies gesetzt.</li>
    </ul>

    <h2>3. Rechtsgrundlage (Art. 6 DSGVO)</h2>
    <p>
      Die Verarbeitung ist zur Erfüllung des Vertrags zwischen dir und bainder erforderlich (Art. 6 Abs. 1 lit. b DSGVO).
      Session-Cookies sind für den Betrieb des Dienstes technisch notwendig.
    </p>

    <h2>4. Auftragsverarbeiter</h2>
    <ul>
      <li><strong>Supabase (EU):</strong> Datenbank und Dateispeicherung</li>
      <li><strong>Anthropic:</strong> KI-Textextraktion über die Claude API. Der Dokumententext wird zur Verarbeitung an die Claude API gesendet und nicht zum Training von Modellen verwendet.</li>
      <li><strong>Stripe:</strong> Zahlungsabwicklung</li>
      <li><strong>Resend:</strong> E-Mail-Zustellung</li>
      <li><strong>Vercel:</strong> Anwendungshosting</li>
    </ul>

    <h2>5. Speicherdauer</h2>
    <p>
      Deine Daten werden gespeichert, solange dein Konto aktiv ist. Du kannst dein Konto jederzeit unter
      <strong>Einstellungen → Abrechnung → Gefahrenzone</strong> löschen, wodurch alle Dokumente,
      Metadaten und Zugangsdaten dauerhaft gelöscht werden. Zahlungsaufzeichnungen können von Stripe
      gemäß gesetzlicher Anforderungen aufbewahrt werden.
    </p>

    <h2>6. Deine Rechte</h2>
    <p>Gemäß DSGVO hast du das Recht auf:</p>
    <ul>
      <li><strong>Auskunft</strong> über deine gespeicherten personenbezogenen Daten.</li>
      <li><strong>Berichtigung</strong> unrichtiger Daten.</li>
      <li><strong>Löschung</strong> – nutze die In-App-Kontolöschung oder kontaktiere uns.</li>
      <li><strong>Datenübertragbarkeit</strong> in einem maschinenlesbaren Format.</li>
      <li><strong>Widerspruch</strong> gegen die Verarbeitung auf Basis berechtigter Interessen.</li>
      <li><strong>Beschwerde</strong> bei der zuständigen Aufsichtsbehörde (in Deutschland: <em>Bundesbeauftragte für den Datenschutz und die Informationsfreiheit</em>).</li>
    </ul>
    <p>Zur Ausübung deiner Rechte kontaktiere uns unter <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>.</p>

    <h2>7. Kontakt</h2>
    <p>
      Für datenschutzbezogene Fragen wende dich an <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>.
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
    <div className="min-h-screen bg-[#FAFAF7]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          ⚠️ Review and fill in your company details (name, address) before going live.
        </div>
        {locale === "de" ? <DE /> : <EN />}
      </div>
    </div>
  );
}
