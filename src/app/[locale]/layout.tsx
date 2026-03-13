import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CookieBanner } from "@/components/cookie-banner";
import Navbar from "@/components/navbar";
import GoogleAnalytics from "@/components/google-analytics";
import { createClient } from "@/lib/supabase/server";
import "../globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bAInder — Your AI that reads the fine print.",
  description:
    "bAInder reads your PDFs so you don't have to. AI extracts every deadline, obligation, and action item — and reminds you before anything is due.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang={locale}>
      <body className={`${dmSerifDisplay.variable} ${inter.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <Navbar user={user} />
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
