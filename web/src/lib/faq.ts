// FAQ content — rendered on /faq and emitted as FAQPage structured data.
// Keep answers concise and concrete (prices, timelines, warranty terms):
// answer engines extract the first sentences, so lead with the direct answer.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much does CCTV installation cost in Chennai?",
    a: "Our all-inclusive CCTV packages start at ₹12,999 for 2 HD cameras with a 4-channel DVR, 500 GB storage, free installation and a 1-year warranty. A 4-camera setup is ₹21,999, 6 4K cameras cost ₹38,999, and large 12+ camera enterprise systems start at ₹74,999. Final pricing is confirmed after a free site survey.",
  },
  {
    q: "Is the site survey really free?",
    a: "Yes. We visit your home, shop or office anywhere in Chennai, assess the coverage you need, and give a clear written quote — free of charge and with no obligation to proceed.",
  },
  {
    q: "How long does CCTV installation take?",
    a: "A typical 2–4 camera home or shop installation is completed in one day. Larger sites with 8 or more cameras usually take 1–2 days including neat concealed wiring and mobile app setup.",
  },
  {
    q: "Can I watch my CCTV cameras on my phone?",
    a: "Yes. Every installation includes mobile live-view setup, so you can watch your cameras from anywhere on your phone. We configure the app and test it with you before we leave.",
  },
  {
    q: "What is the difference between HD (analog) and IP cameras?",
    a: "HD analog cameras record to a DVR and are the budget-friendly choice for most homes and shops. IP cameras record to an NVR, offer higher 4K resolution and smarter features like AI motion alerts. We recommend HD for basic coverage and IP/4K where image detail matters — our survey tells you exactly which fits your site.",
  },
  {
    q: "Do you provide a warranty on CCTV installation?",
    a: "Yes. Packages include 1 to 3 years of warranty depending on the tier, covering cameras, recorder and our installation workmanship.",
  },
  {
    q: "Do you offer annual maintenance (AMC) for CCTV and other systems?",
    a: "Yes. We offer annual maintenance plans covering periodic health checks, cleaning, storage management and priority repair visits. Ask for an AMC quote during your enquiry — it is the most economical way to keep a system reliable long-term.",
  },
  {
    q: "Which areas of Chennai do you serve?",
    a: "We serve all of Chennai, with fastest response in Tambaram, Chromepet, Pallavaram, Velachery, T. Nagar, Anna Nagar, Porur and Adyar. For sites elsewhere in the city, we schedule a survey at your convenience.",
  },
  {
    q: "How much does a biometric attendance system cost?",
    a: "Biometric and access-control systems start at ₹4,999. That covers fingerprint attendance devices; face-recognition units, smart door locks and multi-door access control are quoted based on the number of doors and users.",
  },
  {
    q: "Can you repair laptops and desktops at home?",
    a: "Yes, doorstep computer service is available across Chennai. Repairs and upgrades start at ₹499 — including RAM and SSD upgrades, OS installation, virus removal and hardware fixes with genuine parts.",
  },
  {
    q: "An SSD upgrade was suggested for my slow laptop. Is it worth it?",
    a: "In most cases, yes — moving from a hard disk to an SSD is the single biggest speed upgrade an older laptop can get, typically making boot and app loading 4–5× faster. We quote the exact price for your model before any work starts.",
  },
  {
    q: "Do you do office networking and CAT6 cabling?",
    a: "Yes. We handle structured cabling (CAT5/CAT6), switch and router setup, Wi-Fi coverage planning and UPS power backup for offices, shops and warehouses, starting at ₹1,999. New office fit-outs and rewiring of existing spaces are both fine.",
  },
  {
    q: "What can home automation do, and what does it cost?",
    a: "Starting at ₹2,499, we install smart switches, lighting, gate automation and security automation you can control from your phone or by voice. You can start with one room and extend later — the systems we fit are modular.",
  },
  {
    q: "Do I have to pay online on this website?",
    a: "No. There are no online payments here. You enquire on WhatsApp, we survey and quote, and payment happens only after you approve the work — by cash, UPI or bank transfer.",
  },
  {
    q: "How do I get a quote?",
    a: "Tap any WhatsApp button on this site or send the enquiry form — your message reaches us directly and we reply during working hours (Mon–Sat, 9:30 AM to 8:00 PM). Calls are equally welcome.",
  },
  {
    q: "Do you serve both homes and businesses?",
    a: "Yes. We work with independent houses, apartments, shops, clinics, schools, offices and small factories across Chennai. The same team handles security, IT and electrical site works, so you have one point of contact for everything.",
  },
];
