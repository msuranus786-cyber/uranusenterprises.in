// Canonical origin for metadata, sitemap, robots and structured data.
// Override per environment with NEXT_PUBLIC_SITE_URL (no trailing slash needed).
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.uranusenterprises.in"
).replace(/\/+$/, "");
