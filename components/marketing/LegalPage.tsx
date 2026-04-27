import type { ReactNode } from "react";
import { PageHero } from "@/components/marketing/PageHero";

// Shared shell for the four legal/compliance pages (privacy, terms, DPDP,
// accessibility). The body is plain prose styled here so individual pages can
// stay focused on copy.

export function LegalPage({
  eyebrow,
  title,
  sub,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} sub={sub} />

      <section className="px-6 md:px-12 lg:px-20 pb-24 md:pb-32 border-t border-line pt-12 md:pt-16">
        <div className="max-w-[760px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-10">
            Last updated · {lastUpdated}
          </p>
          <div className="legal-prose">{children}</div>
        </div>
      </section>
    </>
  );
}
