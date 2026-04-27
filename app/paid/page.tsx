import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQ } from "@/components/marketing/FAQ";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { paidFaqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Paid Media & Performance — ${site.name}`,
  description:
    "Every rupee mapped to a qualified lead, not a dashboard metric. Hospital paid media across Google, Meta, and retargeting — measured in appointments, not clicks.",
  alternates: { canonical: "/paid" },
  openGraph: {
    title: `Paid Media & Performance — ${site.name}`,
    description:
      "Your ads aren't failing. Your funnel is. Hospital paid media built to trace every rupee back to a qualified inbound lead.",
    url: `${site.url}/paid`,
    type: "website",
  },
};

const faq = paidFaqs;

const platforms = [
  {
    n: "01",
    name: "Google Search",
    role: "Capture Demand",
    tag: "High Intent",
    targeting: "Condition + city keywords · 'knee replacement Bengaluru', 'cardiologist near me'",
    format: "Search ads with call extensions · One ad group per specialty per condition",
    metrics: "Cost per inbound call · Call volume by specialty · Cost per qualified lead",
    body: "Patients searching with condition + city intent are ready to book. We build one ad group per specialty per condition, with landing pages that feature named specialists, patient stories, and a visible click-to-call button.",
  },
  {
    n: "02",
    name: "Meta & Instagram",
    role: "Create Demand",
    tag: "Awareness",
    targeting: "Catchment area geo-fencing · Age 35–65 · Lookalikes of past patients",
    format: "Patient story videos · Carousel with doctor profiles · Reels with health tips",
    metrics: "Thumb-stop rate · Video view-through · Retargeting pool size · Brand recall lift",
    body: "Most patients don't search until they have a reason. Meta builds familiarity and trust before the need arises — then retargeting captures them when intent is highest.",
  },
  {
    n: "03",
    name: "Retargeting",
    role: "Close the Loop",
    tag: "Conversion",
    targeting: "Website visitors (7–30 days) · Video viewers (50%+) · Form abandoners",
    format: "'Dr. Kumar has slots this week' · Testimonial + CTA · Frequency capped at 3×/week",
    metrics: "Return visit rate · Cost per lead (retarget) · Lead-to-appointment %",
    body: "Warm leads — patients who visited your site or watched your video — convert at 4–8× the rate of cold traffic (Meta retargeting benchmarks, 2024). Retargeting closes the loop on the demand that Google and Meta built.",
  },
];

const tracking = [
  {
    n: "01",
    title: "Calls by Specialty, Not Just 'Leads'",
    body: "Every inbound call is tagged to the campaign, specialty, and ad creative that drove it. You know which ₹500 drove which orthopaedics enquiry.",
  },
  {
    n: "02",
    title: "Cost Per Qualified Inbound Lead",
    body: "Not cost per click. Not cost per impression. The actual cost of an enquiry from a patient who matches your specialty — tracked to the ad group.",
  },
  {
    n: "03",
    title: "Geo-Performance by Neighbourhood",
    body: "Which 5 km radius drives the most OPD walk-ins? Which PIN codes have high ad spend but zero conversions? We report by catchment micro-zone.",
  },
];

function PaidSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hospital Paid Media & Performance Advertising",
    description:
      "Every rupee mapped to a qualified patient lead. Hospital paid media across Google, Meta, and retargeting.",
    serviceType: "Healthcare Performance Marketing",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/paid`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Paid Media", item: `${site.url}/paid` },
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

export default function PaidPage() {
  return (
    <>
      <PaidSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Paid Media</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Service · Paid Media"
        title={
          <>
            Your ads aren&rsquo;t failing.
            <br />
            <em className="text-sage italic font-normal">Your funnel is.</em>
          </>
        }
        sub="₹10 lakh per month. 200 leads. No source attribution. No specialty tagging. No idea which ₹500 drove which inbound call. We fix the system, not just the creative."
        meta={[
          { label: "CPQL vs benchmarks", value: "↓ lower" },
          { label: "Campaign iteration", value: "7 days" },
          { label: "Platforms", value: "3" },
          { label: "Attribution", value: "Call-level" },
        ]}
      />

      {/* Three platform roles */}
      <section
        aria-labelledby="platforms-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">Platform strategy — 01</Eyebrow>
              <h2
                id="platforms-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Each platform
                <br />
                <em className="text-sage italic font-normal">has one job.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Generic agencies run the same creative everywhere. We assign each platform a specific role in the patient journey — and measure it against the right metric for that role.{" "}
              <span className="sr-only">Paid only delivers when the rest of the system is in place — every other channel feeding into it.</span>
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
          {platforms.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 70}>
              <article className="bg-paper border border-line rounded-[20px] p-7 md:p-9 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-sage bg-sage/10 px-2.5 py-1 rounded-full">
                    {p.tag}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {p.n}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-[26px] leading-[1.1] mb-1">{p.name}</h3>
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-sage mb-4">{p.role}</div>
                <p className="text-[15px] leading-[1.6] text-muted mb-6 flex-1">{p.body}</p>
                <dl className="space-y-2 border-t border-line pt-4">
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted mb-0.5">Targeting</dt>
                    <dd className="text-[13px] leading-[1.5]">{p.targeting}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted mb-0.5">Metrics</dt>
                    <dd className="text-[13px] leading-[1.5]">{p.metrics}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Tracking & attribution */}
      <section
        aria-labelledby="tracking-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">Reporting — 02</Eyebrow>
              <h2
                id="tracking-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                We report
                <br />
                <em className="text-sage italic font-normal">appointments.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Your current agency reports clicks. Every metric we report traces back to one question: did a patient book? If a number doesn&rsquo;t answer that question, we don&rsquo;t lead with it.{" "}
              <span className="sr-only">Retargeting compounds when paired with{" "}
              <Link href="/video" className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors">
                doctor-led video
              </Link>{" "}
              — warm video viewers convert at multiples of cold traffic.</span>
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
          {tracking.map((t, i) => (
            <Reveal as="li" key={t.n} delay={i * 70}>
              <div className="border-t-2 border-ink pt-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-3">{t.n}</div>
                <h3 className="font-serif text-xl md:text-[22px] leading-[1.2] mb-4">{t.title}</h3>
                <p className="text-[15px] leading-[1.6] text-muted">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <FAQ items={faq} title="Questions about hospital paid media" eyebrow="FAQ — 03" />

      <AuditCTA />
    </>
  );
}
