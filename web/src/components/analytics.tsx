"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a GA4 event. Safe to call when analytics is not configured. */
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") window.gtag?.("event", event, params);
}

/**
 * Loads GA4 (only when NEXT_PUBLIC_GA_ID is set) and auto-tracks the site's
 * conversion clicks via a delegated listener, so individual CTAs don't each
 * need wiring: wa.me links → whatsapp_click (or the link's data-analytics
 * name), tel: links → call_click.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.includes("wa.me")) {
        track(link.dataset.analytics || "whatsapp_click", {
          page_path: window.location.pathname,
        });
      } else if (href.startsWith("tel:")) {
        track("call_click", { page_path: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
    </>
  );
}
