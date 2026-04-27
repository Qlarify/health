"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Insight, InsightCategory } from "@/lib/insights";

type Props = {
  articles: readonly Insight[];
  categories: readonly InsightCategory[];
};

type Filter = "All" | InsightCategory;

export function InsightsList({ articles, categories }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const cats: readonly Filter[] = ["All", ...categories];
  const visible = filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter insights by category"
        className="flex flex-wrap gap-2 border-b border-line pb-6 mb-10"
      >
        {cats.map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setFilter(c)}
              className={[
                "px-4 py-2 rounded-full text-[13px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                active
                  ? "bg-ink text-paper"
                  : "bg-transparent text-ink hover:bg-surface",
              ].join(" ")}
            >
              {c}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-muted text-base py-12 text-center">
          No articles in this category yet. Try another filter.
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visible.map((a, i) => (
            <Reveal as="li" key={`${filter}-${a.slug}`} delay={i * 50}>
              <Link
                href={`/insights/${a.slug}`}
                className="group block bg-paper border border-line rounded-[20px] p-7 md:p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(21,32,28,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
              >
                <article className="flex flex-col h-full">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-sage">
                      {a.category}
                    </span>
                    <span className="font-mono text-[10px] text-muted">
                      {a.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-[26px] leading-[1.15] mb-3.5 group-hover:text-sage transition-colors duration-300">
                    {a.title}
                  </h3>
                  <p className="text-sm leading-[1.55] text-muted mb-7 flex-1">
                    {a.description}
                  </p>
                  <div className="flex items-center justify-between pt-5 border-t border-line">
                    <span className="text-xs">{a.author}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
                      {formatDate(a.date)}
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}
