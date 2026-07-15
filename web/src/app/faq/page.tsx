import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/db";
import { faqs } from "@/lib/faq";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { whatsappLink } from "@/lib/whatsapp";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "FAQ — CCTV, Biometric & Tech Service Questions",
  description:
    "Answers to common questions about CCTV installation cost in Chennai, biometric systems, laptop repair, networking, warranties, AMC and site surveys.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const site = await getSiteSettings();

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />

      <PageHeader
        crumbs={[{ label: "FAQ" }]}
        title="Frequently asked questions"
        subtitle="Straight answers about pricing, timelines, warranties and how we work. Can't find yours? Ask us on WhatsApp."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 4) * 60}>
              <details className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-brand-950 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="shrink-0 text-brand-400 transition-transform group-open:rotate-90">
                    <ArrowRightIcon className="h-5 w-5" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand-100 bg-brand-50 px-6 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-bold text-brand-950">
                Still have a question?
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Message us on WhatsApp — we reply during working hours ({site.hours}).
              </p>
            </div>
            <a
              href={whatsappLink({}, site.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-whatsapp-dark active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Ask on WhatsApp
            </a>
          </div>
        </Reveal>

        <p className="mt-8 text-center text-sm text-slate-500">
          Looking for prices? See our{" "}
          <Link href="/services" className="font-semibold text-brand-700 hover:underline">
            services and packages
          </Link>
          .
        </p>
      </section>
    </>
  );
}
