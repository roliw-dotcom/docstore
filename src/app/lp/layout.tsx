import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import GoogleAnalytics from "@/components/google-analytics";
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
  title: "bAIndly",
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSerifDisplay.variable} ${inter.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
