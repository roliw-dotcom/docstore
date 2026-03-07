import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Prevent pdf-parse from being bundled — it must run as a native Node module
  serverExternalPackages: ["pdf-parse"],
  // Copy pdf.js worker to public folder so react-pdf can load it
  turbopack: {
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};

export default withNextIntl(nextConfig);
