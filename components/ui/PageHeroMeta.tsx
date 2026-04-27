"use client";

import { StatCounter } from "@/components/ui/StatCounter";

export type PageHeroMetaItem = { label: string; value: string };

/**
 * Parses a meta-chip value string into an animatable number + decorators.
 * "06"     → { leadingZeros: "0", n: 6,  suffix: "" }
 * "40+"    → { leadingZeros: "",  n: 40, suffix: "+" }
 * "17"     → { leadingZeros: "",  n: 17, suffix: "" }
 * Anything complex ("4.2 yrs", "180-day") → null → render as static text.
 */
function parseValue(
  raw: string
): { leadingZeros: string; n: number; suffix: string } | null {
  const m = raw.match(/^(0*)([1-9]\d*)(\+?)$/);
  if (!m) return null;
  return { leadingZeros: m[1], n: parseInt(m[2], 10), suffix: m[3] };
}

export function PageHeroMeta({
  meta,
}: {
  meta: readonly PageHeroMetaItem[];
}) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-16 pt-8 md:pt-10 border-t border-line">
      {meta.map((m, i) => {
        const parsed = parseValue(m.value);
        return (
          <li key={m.label}>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-2">
              {m.label}
            </div>
            <div className="font-serif text-3xl md:text-[40px] leading-[1] tracking-[-0.02em]">
              {parsed ? (
                <StatCounter
                  value={parsed.n}
                  prefix={parsed.leadingZeros}
                  suffix={parsed.suffix}
                  duration={1200}
                  delay={i * 80}
                />
              ) : (
                m.value
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
