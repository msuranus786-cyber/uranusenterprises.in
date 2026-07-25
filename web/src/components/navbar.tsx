"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/whatsapp";
import { ArrowRightIcon, MenuIcon, CloseIcon, WhatsAppIcon, PhoneIcon } from "./icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/feedback", label: "Feedback" },
];

export function Navbar({
  whatsappNumber,
  phoneDisplay,
}: {
  whatsappNumber: string;
  phoneDisplay: string;
}) {
  const pathname = usePathname();
  const telHref = `tel:${phoneDisplay.replace(/[^0-9+]/g, "")}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/85 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Uranus Enterprises home">
          <Image
            src="/logo.jpg"
            alt="Uranus Enterprises"
            width={48}
            height={48}
            priority
            className="h-11 w-11 rounded-lg object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold tracking-tight text-brand-900">
              Uranus Enterprises
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-brand-600">
              Chennai
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "text-brand-700"
                  : "text-slate-600 hover:text-brand-700"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-600" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            aria-label={`Call ${phoneDisplay}`}
            className="hidden items-center gap-2 rounded-full border border-brand-200 px-4 py-2.5 text-sm font-semibold text-brand-700 transition-all hover:border-brand-300 hover:bg-brand-50 active:scale-95 lg:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {phoneDisplay}
          </a>
          <a
            href={whatsappLink({}, whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-whatsapp-dark hover:shadow-md active:scale-95 sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Get a Quote
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-brand-900 transition-colors hover:bg-brand-50 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                isActive(l.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={telHref}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-brand-200 px-4 py-3 text-base font-semibold text-brand-700"
          >
            <PhoneIcon className="h-5 w-5" />
            Call {phoneDisplay}
          </a>
          <a
            href={whatsappLink({}, whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-base font-semibold text-white"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Enquire on WhatsApp
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
