"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IG-5 · Benchmark Bars
 * Animated horizontal bar chart comparing typical-hospital vs best-in-class
 * across four key patient-acquisition metrics.
 * Source: 12 hospital engagements, Qlarify Health, 2019–2024.
 */

const rows = [
  {
    metric: "Enquiry-to-appointment conversion",
    typical: { pct: 38, label: "30–45%" },
    best: { pct: 70, label: "65–75%" },
    invert: false,
  },
  {
    metric: "Missed-call rate at call centre",
    typical: { pct: 20, label: "15–25%" },
    best: { pct: 3, label: "<5%" },
    invert: true,
  },
  {
    metric: "First-visit-to-second-visit rate",
    typical: { pct: 24, label: "18–30%" },
    best: { pct: 55, label: "50–60%" },
    invert: false,
  },
  {
    metric: "WhatsApp open rate (transactional)",
    typical: { pct: 70, label: "60–80%" },
    best: { pct: 90, label: "85%+" },
    invert: false,
  },
] as const;

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

export function BenchmarkBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Legend */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-line inline-block" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            Typical hospital
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-sage inline-block" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            Best-in-class
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-7">
        {rows.map((row, i) => (
          <div key={row.metric}>
            <div className="flex items-start justify-between gap-4 mb-2.5">
              <span className="text-[13px] md:text-[14px] leading-[1.45] text-ink">
                {row.metric}
              </span>
              {row.invert && (
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted whitespace-nowrap shrink-0 pt-0.5">
                  lower is better
                </span>
              )}
            </div>

            {/* Typical bar */}
            <div className="flex items-center gap-3 mb-1.5">
              <div className="flex-1 bg-line/40 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: "var(--color-line)",
                    width: shown ? `${row.typical.pct}%` : "0%",
                    transition: `width 900ms ${EASE}`,
                    transitionDelay: shown ? `${i * 100}ms` : "0ms",
                  }}
                />
              </div>
              <span className="font-mono text-[11px] text-muted whitespace-nowrap w-14 text-right">
                {row.typical.label}
              </span>
            </div>

            {/* Best-in-class bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-sage/15 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: "var(--color-sage)",
                    width: shown ? `${row.best.pct}%` : "0%",
                    transition: `width 900ms ${EASE}`,
                    transitionDelay: shown ? `${i * 100 + 60}ms` : "0ms",
                  }}
                />
              </div>
              <span className="font-mono text-[11px] text-sage whitespace-nowrap w-14 text-right">
                {row.best.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted mt-8">
        Source: 12 hospital engagements · Qlarify Health 2019–2024 · Ranges,
        not guarantees. Specialty mix and catchment move them ±30%.
      </p>
    </div>
  );
}
