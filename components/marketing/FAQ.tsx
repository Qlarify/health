import { Disclosure } from "@/components/ui/Disclosure";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { FaqItem } from "@/content/services";

export function FAQ({
  items,
  title = "Common questions",
  eyebrow = "Questions",
}: {
  items: readonly FaqItem[];
  title?: string;
  eyebrow?: string;
}) {
  // The Disclosure primitive expects { q, a } already.
  const disclosureItems = items.map((it) => ({ q: it.q, a: it.a }));

  return (
    <section
      aria-labelledby="faq-heading"
      className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-24 md:pb-32 border-t border-line"
    >
      <Reveal>
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-end mb-10 md:mb-12">
          <div>
            <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
            <h2
              id="faq-heading"
              className="font-serif text-4xl md:text-5xl leading-[1] tracking-[-0.02em]"
            >
              {title}
            </h2>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <Disclosure items={disclosureItems} initialOpen={-1} />
      </Reveal>
    </section>
  );
}
