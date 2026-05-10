import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { getAllInsights } from "@/lib/insights";
import { services } from "@/content/services";
import { site } from "@/lib/site";

const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: string;
}> = [
  { path: "/",         changeFrequency: "weekly",  priority: 1.0 },
  { path: "/video",    changeFrequency: "monthly", priority: 0.95, lastModified: "2026-04-20" },
  { path: "/seo",      changeFrequency: "monthly", priority: 0.85, lastModified: "2026-04-20" },
  { path: "/paid",     changeFrequency: "monthly", priority: 0.85, lastModified: "2026-04-20" },
  { path: "/social",   changeFrequency: "monthly", priority: 0.85, lastModified: "2026-04-20" },
  { path: "/email",    changeFrequency: "monthly", priority: 0.85, lastModified: "2026-04-20" },
  { path: "/services", changeFrequency: "monthly", priority: 0.9,  lastModified: "2026-04-20" },
  { path: "/work",     changeFrequency: "monthly", priority: 0.9,  lastModified: "2026-04-20" },
  { path: "/insights", changeFrequency: "weekly",  priority: 0.8 },
  { path: "/about",    changeFrequency: "monthly", priority: 0.7,  lastModified: "2026-04-20" },
  { path: "/contact",  changeFrequency: "yearly",  priority: 0.7,  lastModified: "2026-04-20" },
  { path: "/careers",  changeFrequency: "monthly", priority: 0.5,  lastModified: "2026-04-20" },
  { path: "/dpdp",     changeFrequency: "yearly",  priority: 0.3,  lastModified: "2026-04-20" },
  { path: "/privacy",      changeFrequency: "yearly", priority: 0.3, lastModified: "2026-04-20" },
  { path: "/terms",        changeFrequency: "yearly", priority: 0.3, lastModified: "2026-04-20" },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-04-20" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: r.lastModified ? new Date(r.lastModified) : now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: s.flagship ? 0.85 : 0.75,
  }));

  const insights = await getAllInsights();

  const insightEntries: MetadataRoute.Sitemap = insights.map((a) => ({
    url: `${site.url}/insights/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly",
    priority: a.featured ? 0.75 : 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...insightEntries,
  ];
}
