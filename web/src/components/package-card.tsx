import type { Package } from "@/lib/data";
import { inr } from "@/lib/data";
import { whatsappLink } from "@/lib/whatsapp";
import { CheckIcon, WhatsAppIcon } from "./icons";

export function PackageCard({
  pkg,
  serviceTitle,
}: {
  pkg: Package;
  serviceTitle: string;
}) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-xl ${
        pkg.popular
          ? "border-brand-300 shadow-lg ring-2 ring-brand-200 lg:scale-[1.03]"
          : "border-slate-200 shadow-sm hover:-translate-y-1"
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-bold text-brand-950">{pkg.name} CCTV Package</h3>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-brand-900">{inr(pkg.price)}</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">All-inclusive · {pkg.warranty} warranty</p>

      <ul className="mt-5 flex-1 space-y-2.5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={whatsappLink({ service: serviceTitle, packageName: `${pkg.name} CCTV Package` })}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all active:scale-95 ${
          pkg.popular
            ? "bg-whatsapp text-white hover:bg-whatsapp-dark"
            : "bg-brand-50 text-brand-700 hover:bg-brand-100"
        }`}
      >
        <WhatsAppIcon className="h-4 w-4" />
        Enquire on WhatsApp
      </a>
    </div>
  );
}
