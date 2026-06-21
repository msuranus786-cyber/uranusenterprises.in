import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/db";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import {
  WhatsAppIcon,
  ShieldIcon,
  SparkleIcon,
  CheckIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Uranus Enterprise is a Chennai-based technology and security company offering CCTV, biometric, computer service, networking and home automation.",
};

const values = [
  "Honest, transparent pricing",
  "Genuine products only",
  "Clean, professional installation",
  "Friendly after-sales support",
  "On-time project delivery",
  "One partner for all your tech",
];

export default async function AboutPage() {
  const site = await getSiteSettings();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "About" }]}
        title="About Uranus Enterprise"
        subtitle={`${site.city}'s trusted partner for security and technology — built on honest work and long-term relationships.`}
      />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Who we are"
              title="Technology you can trust, service you can rely on"
            />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                Uranus Enterprise has spent over {site.yearsExperience} years helping
                homes and businesses across {site.city} stay secure and connected.
                From a single CCTV camera to a fully automated smart home, we bring
                the same care to every project.
              </p>
              <p>
                Led by {site.owner}, our team handles security systems, computer
                service, networking and home automation — so you have just one
                reliable partner for all your technology needs.
              </p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-whatsapp-dark active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Work with us
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: `${site.yearsExperience}+`, label: "Years experience" },
                { value: `${site.customers}+`, label: "Happy customers" },
                { value: `${site.projects}+`, label: "Projects done" },
                { value: "5★", label: "Average rating" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                >
                  <p className="text-3xl font-extrabold text-brand-700">{s.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <ShieldIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-brand-950">Our Mission</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  To make reliable security and technology accessible to every home
                  and business in {site.city} — with honest advice, quality products
                  and dependable service.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <SparkleIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-brand-950">Our Vision</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  To be the most trusted technology partner in the region — known for
                  long-term relationships, fair pricing and work we&apos;re proud to
                  put our name on.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Our promise"
            title="What you can always expect from us"
          />
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v} delay={(i % 2) * 80}>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon className="h-4 w-4 text-green-600" />
                </span>
                <span className="text-sm font-medium text-slate-700">{v}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
