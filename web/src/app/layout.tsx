import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWidgets } from "@/components/floating-widgets";
import { site } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.msuranus.in"),
  title: {
    default: `${site.name} — CCTV, Biometric & Smart Tech in ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Uranus Enterprise provides CCTV installation, biometric access control, computer & laptop service, networking and home automation across Chennai. Free site survey. Enquire on WhatsApp.",
  keywords: [
    "CCTV installation Chennai",
    "biometric service Chennai",
    "laptop repair Chennai",
    "home automation Chennai",
    "UPS installation Chennai",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      "CCTV, biometric, computer service, networking and home automation in Chennai.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
