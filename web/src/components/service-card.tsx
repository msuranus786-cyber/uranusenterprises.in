import Link from "next/link";
import type { Service } from "@/lib/data";
import { inr } from "@/lib/data";
import { ServiceIcon, ArrowRightIcon } from "./icons";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-xl"
    >
      {/* Dedicated artwork tile — each service has its own themed icon + gradient */}
      <div
        className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${service.gradient}`}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <ServiceIcon
          name={service.icon}
          className="h-20 w-20 text-white/90 drop-shadow transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {service.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-brand-950">{service.title}</h3>
        <p className="mt-1.5 text-sm font-medium text-brand-600">{service.tagline}</p>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Starting from
            </p>
            <p className="text-lg font-extrabold text-brand-900">
              {inr(service.startingPrice)}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-600">
            View details
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>

        {service.available && (
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-green-600">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Available now
          </p>
        )}
      </div>
    </Link>
  );
}
