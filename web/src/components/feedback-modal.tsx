"use client";

import { useEffect, useState } from "react";
import type { Service } from "@/lib/data";
import { FeedbackForm } from "./feedback-form";
import { CloseIcon } from "./icons";

export function FeedbackModal({
  services,
  label = "Share Your Feedback",
  className = "inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-700/20 transition-all hover:bg-brand-800 active:scale-[0.98]",
}: {
  services: Service[];
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Share your feedback"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <h2 className="pr-8 text-xl font-bold text-brand-950">Share your experience</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tell us how it went — it&apos;s reviewed before it goes live.
            </p>
            <div className="mt-6">
              <FeedbackForm services={services} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
