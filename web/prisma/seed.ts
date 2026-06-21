import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Admin user
  const adminEmail = "admin@uranus.in";
  const adminPassword = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminPassword,
      name: "Mr. Barath",
      role: "admin",
    },
  });
  console.log("Admin user: admin@uranus.in / admin123");

  // Site settings (upsert singleton)
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Uranus Enterprise",
      brand: "Ms.Uranus Nanofix",
      owner: "Mr. Barath",
      city: "Chennai",
      tagline: "Chennai's Trusted Technology & Security Partner",
      phoneDisplay: "+91 98417 70013",
      whatsappNumber: "919841770013",
      email: "support@shan.enterprises",
      address: "Chennai, Tamil Nadu, India",
      hours: "Mon – Sat · 9:30 AM – 8:00 PM",
      yearsExperience: 10,
      customers: 100,
      projects: 250,
    },
  });

  // Services
  const servicesData = [
    {
      slug: "cctv-installation",
      title: "CCTV Installation",
      category: "Security",
      icon: "cctv",
      gradient: "from-brand-700 to-brand-900",
      tagline: "See everything, miss nothing.",
      description:
        "End-to-end CCTV solutions for homes, shops, offices and factories. We survey your space, recommend the right camera coverage, and handle a clean, professional installation with remote mobile viewing set up for you.",
      startingPrice: 12999,
      available: true,
      features: [
        "HD & 4K cameras",
        "Mobile live-view setup",
        "Night-vision coverage",
        "Free site survey",
      ],
      offerings: [
        "Indoor & outdoor cameras",
        "DVR / NVR recording",
        "Remote viewing on phone",
        "Annual maintenance plans",
      ],
      sortOrder: 0,
    },
    {
      slug: "biometric-access",
      title: "Biometric & Access Control",
      category: "Security",
      icon: "biometric",
      gradient: "from-brand-600 to-brand-800",
      tagline: "Right person, right door, every time.",
      description:
        "Fingerprint, face-recognition and smart-card access systems for attendance and secure entry. Ideal for offices, schools and gated premises that need reliable, tamper-proof control.",
      startingPrice: 4999,
      available: true,
      features: [
        "Fingerprint & face ID",
        "Attendance reports",
        "Smart door locks",
        "Multi-door control",
      ],
      offerings: [
        "Fingerprint devices",
        "Face recognition systems",
        "Smart access control",
        "Smart door locks",
      ],
      sortOrder: 1,
    },
    {
      slug: "computer-services",
      title: "Computer & Laptop Service",
      category: "IT Support",
      icon: "computer",
      gradient: "from-brand-700 to-brand-950",
      tagline: "Back up and running, fast.",
      description:
        "Repairs, upgrades and software support for laptops and desktops. From a slow machine to a dead motherboard, our technicians diagnose honestly and fix it right — with genuine parts.",
      startingPrice: 499,
      available: true,
      features: [
        "Laptop & desktop repair",
        "RAM / SSD upgrades",
        "OS & software setup",
        "Doorstep service",
      ],
      offerings: [
        "Laptop repair",
        "Desktop repair",
        "RAM & storage upgrades",
        "Software & hardware support",
      ],
      sortOrder: 2,
    },
    {
      slug: "site-works",
      title: "Networking & Site Works",
      category: "Infrastructure",
      icon: "network",
      gradient: "from-brand-600 to-brand-900",
      tagline: "The backbone behind reliable tech.",
      description:
        "Structured cabling, networking, UPS and electrical work done to standard. We lay CAT5/CAT6, set up your network and power backup so everything else just works.",
      startingPrice: 1999,
      available: true,
      features: [
        "CAT5 / CAT6 cabling",
        "Network setup",
        "UPS installation",
        "Electrical work",
      ],
      offerings: [
        "UPS installation",
        "Electrical work",
        "Networking & cabling",
        "CAT5 / CAT6 wiring",
      ],
      sortOrder: 3,
    },
    {
      slug: "home-automation",
      title: "Home Automation",
      category: "Smart Home",
      icon: "home",
      gradient: "from-brand-500 to-brand-800",
      tagline: "A smarter, safer home.",
      description:
        "Smart switches, lighting, gate automation and home security — controlled from your phone or voice. Add convenience and safety to your home, one room at a time.",
      startingPrice: 2499,
      available: true,
      features: [
        "Smart switches & lighting",
        "Gate automation",
        "Voice & app control",
        "Home security automation",
      ],
      offerings: [
        "Smart switches",
        "Smart lighting",
        "Gate automation",
        "Home security automation",
      ],
      sortOrder: 4,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // CCTV Packages
  const packagesData = [
    {
      name: "Basic",
      serviceSlug: "cctv-installation",
      cameras: "2 HD Cameras",
      recorder: "4-Channel DVR",
      storage: "500 GB",
      installation: "Included",
      warranty: "1 Year",
      price: 12999,
      popular: false,
      features: [
        "2 HD dome/bullet cameras",
        "4-channel DVR",
        "500 GB storage",
        "Mobile viewing setup",
        "Free installation",
        "1 year warranty",
      ],
      sortOrder: 0,
    },
    {
      name: "Standard",
      serviceSlug: "cctv-installation",
      cameras: "4 HD Cameras",
      recorder: "8-Channel DVR",
      storage: "1 TB",
      installation: "Included",
      warranty: "2 Years",
      price: 21999,
      popular: true,
      features: [
        "4 HD cameras",
        "8-channel DVR",
        "1 TB storage",
        "Mobile + desktop viewing",
        "Night vision",
        "Free installation",
        "2 year warranty",
      ],
      sortOrder: 1,
    },
    {
      name: "Premium",
      serviceSlug: "cctv-installation",
      cameras: "6 4K Cameras",
      recorder: "8-Channel NVR",
      storage: "2 TB",
      installation: "Included",
      warranty: "3 Years",
      price: 38999,
      popular: false,
      features: [
        "6 4K IP cameras",
        "8-channel NVR",
        "2 TB storage",
        "Cloud + local recording",
        "Colour night vision",
        "Free installation",
        "3 year warranty",
      ],
      sortOrder: 2,
    },
    {
      name: "Enterprise",
      serviceSlug: "cctv-installation",
      cameras: "12+ 4K Cameras",
      recorder: "16-Channel NVR",
      storage: "4 TB+",
      installation: "Included",
      warranty: "3 Years",
      price: 74999,
      popular: false,
      features: [
        "12+ 4K IP cameras",
        "16-channel NVR",
        "4 TB+ storage",
        "Multi-site monitoring",
        "AI motion alerts",
        "Priority support",
        "3 year warranty",
      ],
      sortOrder: 3,
    },
  ];

  await prisma.package.deleteMany({});
  for (const p of packagesData) {
    await prisma.package.create({ data: p });
  }

  // Reviews
  const reviewsData = [
    {
      name: "Ravikumar S.",
      location: "Anna Nagar, Chennai",
      rating: 5,
      comment:
        "Installed 4 CCTV cameras at my shop. Neat wiring and they set up everything on my phone. Very professional team.",
      serviceSlug: "cctv-installation",
    },
    {
      name: "Priya M.",
      location: "Velachery, Chennai",
      rating: 5,
      comment:
        "Got a biometric attendance system for our office. Works perfectly and the reports save us so much time.",
      serviceSlug: "biometric-access",
    },
    {
      name: "Karthik R.",
      location: "T. Nagar, Chennai",
      rating: 5,
      comment:
        "My laptop was very slow. They upgraded to SSD and added RAM — feels like a new machine. Honest pricing.",
      serviceSlug: "computer-services",
    },
    {
      name: "Deepa V.",
      location: "Adyar, Chennai",
      rating: 4,
      comment:
        "Smart switches and gate automation installed at home. The app control is so convenient. Recommended.",
      serviceSlug: "home-automation",
    },
    {
      name: "Mohammed A.",
      location: "Porur, Chennai",
      rating: 5,
      comment:
        "Full office network cabling with CAT6 and UPS backup. Clean work and finished on time.",
      serviceSlug: "site-works",
    },
    {
      name: "Lakshmi N.",
      location: "Tambaram, Chennai",
      rating: 5,
      comment:
        "Reliable and friendly. They explained everything clearly before installing the cameras. Great service.",
      serviceSlug: "cctv-installation",
    },
  ];

  await prisma.review.deleteMany({});
  for (const r of reviewsData) {
    await prisma.review.create({ data: r });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
