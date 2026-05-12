// Answer-first knowledge block — built for AI search citation (ChatGPT,
// Perplexity, Gemini) and Google featured snippets.
//
// The component renders a single Question -> 2-3 sentence Answer block.
// Use a stack of these on a page to expose the GEO-quotable definitions:
//   - What is Qlarify Health?
//   - Who is it for?
//   - What problem does it solve?
//   - How is it different?
//
// Pure server component, no client JS, no animation. Headings emit real
// <h2> tags so screen readers and AI crawlers can lift them cleanly.

import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

type KnowledgeBlockProps = {
  eyebrow: string;
  question: string;
  answer: ReactNode;
  id?: string;
};

export function KnowledgeBlock({
  eyebrow,
  question,
  answer,
  id,
}: KnowledgeBlockProps) {
  const headingId =
    id ??
    question
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <section
      aria-labelledby={headingId}
      className="grid md:grid-cols-[1fr_1.6fr] gap-6 md:gap-16 py-10 md:py-12 border-b border-line"
    >
      <div>
        <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
        <h2
          id={headingId}
          className="font-serif text-2xl md:text-[32px] leading-[1.1] tracking-[-0.01em]"
        >
          {question}
        </h2>
      </div>
      <p className="text-base md:text-[18px] leading-[1.6] text-muted max-w-[680px] self-center">
        {answer}
      </p>
    </section>
  );
}

// A wrapper that renders multiple KnowledgeBlocks together with a shared
// section header. Good for the home page where we want all four blocks
// (What / Who / Problem / Different) in one quotable block.
export function KnowledgeBlocks({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby="knowledge-blocks-heading"
      className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-12 md:pb-16 border-t border-line"
    >
      <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
        <div>
          <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
          <h2
            id="knowledge-blocks-heading"
            className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
          >
            {title}
          </h2>
        </div>
      </div>
      <div className="border-t border-line">{children}</div>
    </section>
  );
}
