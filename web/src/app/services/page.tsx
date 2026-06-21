import type { Metadata } from "next";
import { getSiteSettings, getServices } from "@/lib/db";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHeader } from "@/components/page-header";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "CCTV installation, biometric access control, computer & laptop service, networking, UPS and home automation in Chennai.",
};

export default async function ServicesPage() {
  const [site, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Services" }]}
        title="Our Services"
        subtitle={`One trusted team for security, IT and smart-home needs across ${site.city}. Browse our services and enquire on WhatsApp — no online payment needed.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand-100 bg-brand-50 px-6 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-bold text-brand-950">
                Not sure which service you need?
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Tell us about your space and we&apos;ll recommend the right solution — free of charge.
              </p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-whatsapp-dark active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Ask on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
