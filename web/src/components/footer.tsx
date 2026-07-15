import Link from "next/link";
import Image from "next/image";
import { getSiteSettings, getServices } from "@/lib/db";
import { areas } from "@/lib/areas";
import { whatsappLink } from "@/lib/whatsapp";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  WhatsAppIcon,
} from "./icons";

export async function Footer() {
  const [site, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  return (
    <footer className="mt-24 bg-brand-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.jpg"
                alt="Uranus Enterprises"
                width={44}
                height={44}
                className="h-11 w-11 rounded-lg bg-white object-contain p-1"
              />
              <span className="text-lg font-extrabold text-white">
                Uranus Enterprises
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {site.city}&apos;s trusted partner for CCTV, biometric, computer,
              networking and home automation solutions.
            </p>
            <a
              href={whatsappLink({}, site.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white">All Services</Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <span className="text-slate-400">{site.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-brand-300" />
                <a
                  href={`tel:${site.phoneDisplay.replace(/[^0-9+]/g, "")}`}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              {site.email && (
                <li className="flex items-center gap-2.5">
                  <MailIcon className="h-4 w-4 shrink-0 text-brand-300" />
                  <a
                    href={`mailto:${site.email}`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {site.email}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <ClockIcon className="h-4 w-4 shrink-0 text-brand-300" />
                <span className="text-slate-400">{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Areas we serve
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Designed &amp; built for {site.owner}.</p>
        </div>
      </div>
    </footer>
  );
}
