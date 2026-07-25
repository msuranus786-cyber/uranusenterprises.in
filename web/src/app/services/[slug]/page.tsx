import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { inr } from "@/lib/data";
import {
  getService,
  getServices,
  getPackages,
  getReviews,
  getSiteSettings,
} from "@/lib/db";
import { whatsappLink } from "@/lib/whatsapp";
import { getServiceSeo } from "@/lib/service-seo";
import { JsonLd } from "@/components/json-ld";
import {
  serviceSchema,
  breadcrumbSchema,
  packageProductSchema,
} from "@/lib/schema";
import { PageHeader } from "@/components/page-header";
import { PackageCard } from "@/components/package-card";
import { ReviewCard, Stars } from "@/components/review-card";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { WhatsAppIcon, CheckIcon } from "@/components/icons";
import { serviceImages } from "@/lib/service-images";
import Image from "next/image";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = await getService(slug);
  if (!service) return {};
  const seo = getServiceSeo(slug, { ...service, city: "Chennai" });
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = await getService(slug);
  if (!service) notFound();

  const [pkgs, serviceReviews, allServices, site] = await Promise.all([
    getPackages(slug),
    getReviews(slug),
    getServices(),
    getSiteSettings(),
  ]);

  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3);
  const cta = whatsappLink({ service: service.title }, site.whatsappNumber);

  return (
    <>
      <JsonLd data={serviceSchema(service, site)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ])}
      />
      {pkgs.map((p) => (
        <JsonLd key={p.name} data={packageProductSchema(p, site)} />
      ))}
      <PageHeader
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
        title={service.title}
        subtitle={service.tagline}
      />

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Artwork */}
          <Reveal>
            <div
              className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${service.gradient} shadow-xl`}
            >
              {serviceImages[service.slug] && (
                <Image
                  src={serviceImages[service.slug]}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/0 to-black/0" />
              <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {service.category}
              </span>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-3">
                {service.available ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Available now
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                    Currently unavailable
                  </span>
                )}
                {serviceReviews.length > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Stars rating={5} />
                    <span className="text-sm text-slate-500">
                      ({serviceReviews.length} review{serviceReviews.length > 1 ? "s" : ""})
                    </span>
                  </span>
                )}
              </div>

              <p className="mt-5 text-base leading-relaxed text-slate-600">
                {service.description}
              </p>

              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  What&apos;s included
                </h3>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {service.offerings.map((o) => (
                    <li key={o} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Starting from
                  </p>
                  <p className="text-2xl font-extrabold text-brand-900">
                    {inr(service.startingPrice)}
                  </p>
                </div>
                <a
                  href={cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-base font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:bg-whatsapp-dark active:scale-95"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Packages (CCTV) */}
      {pkgs.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                center
                eyebrow="Packages"
                title="Choose your package"
                subtitle="All packages include free installation and warranty. Final pricing confirmed after a free site survey."
              />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pkgs.map((p, i) => (
                <Reveal key={p.name} delay={(i % 4) * 80}>
                  <PackageCard
                    pkg={p}
                    serviceTitle={service.title}
                    whatsappNumber={site.whatsappNumber}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {serviceReviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Reviews"
              title={`What customers say about ${service.title.toLowerCase()}`}
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceReviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 90}>
                <ReviewCard review={r} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Explore more" title="Other services you may like" />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 90}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-md lg:hidden">
        <a
          href={cta}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3.5 text-base font-semibold text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Enquire about {service.title}
        </a>
      </div>

      <p className="sr-only">
        <Link href="/services">Back to all services</Link>
      </p>
    </>
  );
}
