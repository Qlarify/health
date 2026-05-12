"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  threshold = 0.15,
  as: Component = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  threshold?: number;
  as?: "div" | "section" | "article" | "li";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — show immediately, no observer needed.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    // Already in viewport at mount — show immediately, skip the observer.
    // Fixes the production case where IntersectionObserver's first async
    // callback can be missed during React reconciliation, leaving content
    // permanently stuck at opacity:0.
    const rect = el.getBoundingClientRect();
    const inViewport =
      rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      setShown(true);
      return;
    }

    // Below-the-fold elements: observe and reveal on scroll-in.
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);

    // Safety net: if the observer never fires (rare browser quirks,
    // hydration races, etc.), force-reveal after a generous delay so
    // content never stays permanently invisible.
    const safety = setTimeout(() => setShown(true), 1500);

    return () => {
      clearTimeout(safety);
      obs.disconnect();
    };
  }, [threshold]);

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 700ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform 800ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
