import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas, getArea } from "@/lib/areas";
import { getServices, getReviews, getSiteSettings } from "@/lib/db";
import { whatsappLink } from "@/lib/whatsapp";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { ServiceCard } from "@/components/service-card";
import { ReviewCard } from "@/components/review-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { WhatsAppIcon, CheckIcon } from "@/components/icons";

export function generateStaticParams() {
  return areas.map((a) => ({ locality: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/areas/[locality]">,
): Promise<Metadata> {
  const { locality } = await props.params;
  const area = getArea(locality);
  if (!area) return {};
  return {
    title: `CCTV Installation & Tech Services in ${area.name}, Chennai`,
    description: `CCTV cameras, biometric systems, computer service, networking and home automation in ${area.name} — ${area.covers.join(", ")}. Free site survey, WhatsApp enquiry.`,
    alternates: { canonical: `/areas/${locality}` },
  };
}

export default async function AreaPage(props: PageProps<"/areas/[locality]">) {
  const { locality } = await props.params;
  const area = getArea(locality);
  if (!area) notFound();

  const [services, reviews, site] = await Promise.all([
    getServices(),
    getReviews(),
    getSiteSettings(),
  ]);

  // Show the area's most-requested services first.
  const ordered = [...services].sort((a, b) => {
    const ai = area.popularServices.indexOf(a.slug);
    const bi = area.popularServices.indexOf(b.slug);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const localReviews = reviews
    .filter((r) => r.location.toLowerCase().includes(area.name.toLowerCase()))
    .slice(0, 3);

  const cta = whatsappLink(
    { location: `${area.name}, Chennai` },
    site.whatsappNumber,
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Areas we serve", path: "/areas" },
          { name: area.name, path: `/areas/${area.slug}` },
        ])}
      />

      <PageHeader
        crumbs={[{ label: "Areas", href: "/areas" }, { label: area.name }]}
        title={`Tech & security services in ${area.name}`}
        subtitle={`CCTV, biometric, computer service, networking and home automation for homes and businesses in ${area.name}, Chennai.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <p className="text-base leading-relaxed text-slate-600">{area.blurb}</p>
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Neighbourhoods we cover here
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {area.covers.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700"
                  >
                    <CheckIcon className="h-3.5 w-3.5 text-green-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl bg-gradient-to-br from-brand-800 to-brand-950 p-6 text-white shadow-lg sm:p-8">
              <h2 className="text-lg font-bold">Book a free site survey</h2>
              <p className="mt-2 text-sm text-brand-200">
                Tell us you&apos;re in {area.name} and we&apos;ll schedule a visit at
                your convenience — no charge, no obligation.
              </p>
              <a
                href={cta}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-whatsapp-dark active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp us now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              center
              eyebrow={`Services in ${area.name}`}
              title="What we install and support here"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 90}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {localReviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Local reviews"
              title={`What customers in ${area.name} say`}
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localReviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 90}>
                <ReviewCard review={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-brand-100 bg-brand-50 px-6 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-bold text-brand-950">
                Need something in {area.name} today?
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {site.hours} — call {site.phoneDisplay} or message us on WhatsApp.
              </p>
            </div>
            <a
              href={cta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-whatsapp-dark active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Get a free quote
            </a>
          </div>
        </Reveal>
        <p className="mt-6 text-center text-sm text-slate-500">
          Also serving:{" "}
          {areas
            .filter((a) => a.slug !== area.slug)
            .map((a, i, arr) => (
              <span key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="font-medium text-brand-700 hover:underline"
                >
                  {a.name}
                </Link>
                {i < arr.length - 1 ? " · " : ""}
              </span>
            ))}
        </p>
      </section>
    </>
  );
}
