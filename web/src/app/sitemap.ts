import type { MetadataRoute } from "next";
import { getServices } from "@/lib/db";
import { areas } from "@/lib/areas";
import { siteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();

  const routes = ["", "/services", "/faq", "/areas", "/about", "/contact", "/feedback"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/feedback" ? 0.5 : 0.8,
    }),
  );

  const serviceRoutes = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const areaRoutes = areas.map((a) => ({
    url: `${siteUrl}/areas/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...serviceRoutes, ...areaRoutes];
}
