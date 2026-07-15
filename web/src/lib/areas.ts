// Chennai localities we serve — powers /areas/[locality] landing pages,
// the footer "Areas we serve" list, sitemap entries and LocalBusiness areaServed.
// Every blurb must stay unique per area; thin duplicated locality pages get
// filtered out of local search results.

export type Area = {
  slug: string;
  name: string;
  blurb: string;
  covers: string[];
  popularServices: string[];
};

export const areas: Area[] = [
  {
    slug: "tambaram",
    name: "Tambaram",
    blurb:
      "From independent houses in East Tambaram to shops around the Tambaram Sanatorium market stretch, we install CCTV, networking and smart security across the whole Tambaram belt. Same-day site surveys are usually possible — you're right in our home service zone.",
    covers: ["East Tambaram", "West Tambaram", "Tambaram Sanatorium", "Selaiyur", "Mudichur"],
    popularServices: ["cctv-installation", "site-works", "home-automation"],
  },
  {
    slug: "chromepet",
    name: "Chromepet",
    blurb:
      "Chromepet's dense mix of clinics, coaching centres and street-facing shops makes camera coverage and attendance systems the most requested jobs here. We plan wiring around older buildings neatly and set up mobile viewing before we leave.",
    covers: ["Chromepet", "Hasthinapuram", "Nemilichery", "New Colony"],
    popularServices: ["cctv-installation", "biometric-access", "computer-services"],
  },
  {
    slug: "pallavaram",
    name: "Pallavaram",
    blurb:
      "For homes near Pallavaram Hills and businesses along the GST Road corridor, we handle CCTV, UPS backup and structured cabling. Frequent power fluctuation in the area makes a properly sized UPS one of our most recommended add-ons.",
    covers: ["Pallavaram", "Old Pallavaram", "Zamin Pallavaram", "Cantonment"],
    popularServices: ["cctv-installation", "site-works", "biometric-access"],
  },
  {
    slug: "velachery",
    name: "Velachery",
    blurb:
      "Velachery's apartments and IT-adjacent offices ask us most often for camera systems with app viewing and smart-home upgrades. We work around association rules for common-area installs and provide clean, conduit-run cabling.",
    covers: ["Velachery", "Taramani", "Guindy fringe", "Madipakkam"],
    popularServices: ["cctv-installation", "home-automation", "computer-services"],
  },
  {
    slug: "t-nagar",
    name: "T. Nagar",
    blurb:
      "Retail density in T. Nagar means loss prevention: multi-camera shop coverage, billing-counter angles and DVR setups that keep 30+ days of footage. We schedule installs around trading hours so your shop never has to close for us.",
    covers: ["T. Nagar", "West Mambalam", "Nandanam", "Kodambakkam"],
    popularServices: ["cctv-installation", "biometric-access", "site-works"],
  },
  {
    slug: "anna-nagar",
    name: "Anna Nagar",
    blurb:
      "Anna Nagar homes and clinics come to us for discreet camera placement, video-door setups and smart lighting. We've wired everything from single-floor houses to multi-storey commercial blocks here with zero exposed cabling.",
    covers: ["Anna Nagar East", "Anna Nagar West", "Shenoy Nagar", "Aminjikarai"],
    popularServices: ["cctv-installation", "home-automation", "biometric-access"],
  },
  {
    slug: "porur",
    name: "Porur",
    blurb:
      "Porur's offices and warehouses along the Mount-Poonamallee stretch need full-site coverage — CCTV, CAT6 networking and access control together. We design all three as one system so you deal with a single team and a single AMC.",
    covers: ["Porur", "Iyyappanthangal", "Mugalivakkam", "Ramapuram"],
    popularServices: ["cctv-installation", "site-works", "biometric-access"],
  },
  {
    slug: "adyar",
    name: "Adyar",
    blurb:
      "In Adyar and along the OMR entry stretch we do smart-home automation, camera systems for independent bungalows, and laptop/desktop support for home offices. Doorstep computer service in this zone is usually same-day.",
    covers: ["Adyar", "Besant Nagar", "Thiruvanmiyur", "Indira Nagar"],
    popularServices: ["home-automation", "cctv-installation", "computer-services"],
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
