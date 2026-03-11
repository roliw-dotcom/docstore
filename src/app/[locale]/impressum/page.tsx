import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — bAInder",
};

const DE = () => (
  <div>
    <h1>Impressum</h1>
    <p style={{ color: "#6A90AA" }}>Angaben gemäß § 5 ECG / § 25 Mediengesetz</p>

    <h2>Unternehmensangaben</h2>
    <p>
      <strong>[UNTERNEHMENSNAME]</strong><br />
      [Straße + Hausnummer]<br />
      [PLZ Stadt]<br />
      [Land]
    </p>
    <p>
      E-Mail: <a href="mailto:hello@bainder.net">hello@bainder.net</a><br />
      Datenschutz: <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>
    </p>
    <p>
      <strong>Vertretungsberechtigt:</strong><br />
      [Name des Geschäftsführers / Inhabers]
    </p>
    <p>
      <strong>Firmenbuchnummer:</strong> [FN XXXX]<br />
      <strong>Firmenbuchgericht:</strong> [Gericht]<br />
      <strong>UID-Nummer:</strong> [ATUXXXXXXX]
    </p>
    <p>
      <strong>Unternehmensgegenstand:</strong><br />
      Bereitstellung einer Softwareplattform zur Analyse und Organisation von Dokumenten mittels KI.
    </p>
    <p>
      <strong>Aufsichtsbehörde:</strong><br />
      [falls zutreffend]
    </p>
    <p>
      <strong>Mitglied der Wirtschaftskammer:</strong><br />
      [WKO Fachgruppe]
    </p>

    <h2>Haftung für Inhalte</h2>
    <p>
      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
      Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
    </p>

    <h2>Haftung für Links</h2>
    <p>
      Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
      Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
    </p>

    <h2>Urheberrecht</h2>
    <p>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem Urheberrecht.
      Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der
      schriftlichen Zustimmung des jeweiligen Autors.
    </p>
  </div>
);

const EN = () => (
  <div>
    <h1>Legal Notice</h1>
    <p style={{ color: "#6A90AA" }}>Information pursuant to § 5 ECG / § 25 Austrian Media Act</p>

    <h2>Company Details</h2>
    <p>
      <strong>[COMPANY NAME]</strong><br />
      [Street + Number]<br />
      [Postal Code, City]<br />
      [Country]
    </p>
    <p>
      E-mail: <a href="mailto:hello@bainder.net">hello@bainder.net</a><br />
      Data protection: <a href="mailto:privacy@bainder.net">privacy@bainder.net</a>
    </p>
    <p>
      <strong>Authorised representative:</strong><br />
      [Name of managing director / owner]
    </p>
    <p>
      <strong>Company register number:</strong> [FN XXXX]<br />
      <strong>Company register court:</strong> [Court]<br />
      <strong>VAT number:</strong> [ATUXXXXXXX]
    </p>
    <p>
      <strong>Business purpose:</strong><br />
      Providing a software platform for AI-powered document analysis and organisation.
    </p>
    <p>
      <strong>Supervisory authority:</strong><br />
      [if applicable]
    </p>
    <p>
      <strong>Member of the Austrian Chamber of Commerce:</strong><br />
      [WKO professional group]
    </p>

    <h2>Liability for Content</h2>
    <p>
      The contents of our pages were created with the greatest care.
      However, we cannot guarantee the accuracy, completeness, or timeliness of the content.
    </p>

    <h2>Liability for Links</h2>
    <p>
      Our website contains links to external third-party websites over whose content we have no influence.
      We therefore cannot accept any liability for such external content.
    </p>

    <h2>Copyright</h2>
    <p>
      The content and works created by the site operators on these pages are subject to copyright law.
      Reproduction, editing, and distribution outside the limits of copyright law require the written
      consent of the respective author.
    </p>
  </div>
);

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div style={{ minHeight: "100vh", background: "#0F2337", color: "white" }}>
      <style>{`
        .legal-content h1 {
          font-family: var(--font-dm-serif);
          font-size: 2rem;
          color: white;
          margin: 0 0 6px 0;
        }
        .legal-content h2 {
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 48px 0 16px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(230,126,34,0.25);
        }
        .legal-content p {
          font-size: 0.9rem;
          color: #8AAEC7;
          line-height: 1.75;
          margin: 0 0 12px 0;
        }
        .legal-content strong {
          color: rgba(255,255,255,0.85);
          font-weight: 600;
        }
        .legal-content a {
          color: #E67E22;
          text-decoration: none;
        }
        .legal-content a:hover {
          text-decoration: underline;
        }
      `}</style>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div style={{ marginBottom: "32px", borderRadius: "8px", border: "1px solid rgba(230,126,34,0.3)", background: "rgba(230,126,34,0.08)", padding: "12px 16px", fontSize: "0.875rem", color: "#F5A623" }}>
          ⚠️ Fill in your company details before going live.
        </div>
        <div className="legal-content">
          {locale === "de" ? <DE /> : <EN />}
        </div>
      </div>
    </div>
  );
}
