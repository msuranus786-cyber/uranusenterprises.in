import type { Metadata } from "next";
import Link from "next/link";
import { areas } from "@/lib/areas";
import { getSiteSettings } from "@/lib/db";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon, MapPinIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Areas We Serve in Chennai",
  description:
    "Uranus Enterprises installs CCTV, biometric systems, networking and home automation across Chennai — Tambaram, Chromepet, Pallavaram, Velachery, T. Nagar, Anna Nagar, Porur and Adyar.",
  alternates: { canonical: "/areas" },
};

export default async function AreasPage() {
  const site = await getSiteSettings();

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Areas" }]}
        title="Areas we serve"
        subtitle="We work across all of Chennai. These are the localities where our response is fastest — often same-day site surveys."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 4) * 70}>
              <Link
                href={`/areas/${a.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-brand-950">{a.name}</h2>
                <p className="mt-1.5 flex-1 text-sm text-slate-500">
                  {a.covers.slice(0, 3).join(" · ")}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  View services here
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand-100 bg-brand-50 px-6 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-bold text-brand-950">
                Don&apos;t see your area?
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                We serve the whole of Chennai — message us and we&apos;ll schedule a
                survey wherever you are.
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
      </section>
    </>
  );
}
