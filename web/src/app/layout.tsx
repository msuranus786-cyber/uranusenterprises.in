import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWidgets } from "@/components/floating-widgets";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { localBusinessSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/site-url";
import { site } from "@/lib/data";
import {
  getSiteSettings,
  getServices,
  getAllPackages,
  getAllReviews,
} from "@/lib/db";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — CCTV, Biometric & Smart Tech in ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Uranus Enterprises provides CCTV installation, biometric access control, computer & laptop service, networking and home automation across Chennai. Free site survey. Enquire on WhatsApp.",
  keywords: [
    "CCTV installation Chennai",
    "biometric service Chennai",
    "laptop repair Chennai",
    "home automation Chennai",
    "UPS installation Chennai",
  ],
  alternates: { canonical: "/" },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      "CCTV, biometric, computer service, networking and home automation in Chennai.",
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description:
      "CCTV, biometric, computer service, networking and home automation in Chennai.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, services, packages, reviews] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAllPackages(),
    getAllReviews(),
  ]);

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white antialiased">
        <JsonLd data={localBusinessSchema(settings, reviews)} />
        <Navbar
          whatsappNumber={settings.whatsappNumber}
          phoneDisplay={settings.phoneDisplay}
        />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWidgets site={settings} services={services} packages={packages} />
        <Analytics />
      </body>
    </html>
  );
}
