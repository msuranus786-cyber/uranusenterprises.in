import Link from "next/link";
import { inr } from "@/lib/data";
import { getSiteSettings, getServices, getAllPackages, getAllReviews } from "@/lib/db";
import { whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { PackageCard } from "@/components/package-card";
import { ReviewCard, Stars } from "@/components/review-card";
import {
  ServiceIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  ShieldIcon,
  ToolsIcon,
  SparkleIcon,
  CheckIcon,
} from "@/components/icons";

const whyUs = [
  {
    icon: ShieldIcon,
    title: "Trusted & reliable",
    text: "Honest advice, genuine products and clean, professional installation every time.",
  },
  {
    icon: ToolsIcon,
    title: "Skilled technicians",
    text: "Experienced team across security, IT and automation — one partner for everything.",
  },
  {
    icon: SparkleIcon,
    title: "Free site survey",
    text: "We visit, understand your needs and quote transparently before any work begins.",
  },
];

export default async function HomePage() {
  const [site, services, packages, reviews] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAllPackages(),
    getAllReviews(),
  ]);

  const stats = [
    { value: `${site.yearsExperience}+`, label: "Years of experience" },
    { value: `${site.customers}+`, label: "Happy customers" },
    { value: `${site.projects}+`, label: "Projects delivered" },
    { value: "5★", label: "Average rating" },
  ];

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(63,79,209,0.18) 1px, transparent 0)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(to bottom, black, transparent 75%)",
          }}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {site.tagline}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
                Complete{" "}
                <span className="bg-gradient-to-r from-brand-600 to-brand-900 bg-clip-text text-transparent">
                  security &amp; tech
                </span>{" "}
                solutions for your home &amp; business
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                CCTV, biometric access, computer service, networking and home
                automation — installed and supported by {site.city}&apos;s trusted
                team. No payment online; just enquire on WhatsApp and we handle the
                rest.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-whatsapp-dark hover:shadow-xl active:scale-95"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Get a Free Quote
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white px-6 py-3.5 text-base font-semibold text-brand-700 transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-95"
                >
                  Explore Services
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 flex items-center gap-3">
                <Stars rating={5} className="scale-110" />
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-brand-900">{site.customers}+</span>{" "}
                  happy customers across {site.city}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Visual cluster — each service shown as its own themed tile */}
          <Reveal delay={200} className="hidden lg:block">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {services.slice(0, 4).map((s, i) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className={`group rounded-2xl border border-white/10 bg-gradient-to-br ${s.gradient} p-5 text-white shadow-lg transition-transform hover:scale-[1.03] ${
                      i % 2 === 1 ? "translate-y-6" : ""
                    }`}
                  >
                    <ServiceIcon
                      name={s.icon}
                      className="h-10 w-10 text-white/90 transition-transform group-hover:scale-110"
                    />
                    <p className="mt-4 text-sm font-bold">{s.title}</p>
                    <p className="mt-1 text-xs text-white/70">from {inr(s.startingPrice)}</p>
                  </Link>
                ))}
              </div>
              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-xl">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                </span>
                <span className="text-xs font-semibold text-brand-900">
                  Free installation &amp; warranty
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="border-y border-slate-100 bg-brand-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <p className="text-3xl font-extrabold text-white sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-brand-200">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            center
            eyebrow="What we do"
            title="Everything tech, under one roof"
            subtitle="From securing your premises to keeping your computers running, we cover it all with one trusted team."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CCTV packages ===== */}
      <section id="packages" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              center
              eyebrow="CCTV packages"
              title="Pick the protection that fits"
              subtitle="Transparent, all-inclusive CCTV packages with free installation and warranty. Final pricing confirmed after a free site survey."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 80}>
                <PackageCard pkg={p} serviceTitle="CCTV Installation" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why us ===== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Why Uranus"
              title="A partner you can count on"
              subtitle="We&apos;re not just installers — we&apos;re your long-term technology partner. Here&apos;s what makes customers across Chennai recommend us."
            />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-brand-800 active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Talk to our team
            </a>
          </Reveal>
          <div className="space-y-4">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <w.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-brand-950">{w.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{w.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Reviews ===== */}
      <section id="reviews" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              center
              eyebrow="Customer love"
              title="Trusted by homes & businesses"
              subtitle="Real words from real customers across Chennai."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 90}>
                <ReviewCard review={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-950 px-6 py-14 text-center shadow-xl sm:px-12">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
                Ready to secure and upgrade your space?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-brand-200">
                Send us a quick WhatsApp message. We&apos;ll arrange a free survey and
                give you a clear, honest quote.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-whatsapp-dark active:scale-95"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Enquire on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
                >
                  Send an enquiry
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
