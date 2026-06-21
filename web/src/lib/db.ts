import { prisma } from "./prisma";
import {
  site as staticSite,
  services as staticServices,
  packages as staticPackages,
  reviews as staticReviews,
  type SiteSettings,
  type Service,
  type Package,
  type Review,
} from "./data";
import { cache } from "react";

// Each query tries the database first. If it fails (e.g. no Postgres running),
// it falls back to the hardcoded data so the site always works.

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const row = await prisma.siteSettings.findFirst();
    if (row) return row;
  } catch {}
  return staticSite;
});

export const getServices = cache(async (): Promise<Service[]> => {
  try {
    const rows = await prisma.service.findMany({
      where: { available: true },
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length) return rows as Service[];
  } catch {}
  return staticServices;
});

export const getService = cache(
  async (slug: string): Promise<Service | undefined> => {
    try {
      const row = await prisma.service.findUnique({ where: { slug } });
      if (row) return row as Service;
    } catch {}
    return staticServices.find((s) => s.slug === slug);
  }
);

export const getPackages = cache(
  async (serviceSlug: string): Promise<Package[]> => {
    try {
      const rows = await prisma.package.findMany({
        where: { serviceSlug },
        orderBy: { sortOrder: "asc" },
      });
      if (rows.length) return rows;
    } catch {}
    return staticPackages.filter((p) => p.serviceSlug === serviceSlug);
  }
);

export const getAllPackages = cache(async (): Promise<Package[]> => {
  try {
    const rows = await prisma.package.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length) return rows;
  } catch {}
  return staticPackages;
});

export const getReviews = cache(
  async (serviceSlug?: string): Promise<Review[]> => {
    try {
      const rows = await prisma.review.findMany({
        where: {
          approved: true,
          ...(serviceSlug ? { serviceSlug } : {}),
        },
        orderBy: { createdAt: "desc" },
      });
      if (rows.length) return rows;
    } catch {}
    if (serviceSlug) {
      return staticReviews.filter((r) => r.serviceSlug === serviceSlug);
    }
    return staticReviews;
  }
);

export const getAllReviews = cache(async (): Promise<Review[]> => {
  try {
    const rows = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    if (rows.length) return rows;
  } catch {}
  return staticReviews;
});
