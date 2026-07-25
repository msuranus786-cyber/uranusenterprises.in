import type { Review } from "@/lib/data";
import { StarIcon } from "./icons";

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
  const initials = review.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <Stars rating={review.rating} />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
        “{review.comment}”
      </blockquote>
      {review.photos && review.photos.length > 0 && (
        <div className="mt-4 flex gap-2">
          {review.photos.map((p) => (
            <a
              key={p.id}
              href={`/api/photos/${p.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-14 w-14 overflow-hidden rounded-lg border border-slate-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small fixed-size thumbnail, not worth next/image's overhead here */}
              <img
                src={`/api/photos/${p.id}`}
                alt=""
                className="h-full w-full object-cover"
              />
            </a>
          ))}
        </div>
      )}
      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
          {initials}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-brand-950">{review.name}</p>
          <p className="text-xs text-slate-500">{review.location}</p>
        </div>
      </figcaption>
    </figure>
  );
}
