"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Seamless CSS-driven horizontal auto-scroll. Renders `repeat` copies of
 *  `children` back-to-back twice over — the `-50%` translateX loop (see the
 *  `marquee` keyframes in globals.css) lands exactly at the start of the
 *  second copy, so the seam is invisible. `repeat` should be high enough
 *  that one full copy is wider than the widest viewport you expect, or the
 *  seam becomes visible on very wide monitors. */
export function Marquee({
  children,
  repeat = 2,
  className = "",
}: {
  children: ReactNode[];
  repeat?: number;
  className?: string;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduced) {
    return (
      <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
        {children}
      </div>
    );
  }

  const buildSet = (prefix: string) =>
    Array.from({ length: repeat }).flatMap((_, r) =>
      children.map((child, i) => (
        <div key={`${prefix}-${r}-${i}`} className="shrink-0">
          {child}
        </div>
      )),
    );

  return (
    <div className={`group overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
        {buildSet("a")}
        <div aria-hidden="true" className="flex gap-6">
          {buildSet("b")}
        </div>
      </div>
    </div>
  );
}
