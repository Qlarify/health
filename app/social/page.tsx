import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQ } from "@/components/marketing/FAQ";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { socialFaqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Social Media Marketing for Hospitals — ${site.name}`,
  description:
    "Build trust before they ever search for you. Social media that makes specialists visible, builds patient familiarity, and feeds the funnel before the first enquiry.",
  alternates: { canonical: "/social" },
  openGraph: {
    title: `Social Media Marketing for Hospitals — ${site.name}`,
    description:
      "The patient who calls has often been watching for weeks. Social is where the relationship begins — before the search, before the enquiry.",
    url: `${site.url}/social`,
    type: "website",
  },
};

const faq = socialFaqs;

const pillars = [
  {
    n: "01",
    label: "Content as Intent",
    tag: "Content Strategy",
    body: "Every post answers a patient question. If it doesn't earn its place in the feed by solving a real concern — explaining a symptom, introducing a specialist, walking through a procedure — we don't publish it.",
  },
  {
    n: "02",
    label: "Consistent Voice Across Locations",
    tag: "Multi-location",
    body: "For multi-location groups, we build centralised content frameworks — one trusted brand, consistent editorial standards, with local adaptations for each hospital's specialists and catchment area.",
  },
  {
    n: "03",
    label: "Specialist Visibility",
    tag: "Doctor Branding",
    body: "Doctor content that makes physicians feel familiar and approachable — reducing the hesitation patients feel before their first call. A 20-year HOD who is invisible online is a missed referral every day.",
  },
  {
    n: "04",
    label: "Integrated with Paid",
    tag: "Paid + Organic",
    body: "Organic content and paid campaigns working in sync. High-performing organic posts get amplified to targeted catchment audiences. The paid budget amplifies what already works, not what someone guessed would.",
  },
];

function SocialSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Social Media Marketing for Hospitals",
    description:
      "Build specialist credibility and patient trust before the prospect ever submits an enquiry.",
    serviceType: "Healthcare Social Media Marketing",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/social`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Social Media", item: `${site.url}/social` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faqSchema} />
    </>
  );
}

export default function SocialPage() {
  return (
    <>
      <SocialSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Social Media</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Service · Social Media"
        title={
          <>
            Build trust before
            <br />
            <em className="text-sage italic font-normal">they ever search.</em>
          </>
        }
        sub="The patient who calls has often been watching for weeks. Social media is where the relationship begins — before the search, before the enquiry, before the appointment."
        meta={[
          { label: "Platforms", value: "5" },
          { label: "Touchpoints before booking", value: "6–8" },
          { label: "Languages", value: "8" },
          { label: "Post cadence", value: "4–5 / wk" },
        ]}
      />

      {/* Four pillars */}
      <section
        aria-labelledby="pillars-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">How we work — 01</Eyebrow>
              <h2
                id="pillars-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Four pillars.
                <br />
                <em className="text-sage italic font-normal">One discipline.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Social works before the search — and that&rsquo;s the job it should be measured against.{" "}
              <span className="sr-only">Every pillar below serves one purpose: making your hospital the obvious choice when a patient finally has a need.</span>{" "}
              Social pairs naturally with{" "}
              <Link href="/video" className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors">
                doctor-led video
              </Link>{" "}
              and{" "}
              <Link href="/email" className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors">
                email &amp; WhatsApp
              </Link>{" "}
              for warm-funnel conversion.
            </p>
          </div>
        </Reveal>

        <ul className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 70}>
              <article className="bg-paper border border-line rounded-[20px] p-7 md:p-9 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-sage">
                    {p.tag}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {p.n}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-[26px] leading-[1.1] mb-4">{p.label}</h3>
                <p className="text-[15px] leading-[1.6] text-muted">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Pull quote */}
      <section
        aria-label="Social media insight"
        className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-16 md:pb-20 border-t border-line"
      >
        <Reveal>
          <h2 className="font-serif italic text-2xl md:text-[34px] leading-[1.3] tracking-[-0.01em] max-w-[880px] text-ink">
            &ldquo;A patient who books has usually encountered your hospital multiple times. Social is where those first impressions form — before they ever type a search query.&rdquo;
          </h2>
        </Reveal>
      </section>

      <FAQ items={faq} title="Questions about hospital social media" eyebrow="FAQ — 02" />

      <AuditCTA />
    </>
  );
}
