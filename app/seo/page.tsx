import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQ } from "@/components/marketing/FAQ";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoFaqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Hospital SEO & Content — ${site.name}`,
  description:
    "Content that patients actually search for. Intent-led hospital SEO that turns organic search into a consistent source of qualified patient enquiries.",
  alternates: { canonical: "/seo" },
  openGraph: {
    title: `Hospital SEO & Content — ${site.name}`,
    description:
      "Rank for the searches that generate qualified inbound enquiries, not just traffic.",
    url: `${site.url}/seo`,
    type: "website",
  },
};

const faq = seoFaqs;

const pillarsWhy = [
  {
    n: "01",
    label: "Medical accuracy is non-negotiable",
    body: "Generic agencies repurpose wellness blog templates. Hospital content must be clinically reviewed, specialty-specific, and written with the authority patients demand. Every piece we produce is reviewed by the relevant specialist before publication.",
  },
  {
    n: "02",
    label: "The audience is anxious, not curious",
    body: "A patient searching 'knee replacement recovery time' isn't casually browsing. They need reassurance, specificity, and authority. Content written for casual readers doesn't convert patients making high-stakes health decisions.",
  },
  {
    n: "03",
    label: "Success is measured in enquiries, not pageviews",
    body: "Traffic without patient calls is vanity. Healthcare content must be mapped to specialties, tied to local intent, and measured by enquiry volume — not sessions, bounce rates, or impressions.",
  },
];

const pillarsSeo = [
  {
    n: "01",
    label: "Patient Intent Mapping",
    tag: "Keyword Research",
    body: "Exact phrases patients use — by specialty, condition, and city — so content meets them at the moment of decision, not at a generic awareness stage.",
  },
  {
    n: "02",
    label: "Local SEO for Catchment Areas",
    tag: "Local & Maps",
    body: "Optimised for neighbourhood-level searches that drive OPD walk-ins. Real local strategy built around your catchment geography, not a national ranking leaderboard.",
  },
  {
    n: "03",
    label: "Enquiry-First Metrics",
    tag: "Measurement",
    body: "We report on organic patient enquiries and call volume by specialty — not vanity traffic. Every ranking measured against real inbound impact.",
  },
  {
    n: "04",
    label: "Technical SEO Foundation",
    tag: "Technical",
    body: "Site structure, page speed, healthcare schema markup (MedicalSpecialty, MedicalCondition, Physician, FAQPage), mobile optimisation — the foundation every content strategy needs to perform.",
  },
];

function SeoSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hospital SEO & Content Marketing",
    description:
      "Intent-led hospital SEO that turns organic search into a consistent source of qualified patient enquiries.",
    serviceType: "Healthcare SEO",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/seo`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Hospital SEO", item: `${site.url}/seo` },
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

export default function SeoPage() {
  return (
    <>
      <SeoSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Hospital SEO</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Service · SEO & Content"
        title={
          <>
            Content patients
            <br />
            <em className="text-sage italic font-normal">actually search for.</em>
          </>
        }
        sub="Patients don't search the way hospitals communicate. Our intent-led framework closes that gap — turning organic search into a consistent source of qualified patient enquiries."
        meta={[
          { label: "Organic enquiry lift", value: "+312%" },
          { label: "Time to results", value: "3–6 mo" },
          { label: "Languages", value: "8" },
          { label: "Specialties mapped", value: "21" },
        ]}
      />

      {/* Why healthcare SEO is different */}
      <section
        aria-labelledby="why-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">The difference — 01</Eyebrow>
              <h2
                id="why-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Generic content
                <br />
                <em className="text-sage italic font-normal">drives traffic.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Healthcare content drives trust. Patients aren&rsquo;t browsing — they&rsquo;re anxious, uncertain, and making decisions that affect their health and finances.{" "}
              <span className="sr-only">The content has to work differently. Where SEO ends, our{" "}
              <Link href="/video" className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors">
                video infrastructure
              </Link>{" "}
              and{" "}
              <Link href="/insights" className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors">
                clinical content programme
              </Link>{" "}
              continue the same intent.</span>
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
          {pillarsWhy.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 70}>
              <div className="border-t-2 border-ink pt-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-3">
                  {p.n}
                </div>
                <h3 className="font-serif text-xl md:text-[22px] leading-[1.2] mb-4">{p.label}</h3>
                <p className="text-[15px] leading-[1.6] text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Four SEO pillars */}
      <section
        aria-labelledby="pillars-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">How we work — 02</Eyebrow>
              <h2
                id="pillars-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Four pillars
                <br />
                <em className="text-sage italic font-normal">of hospital SEO.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Prospects are already searching. The question is whether they find you, trust what they see, and pick up the phone.{" "}
              <span className="sr-only">Each pillar addresses a different part of that chain. See it operating across real specialties on our{" "}
              <Link href="/work" className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors">
                hospital case studies
              </Link>
              .</span>
            </p>
          </div>
        </Reveal>

        <ul className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {pillarsSeo.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 70}>
              <article className="bg-surface border border-line rounded-[20px] p-7 md:p-9 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-sage">
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

      <FAQ items={faq} title="Questions about hospital SEO" eyebrow="FAQ — 03" />

      <AuditCTA />
    </>
  );
}
