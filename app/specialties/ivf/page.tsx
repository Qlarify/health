import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `IVF & Fertility Marketing for Hospitals`,
  description:
    "IVF and fertility clinic marketing in India — patient journey content, YouTube explainers, paid media for IVF intent, and WhatsApp nurture sequences for multi-cycle patients.",
  keywords: [
    "IVF marketing india",
    "fertility clinic marketing",
    "IVF hospital marketing india",
    "fertility centre patient acquisition",
    "IVF digital marketing india",
    "fertility hospital SEO india",
    "IVF clinic advertising india",
  ],
  alternates: { canonical: "/specialties/ivf" },
  openGraph: {
    title: `IVF & Fertility Marketing for Hospitals — ${site.name}`,
    description:
      "Fertility marketing built for the emotional IVF journey — YouTube trust content, ASCI-compliant paid media, and lifecycle communication for multi-cycle patients.",
    url: `${site.url}/specialties/ivf`,
    type: "website",
  },
};

function IvfSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "IVF & Fertility Marketing for Hospitals",
    description:
      "Specialist marketing for IVF centres and fertility hospitals in India — patient journey content, YouTube, paid media and WhatsApp.",
    serviceType: "Healthcare Marketing — Fertility",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/specialties/ivf`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Specialties", item: `${site.url}/specialties` },
      { "@type": "ListItem", position: 3, name: "IVF & Fertility", item: `${site.url}/specialties/ivf` },
    ],
  };
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}

const journey = [
  { stage: "Symptom", query: `"Why am I not conceiving?"`, note: "3–18 months of private research before any clinical contact" },
  { stage: "Explore", query: `"IVF success rate India"`, note: "Comparing clinics, reading forums, watching YouTube" },
  { stage: "Trust", query: `"Best IVF doctor [city]"`, note: "Shortlisting 2–4 doctors by name and review" },
  { stage: "Decision", query: `"IVF cost [clinic name]"`, note: "Cost, protocol, success rates — high research intensity" },
  { stage: "Cycle", query: `"IVF cycle what to expect"`, note: "Seeking reassurance throughout the treatment cycle" },
  { stage: "Return", query: `"IVF second cycle"`, note: "60–70% require more than one cycle — retention is critical" },
];

const channels = [
  {
    n: "01",
    label: "YouTube — trust before the first call",
    body: "The IVF patient watches hours of content before calling. Doctor-led explainers ('What happens in an IVF cycle', 'IVF vs IUI — which is right for you', 'How to read your AMH report') build familiarity with the embryologist or reproductive endocrinologist before any clinical contact. A fertility centre with 40 high-quality explainers on YouTube is far ahead of one that appears only in paid ads.",
    link: "/video",
    linkLabel: "Video as Infrastructure →",
  },
  {
    n: "02",
    label: "SEO — own the fertility search landscape",
    body: "IVF-related search volume in India's top 8 cities is enormous and growing. The queries span from 'infertility causes in women' (awareness) to 'best IVF clinic Mumbai success rate' (decision). A systematic content programme — condition explainers, procedure guides, cost transparency pages — builds organic rankings that compound without ongoing spend.",
    link: "/seo",
    linkLabel: "Hospital SEO →",
  },
  {
    n: "03",
    label: "Paid media — capture decision-stage intent",
    body: "High-intent IVF queries — 'IVF consultation Bengaluru', 'fertility specialist near me', 'ICSI procedure cost India' — convert well with the right landing page and call-to-action. Paid media for fertility must be ASCI-compliant: no guaranteed outcomes, no before/after success photography without consent. The funnel is consultation → assessment → treatment plan.",
    link: "/paid",
    linkLabel: "Performance Marketing →",
  },
  {
    n: "04",
    label: "WhatsApp — multi-cycle relationship management",
    body: "The average IVF patient requires 2–3 cycles before a successful outcome. The clinic that stays in supportive, non-intrusive contact through the cycle recovery period — and reaches out at the right moment for the next consultation — retains far more patients than the one that sends only appointment reminders. DPDP-compliant lifecycle sequences keep the relationship warm.",
    link: "/email",
    linkLabel: "Email & WhatsApp →",
  },
];

export default function IvfPage() {
  return (
    <>
      <IvfSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/services" className="hover:text-ink transition-colors">Specialties</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">IVF & Fertility</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Specialty · IVF & Fertility"
        title={
          <>
            The IVF patient researches
            <br />
            <em className="text-sage italic font-normal">for months before calling.</em>
          </>
        }
        sub="Fertility is one of the most emotionally complex patient journeys in healthcare. The couple researching IVF spends weeks — sometimes months — watching, reading, and comparing before they reach out. The fertility centre that is present, honest, and familiar throughout that journey gets the call."
        meta={[
          { label: "Avg research period", value: "3–18 months" },
          { label: "Cycles per patient (avg)", value: "2–3" },
          { label: "Digital research rate", value: "Most patients" },
          { label: "YouTube time pre-call", value: "Hrs, not minutes" },
        ]}
      />

      {/* Patient journey */}
      <section
        aria-labelledby="ivf-journey-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">The journey — 01</Eyebrow>
              <h2
                id="ivf-journey-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Six moments,<br />
                <em className="text-sage italic font-normal">each a channel decision.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              The IVF patient doesn&rsquo;t move through a funnel. They cycle through hope, hesitation, research, and retreat — often multiple times before committing to a clinic. Marketing that matches this non-linear journey outperforms campaign-based approaches by a significant margin.
            </p>
          </div>
        </Reveal>

        <ul className="border-t border-line">
          {journey.map((j, i) => (
            <Reveal as="li" key={j.stage} delay={i * 40}>
              <div className="grid grid-cols-[80px_1fr_1fr] md:grid-cols-[100px_1fr_1.4fr] gap-4 md:gap-8 py-5 md:py-6 border-b border-line items-baseline">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-sage">{j.stage}</span>
                <span className="font-serif text-lg md:text-xl text-muted italic">{j.query}</span>
                <span className="text-[14px] md:text-[15px] text-muted hidden sm:block">{j.note}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Four channels */}
      <section
        aria-labelledby="ivf-channels-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="mb-12 md:mb-16">
            <Eyebrow className="mb-4">Channel strategy — 02</Eyebrow>
            <h2
              id="ivf-channels-heading"
              className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
            >
              Four channels,{" "}
              <em className="text-sage italic font-normal">one fertility programme.</em>
            </h2>
          </div>
        </Reveal>

        <ul className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {channels.map((c, i) => (
            <Reveal as="li" key={c.n} delay={i * 70}>
              <article className="bg-surface border border-line rounded-[20px] p-7 md:p-9 h-full flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-4">{c.n}</span>
                <h3 className="font-serif text-xl md:text-[22px] leading-[1.2] mb-4">{c.label}</h3>
                <p className="text-[15px] leading-[1.6] text-muted flex-1">{c.body}</p>
                <Link
                  href={c.link}
                  className="inline-block mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
                >
                  {c.linkLabel}
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <AuditCTA />
    </>
  );
}
