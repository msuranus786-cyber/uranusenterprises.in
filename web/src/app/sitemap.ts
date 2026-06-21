import type { MetadataRoute } from "next";
import { getServices } from "@/lib/db";

const base = "https://www.msuranus.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();

  const routes = ["", "/services", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
