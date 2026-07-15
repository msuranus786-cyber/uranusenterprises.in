// JSON-LD builders for structured data (rendered via <JsonLd />).
// Only real data goes in here — ratings and reviews come from the database.

import type { SiteSettings, Service, Package, Review } from "./data";
import type { Faq } from "./faq";
import { siteUrl } from "./site-url";
import { areas } from "./areas";

export function localBusinessSchema(site: SiteSettings, reviews: Review[]) {
  const rated = reviews.filter((r) => r.rating > 0);
  const avg =
    rated.length > 0
      ? rated.reduce((sum, r) => sum + r.rating, 0) / rated.length
      : null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: site.name,
    url: siteUrl,
    image: `${siteUrl}/logo.jpg`,
    telephone: site.phoneDisplay,
    ...(site.email ? { email: site.email } : {}),
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "20:00",
    },
    areaServed: [
      { "@type": "City", name: "Chennai" },
      ...areas.map((a) => ({ "@type": "Place" as const, name: `${a.name}, Chennai` })),
    ],
    ...(avg
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Math.round(avg * 10) / 10,
            reviewCount: rated.length,
          },
        }
      : {}),
  };
}

export function serviceSchema(service: Service, site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.category,
    provider: { "@id": `${siteUrl}/#business`, "@type": "LocalBusiness", name: site.name },
    areaServed: { "@type": "City", name: "Chennai" },
    url: `${siteUrl}/services/${service.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: service.startingPrice,
      availability: service.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}

export function packageProductSchema(pkg: Package, site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${pkg.name} CCTV Package`,
    description: pkg.features.join(", "),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: pkg.price,
      availability: "https://schema.org/InStock",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqSchema(entries: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
