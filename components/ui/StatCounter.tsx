"use client";

import { useEffect, useRef, useState } from "react";

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1600,
  delay = 0,
  decimals = 0,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion: show final value, skip animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      setStarted(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started, value]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now() + delay;
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const factor = 10 ** decimals;
      setN(Math.floor(value * eased * factor) / factor);
      if (p < 1) frame = requestAnimationFrame(tick);
      else setN(value);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, duration, delay, decimals]);

  const fmt = (v: number) =>
    v.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  return (
    // aria-live="off" so screen readers announce the final value once,
    // not every frame. The aria-label provides the canonical text.
    <span
      ref={ref}
      aria-label={`${prefix}${fmt(value)}${suffix}`}
      aria-live="off"
      className={className}
    >
      <span aria-hidden="true">
        {prefix}
        {fmt(n)}
        {suffix}
      </span>
    </span>
  );
}
