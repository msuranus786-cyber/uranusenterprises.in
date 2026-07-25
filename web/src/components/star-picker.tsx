"use client";

import { useState } from "react";
import { StarIcon } from "./icons";

export function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? value;

  return (
    <div
      role="radiogroup"
      aria-label="Rating"
      className="flex items-center gap-1"
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          onMouseEnter={() => setHovered(star)}
          onFocus={() => setHovered(star)}
          onBlur={() => setHovered(null)}
          onClick={() => onChange(star)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" && value < 5) onChange(value + 1);
            if (e.key === "ArrowLeft" && value > 1) onChange(value - 1);
          }}
          className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400"
        >
          <StarIcon filled={star <= shown} className="h-7 w-7 text-gold" />
        </button>
      ))}
    </div>
  );
}
