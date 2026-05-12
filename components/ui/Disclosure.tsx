"use client";

import { useId, useState, type ReactNode } from "react";

export type FAQItem = { q: string; a: ReactNode };

export function Disclosure({
  items,
  initialOpen = 0,
}: {
  items: FAQItem[];
  initialOpen?: number;
}) {
  const [open, setOpen] = useState<number>(initialOpen);
  const baseId = useId();

  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        const triggerId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={i} className="border-b border-line">
            <h3 className="m-0">
              <button
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full text-left bg-transparent border-0 cursor-pointer py-7 grid grid-cols-[60px_1fr_40px] gap-8 items-center font-inherit"
                type="button"
              >
                <span className="font-mono text-[11px] text-muted tracking-[0.1em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-[22px] sm:text-[28px] leading-[1.2] text-ink">
                  {it.q}
                </span>
                <span
                  aria-hidden="true"
                  className={[
                    "text-2xl text-ink text-right transition-transform duration-300 ease-quart motion-reduce:transition-none",
                    isOpen ? "rotate-45" : "rotate-0",
                  ].join(" ")}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="grid grid-cols-[60px_1fr_40px] gap-8 pb-8"
            >
              <div />
              <div className="text-[15px] sm:text-base leading-[1.6] text-muted max-w-[720px]">
                {it.a}
              </div>
              <div />
            </div>
          </div>
        );
      })}
    </div>
  );
}
