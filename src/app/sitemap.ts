import { MetadataRoute } from "next";

const BASE_URL = "https://baindly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static public pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/en`,          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/de`,          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/en/signup`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/de/signup`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/en/login`,    lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/de/login`,    lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/en/pricing`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/de/pricing`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/en/privacy`,  lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/de/privacy`,  lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/en/terms`,    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/de/terms`,    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/en/impressum`,lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE_URL}/de/impressum`,lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  // Landing pages
  const landingPages: MetadataRoute.Sitemap = [
    "fine-print",
    "freelancer-contracts",
    "deadline-tracker",
    "family-documents",
    "familien-dokumente",
    "kuendigungsfrist",
    "mietvertrag-ki",
  ].map((slug) => ({
    url: `${BASE_URL}/lp/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...landingPages];
}
