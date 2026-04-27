"use client";

import { useMemo, useState } from "react";

/**
 * IX-5 · FAQSearch
 * Client-side search/filter over a passed FAQ list.
 * Falls back to "no results" message if nothing matches.
 * Designed to work with siteFaqs or any FaqItem[] slice.
 */

export type FaqItem = {
  q: string;
  a: string;
};

function highlight(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    '<mark class="bg-sage/20 text-ink rounded-sm px-0.5">$1</mark>'
  );
}

export function FAQSearch({ items }: { items: readonly FaqItem[] }) {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.map((item, i) => ({ item, originalIndex: i }));
    return items
      .map((item, i) => ({ item, originalIndex: i }))
      .filter(
        ({ item }) =>
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q)
      );
  }, [items, query]);

  function toggleItem(index: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div
      className="bg-paper border border-line rounded-3xl overflow-hidden"
      role="region"
      aria-label="FAQ search"
    >
      {/* Search bar */}
      <div className="p-6 md:p-8 border-b border-line bg-surface">
        <label
          htmlFor="faq-search-input"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted block mb-3"
        >
          Search questions
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            id="faq-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 'patient acquisition' or 'DPDP'"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-line bg-paper font-sans text-[14px] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-sage transition-colors"
            aria-controls="faq-search-results"
            aria-label="Search frequently asked questions"
          />
        </div>
        {query.trim() && (
          <p className="mt-2 font-mono text-[10px] text-muted">
            {filtered.length === 0
              ? "No matching questions"
              : `${filtered.length} of ${items.length} questions`}
          </p>
        )}
      </div>

      {/* Results */}
      <div id="faq-search-results" role="list" aria-live="polite" aria-atomic="true">
        {filtered.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-serif italic text-[17px] text-muted mb-2">
              No questions match &ldquo;{query}&rdquo;.
            </p>
            <button
              onClick={() => setQuery("")}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-sage underline-offset-4 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <ul>
            {filtered.map(({ item, originalIndex }, i) => {
              const isOpen = open.has(originalIndex);
              const answerId = `faq-answer-${originalIndex}`;
              return (
                <li
                  key={originalIndex}
                  role="listitem"
                  className="border-b border-line last:border-b-0"
                >
                  <button
                    onClick={() => toggleItem(originalIndex)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="w-full text-left px-6 md:px-8 py-5 flex items-start justify-between gap-4 hover:bg-surface/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-inset cursor-pointer"
                  >
                    <span
                      className="font-serif text-[16px] md:text-[18px] leading-[1.35]"
                      dangerouslySetInnerHTML={{
                        __html: highlight(item.q, query),
                      }}
                    />
                    <span
                      className={[
                        "flex-shrink-0 mt-1 w-5 h-5 rounded-full border border-line flex items-center justify-center transition-transform duration-200",
                        isOpen ? "rotate-45 bg-sage border-sage text-paper" : "text-muted",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="currentColor"
                      >
                        <path d="M4.5 0h1v10h-1zM0 4.5h10v1H0z" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={answerId}
                      role="region"
                      className="px-6 md:px-8 pb-6 pt-1"
                    >
                      <p
                        className="text-[15px] leading-[1.7] text-muted max-w-[720px]"
                        dangerouslySetInnerHTML={{
                          __html: highlight(item.a, query),
                        }}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
