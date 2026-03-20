import { MetadataRoute } from "next";

const BASE_URL = "https://baindly.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/en/dashboard",
          "/de/dashboard",
          "/en/forgot-password",
          "/de/forgot-password",
          "/en/reset-password",
          "/de/reset-password",
          "/api/",
          "/auth/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
