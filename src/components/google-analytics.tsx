"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID; // e.g. AW-123456789

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    window.gtag("config", GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  return null;
}

/** Fire a GA4 event (e.g. sign_up, purchase) */
export function trackConversion(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Fire a Google Ads conversion.
 * label comes from your Google Ads conversion action (e.g. "abc123XYZ").
 * Set NEXT_PUBLIC_GADS_CONVERSION_ID=AW-XXXXXXXXX in env vars.
 */
export function trackAdsConversion(label: string, value?: number) {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !GADS_ID) return;
  window.gtag("event", "conversion", {
    send_to: `${GADS_ID}/${label}`,
    ...(value !== undefined ? { value, currency: "EUR" } : {}),
  });
}

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  const extraConfig = GADS_ID ? `gtag('config', '${GADS_ID}');` : "";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          ${extraConfig}
        `}
      </Script>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}
