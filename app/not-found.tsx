import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Page not found — ${site.name}`,
  description:
    "The page you tried to reach isn't here. The most useful next step is probably the services overview or a 30-minute audit.",
  robots: { index: false, follow: false },
};

const detours = [
  {
    label: "Services",
    href: "/services",
    body: "The six practices we run for hospitals — SEO, performance, YouTube, content, brand, and strategy.",
  },
  {
    label: "Work",
    href: "/work",
    body: "Selected case studies. Outcomes, not awards. Numbers verified at the source.",
  },
  {
    label: "Insights",
    href: "/insights",
    body: "Field notes on hospital marketing, written by the people doing the work.",
  },
  {
    label: "Contact",
    href: "/contact",
    body: "Book a 30-minute audit, or write to us about anything else.",
  },
] as const;

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28"
    >
      <div className="max-w-[1100px]">
        <Reveal y={12}>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sage mb-6 md:mb-8">
            404 · Page not found
          </p>
        </Reveal>

        <Reveal delay={120} y={32}>
          <h1
            id="not-found-heading"
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-[-0.02em] mb-6 md:mb-8 max-w-[920px]"
          >
            This page isn&rsquo;t here.{" "}
            <em className="text-sage italic font-normal">
              Something else might be.
            </em>
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="text-lg md:text-[21px] leading-[1.5] text-muted max-w-[680px] mb-12 md:mb-16">
            The link you followed is broken, the page has moved, or the URL was
            mistyped. None of those are interesting on their own — what&rsquo;s
            interesting is what you came here to do. Pick a starting point.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <ul className="grid md:grid-cols-2 gap-4 md:gap-6 pt-8 md:pt-10 border-t border-line">
            {detours.map((d, i) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="group block bg-surface border border-line rounded-[16px] p-6 md:p-8 hover:border-ink transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <span className="font-serif text-2xl md:text-3xl leading-[1.1] tracking-[-0.01em] group-hover:text-sage transition-colors duration-300">
                      {d.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
                    >
                      {String(i + 1).padStart(2, "0")} →
                    </span>
                  </div>
                  <p className="text-base leading-[1.55] text-muted">
                    {d.body}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={480}>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mt-12 md:mt-16">
            If you arrived here from a link on our site,{" "}
            <a
              href={`mailto:${site.email}?subject=Broken%20link%20on%20qlarify.health`}
              className="text-ink underline underline-offset-4 hover:text-sage transition-colors"
            >
              tell us
            </a>{" "}
            so we can fix it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
