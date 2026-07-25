"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

/** Manually-controlled horizontal scroller — native touch/trackpad scroll
 *  with snap points, plus explicit prev/next buttons. No auto-play. */
export function ReviewSlider({ children }: { children: ReactNode[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => updateEdges();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [children.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const amount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={updateEdges}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} data-slide className="w-[320px] shrink-0 snap-start">
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-700 shadow-sm transition-all hover:border-brand-300 hover:bg-brand-50 disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowRightIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-700 shadow-sm transition-all hover:border-brand-300 hover:bg-brand-50 disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
