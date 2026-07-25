"use client";

import { useEffect, useState } from "react";
import type { Review } from "@/lib/data";
import { StarIcon, CloseIcon } from "./icons";

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 text-gold ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < rating} className="h-4 w-4" />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  const [open, setOpen] = useState(false);
  const photos = review.photos ?? [];

  const initials = review.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
      >
        <Stars rating={review.rating} />
        <blockquote className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-700">
          “{review.comment}”
        </blockquote>
        {photos.length > 0 && (
          <div className="mt-4 flex gap-2">
            {photos.slice(0, 3).map((p) => (
              <span
                key={p.id}
                className="block h-14 w-14 overflow-hidden rounded-lg border border-slate-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- small fixed-size thumbnail, not worth next/image's overhead here */}
                <img src={`/api/photos/${p.id}`} alt="" className="h-full w-full object-cover" />
              </span>
            ))}
            {photos.length > 3 && (
              <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">
                +{photos.length - 3}
              </span>
            )}
          </div>
        )}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
              {initials}
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-brand-950">{review.name}</p>
              <p className="text-xs text-slate-500">{review.location}</p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-semibold text-brand-600">Read full review →</span>
        </div>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Review from ${review.name}`}
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

            <Stars rating={review.rating} />
            <blockquote className="mt-4 whitespace-pre-line pr-8 text-base leading-relaxed text-slate-700">
              “{review.comment}”
            </blockquote>

            {photos.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                {photos.map((p) => (
                  <a
                    key={p.id}
                    href={`/api/photos/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-[4/3] overflow-hidden rounded-xl border border-slate-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- variable-count gallery, next/image sizing isn't worth it here */}
                    <img
                      src={`/api/photos/${p.id}`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </a>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {initials}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-brand-950">{review.name}</p>
                <p className="text-xs text-slate-500">{review.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
