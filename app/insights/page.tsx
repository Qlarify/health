import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { InsightsList } from "@/components/marketing/InsightsList";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllInsights, insightCategories } from "@/lib/insights";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Insights · Field notes from hospital marketing — ${site.name}`,
  description:
    "Working notes from the practice. What's breaking, what's compounding, what we changed our minds about. Written by people doing the work, edited by clinicians.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: `Insights — ${site.name}`,
    description:
      "Field notes from hospital marketing in India. Edited by clinicians.",
    url: `${site.url}/insights`,
    type: "website",
  },
};

export default async function InsightsPage() {
  const articles = await getAllInsights();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured?.slug);

  const blog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} — Insights`,
    url: `${site.url}/insights`,
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      datePublished: a.date,
      url: `${site.url}/insights/${a.slug}`,
      author: { "@type": "Person", name: a.author },
    })),
  };

  return (
    <>
      <JsonLd data={blog} />

      <PageHero
        eyebrow="Insights · field notes from hospital marketing"
        title={
          <>
            Field notes,
            <br />
            <em className="text-sage italic font-normal">
              not thought leadership.
            </em>
          </>
        }
        sub="Working notes from the practice. What's breaking, what's compounding, what we changed our minds about. Written by people doing the work, edited by clinicians."
      />

      {featured && (
        <section
          aria-labelledby="featured-heading"
          className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-20 md:pb-28 border-t border-line"
        >
          <Reveal>
            <Link
              href={`/insights/${featured.slug}`}
              className="group block bg-surface border border-line rounded-[24px] p-8 md:p-14 transition-colors duration-300 hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
            >
              <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-sage text-paper">
                      Featured
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                      {featured.category} · {formatDate(featured.date)} ·{" "}
                      {featured.readTime}
                    </span>
                  </div>
                  <h2
                    id="featured-heading"
                    className="font-serif text-3xl md:text-5xl lg:text-[56px] leading-[1] tracking-[-0.02em] mb-5 group-hover:text-sage transition-colors duration-300"
                  >
                    {featured.title}
                  </h2>
                  <p className="text-base md:text-[17px] leading-[1.55] text-muted mb-7 max-w-[540px]">
                    {featured.description}
                  </p>
                  <div className="flex items-center gap-3.5">
                    <span
                      aria-hidden="true"
                      className="w-8 h-8 rounded-full bg-sage-soft flex items-center justify-center font-mono text-[11px] text-sage"
                    >
                      {featured.authorInitials}
                    </span>
                    <div>
                      <div className="text-sm font-medium">
                        {featured.author}
                      </div>
                      <div className="text-xs text-muted">
                        {featured.authorRole}
                      </div>
                    </div>
                  </div>
                </div>
                <FeaturedJourney />
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section
        aria-labelledby="archive-heading"
        className="px-6 md:px-12 lg:px-20 pb-24 md:pb-28"
      >
        <h2 id="archive-heading" className="sr-only">
          All articles
        </h2>
        <InsightsList articles={rest} categories={insightCategories} />
      </section>

      <section
        aria-labelledby="newsletter-heading"
        className="px-6 md:px-12 lg:px-20 pt-24 md:pt-28 pb-24 md:pb-28 border-t border-line bg-ink text-paper"
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <div>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.14em] mb-6"
                style={{ color: "#9BA89F" }}
              >
                The brief — monthly
              </p>
              <h2
                id="newsletter-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em] mb-4"
              >
                One letter a month.
                <br />
                <em
                  className="italic font-normal"
                  style={{ color: "#A8C0B4" }}
                >
                  Worth opening.
                </em>
              </h2>
              <p
                className="text-base leading-[1.55] max-w-[480px]"
                style={{ color: "#C9D2C8" }}
              >
                A short, practical note from the practice — what&apos;s working,
                what&apos;s not, what we changed our minds about. For hospital
                marketing leads. No noise.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div
              className="rounded-2xl p-7 md:p-8"
              style={{
                background: "#1A2622",
                border: "1px solid #2C3A35",
              }}
            >
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function FeaturedJourney() {
  const stages = [
    { l: "Awareness", k: "symptoms" },
    { l: "Consideration", k: "comparing" },
    { l: "Decision", k: "booking" },
    { l: "Post-consult", k: "recovery" },
  ];
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Patient journey illustration: Awareness, Consideration, Decision, Post-consult"
      className="w-full h-auto"
    >
      {stages.map((s, i) => {
        const x = 70 + i * 90;
        return (
          <g key={s.l}>
            <circle
              cx={x}
              cy={150}
              r={36}
              fill="none"
              stroke="var(--color-sage)"
              strokeWidth="1.2"
            />
            <text
              x={x}
              y={146}
              textAnchor="middle"
              fontSize="9"
              fill="var(--color-muted)"
              fontFamily="var(--font-mono)"
            >
              0{i + 1}
            </text>
            <text
              x={x}
              y={160}
              textAnchor="middle"
              fontSize="11"
              fill="var(--color-ink)"
              fontFamily="var(--font-serif)"
              fontStyle={i === 1 ? "italic" : "normal"}
            >
              {s.l}
            </text>
            {i < stages.length - 1 && (
              <line
                x1={x + 36}
                x2={x + 54}
                y1={150}
                y2={150}
                stroke="var(--color-line)"
                strokeDasharray="3 3"
              />
            )}
            <text
              x={x}
              y={210}
              textAnchor="middle"
              fontSize="9"
              fill="var(--color-muted)"
              fontFamily="var(--font-mono)"
            >
              {s.k}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
