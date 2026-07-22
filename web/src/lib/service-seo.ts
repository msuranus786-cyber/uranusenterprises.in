// Curated SEO title/description per service — hand-written to cover the
// specific search phrases customers actually use (e.g. "CCTV camera
// installation near me", "laptop repair", "biometric attendance system"),
// which the generic `service.title` alone doesn't capture.
// Any service without an entry here (e.g. a new one added via /admin) falls
// back to a template built from its own fields, so nothing ever breaks.

export type ServiceSeo = { title: string; description: string };

export const serviceSeo: Record<string, ServiceSeo> = {
  "cctv-installation": {
    title: "CCTV Camera Installation in Chennai",
    description:
      "CCTV camera installation near you in Chennai — HD & 4K cameras, mobile viewing, night vision. Free site survey, packages from ₹12,999. Enquire on WhatsApp.",
  },
  "biometric-access": {
    title: "Biometric Access Control & Attendance Systems Chennai",
    description:
      "Biometric fingerprint & face-recognition access control, smart door locks and attendance systems in Chennai. Free consultation, starts from ₹4,999.",
  },
  "computer-services": {
    title: "Laptop & Computer Repair Service in Chennai",
    description:
      "Laptop and computer repair, RAM/SSD upgrades and doorstep service in Chennai. Honest diagnosis, genuine parts, starts from ₹499. WhatsApp us today.",
  },
  "site-works": {
    title: "Networking, CAT6 Cabling & Site Works in Chennai",
    description:
      "Structured networking, CAT5/CAT6 cabling and UPS installation for homes and offices in Chennai. Free site survey, starts from ₹1,999.",
  },
  "home-automation": {
    title: "Home Automation & Smart Home Installation Chennai",
    description:
      "Smart switches, lighting, gate automation and app-controlled home automation in Chennai. Add convenience & security, starting from ₹2,499.",
  },
  "electrical-works": {
    title: "Electrical Works & Wiring Services in Chennai",
    description:
      "Licensed electrical wiring, MCB panel upgrades, earthing & surge protection for homes and offices in Chennai. Starts from ₹1,499. Free quote on WhatsApp.",
  },
};

export function getServiceSeo(
  slug: string,
  fallback: { title: string; tagline: string; description: string; city: string },
): ServiceSeo {
  return (
    serviceSeo[slug] ?? {
      title: `${fallback.title} in ${fallback.city}`,
      description: `${fallback.tagline} ${fallback.description}`,
    }
  );
}
