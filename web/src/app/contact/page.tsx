import type { Metadata } from "next";
import { getSiteSettings, getServices } from "@/lib/db";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Uranus Enterprise in Chennai for CCTV, biometric, computer service, networking and home automation. Enquire on WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [site, services] = await Promise.all([getSiteSettings(), getServices()]);

  const details = [
    { icon: PhoneIcon, label: "Phone", value: site.phoneDisplay },
    { icon: MailIcon, label: "Email", value: site.email },
    { icon: MapPinIcon, label: "Location", value: site.address },
    { icon: ClockIcon, label: "Hours", value: site.hours },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        title="Let's talk"
        subtitle="Tell us what you need and we'll get back to you on WhatsApp with a free, honest quote."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-brand-950">Send us an enquiry</h2>
              <p className="mt-1.5 text-sm text-slate-500">
                Fill in a few details — it takes less than a minute.
              </p>
              <div className="mt-6">
                <EnquiryForm
                  services={services}
                  whatsappNumber={site.whatsappNumber}
                />
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-bold text-brand-950">Get in touch</h2>
                <ul className="mt-5 space-y-4">
                  {details.map((d) => (
                    <li key={d.label} className="flex items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <d.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          {d.label}
                        </p>
                        <p className="text-sm font-medium text-slate-800">{d.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-brand-800 to-brand-950 p-6 text-white shadow-lg sm:p-8">
                <h2 className="text-lg font-bold">Prefer to chat now?</h2>
                <p className="mt-2 text-sm text-brand-200">
                  Message us directly on WhatsApp and we&apos;ll reply right away during
                  working hours.
                </p>
                <a
                  href={whatsappLink({}, site.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-whatsapp-dark active:scale-95"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Open WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
