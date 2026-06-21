import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  subtitle,
  crumbs = [],
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50 to-white">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(63,79,209,0.16) 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <span className="text-slate-300">/</span>
              {c.href ? (
                <Link href={c.href} className="hover:text-brand-700">{c.label}</Link>
              ) : (
                <span className="font-medium text-brand-700">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
