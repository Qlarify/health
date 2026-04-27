import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeroMeta } from "@/components/ui/PageHeroMeta";

export type { PageHeroMetaItem as PageHeroMeta } from "@/components/ui/PageHeroMeta";

export function PageHero({
  eyebrow,
  title,
  sub,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  meta?: readonly { label: string; value: string }[];
}) {
  return (
    <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12 md:pb-16">
      <div className="max-w-[1100px]">
        <Reveal y={12}>
          <Eyebrow dot className="mb-6 md:mb-8">
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <Reveal delay={120} y={32}>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-[-0.02em] mb-6 md:mb-8">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="text-lg md:text-[21px] leading-[1.5] text-muted max-w-[680px]">
            {sub}
          </p>
        </Reveal>
      </div>

      {meta && meta.length > 0 && (
        <Reveal delay={360}>
          <PageHeroMeta meta={meta} />
        </Reveal>
      )}
    </section>
  );
}
