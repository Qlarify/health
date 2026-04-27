import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQ } from "@/components/marketing/FAQ";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { emailFaqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Email & WhatsApp — ${site.name}`,
  description:
    "Your patient database is an untapped engine. Structured lifecycle communication turns dormant patient records into a reliable source of appointments.",
  alternates: { canonical: "/email" },
  openGraph: {
    title: `Email & WhatsApp — ${site.name}`,
    description:
      "Re-engage your existing patient database — one of the most under-used lead sources in hospital marketing.",
    url: `${site.url}/email`,
    type: "website",
  },
};

const faq = emailFaqs;

const lifecycle = [
  { day: "Day 0", event: "First visit", channel: "Record created", note: "Patient record and consent captured at OPD" },
  { day: "Day 3", event: "Follow-up", channel: "WhatsApp", note: "Recovery check-in and discharge care reminder" },
  { day: "30 days", event: "Preventive", channel: "Email", note: "Health tips and preventive care relevant to their specialty" },
  { day: "6 months", event: "Re-engage", channel: "WhatsApp", note: "Checkup due reminder, specialist slot availability" },
  { day: "Return", event: "Patient books", channel: "Appointment confirmed", note: "Lifecycle repeats with updated care context" },
];

const pillars = [
  {
    n: "01",
    label: "Appointment Reminders & Follow-Ups",
    body: "Automated flows that reduce no-shows and support treatment continuity through timely, relevant messages. A 48-hour reminder cuts no-shows by 30–40% across most specialty OPDs (based on hospital engagement benchmarks, 2019–2024).",
  },
  {
    n: "02",
    label: "Patient Segmentation",
    body: "Communication tailored by specialty, treatment stage, and care relevance — not mass-blast messaging. Your cardiac cohort and your dermatology cohort need different messages at different intervals.",
  },
  {
    n: "03",
    label: "Re-engagement Campaigns",
    body: "Seasonal health prompts, preventive care reminders, and specialty awareness to bring inactive patients back before they become someone else's patient.",
  },
  {
    n: "04",
    label: "Enquiry-to-Appointment Tracking",
    body: "Measuring how email and WhatsApp contribute to real appointment bookings — not just open rates. Every flow is connected to a conversion event, not a vanity metric.",
  },
];

function EmailSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hospital Email & WhatsApp Patient Communication",
    description:
      "Lifecycle patient communication that turns a dormant hospital database into a reliable source of return appointments.",
    serviceType: "Healthcare Lifecycle Marketing",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/email`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Email & WhatsApp", item: `${site.url}/email` },
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

export default function EmailPage() {
  return (
    <>
      <EmailSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Email & WhatsApp</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Service · Email & WhatsApp"
        title={
          <>
            Your patient database
            <br />
            <em className="text-sage italic font-normal">is an untapped engine.</em>
          </>
        }
        sub="Most hospitals are sitting on thousands of patient records they barely use. Structured lifecycle communication turns that dormant database into a reliable source of appointments — and it costs a fraction of new patient acquisition."
        meta={[
          { label: "WhatsApp open rate", value: "60–80%" },
          { label: "vs new acquisition", value: "5–7× cheaper" },
          { label: "Platforms", value: "Email + WA" },
          { label: "Opt-in model", value: "Explicit consent" },
        ]}
      />

      {/* Patient lifecycle */}
      <section
        aria-labelledby="lifecycle-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">The lifecycle — 01</Eyebrow>
              <h2
                id="lifecycle-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Right message.
                <br />
                <em className="text-sage italic font-normal">Right moment.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Most hospitals communicate once — at discharge — and then silence.{" "}
              <span className="sr-only">The patient relationship has five natural touchpoints. Each one is an opportunity to keep the patient connected to the right specialist at the right time.</span>{" "}
              Lifecycle communication is the back-half of every patient
              acquisition programme and amplifies the trust built on{" "}
              <Link href="/social" className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors">
                social
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <ul className="border-t border-line">
          {lifecycle.map((l, i) => (
            <Reveal as="li" key={l.day} delay={i * 50}>
              <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-4 py-5 border-b border-line items-baseline">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-sage">{l.day}</span>
                <span className="font-serif text-lg md:text-xl">{l.event}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted hidden sm:block">{l.channel}</span>
                <span className="text-[14px] text-muted hidden md:block">{l.note}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Four pillars */}
      <section
        aria-labelledby="pillars-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="mb-12 md:mb-16">
            <Eyebrow className="mb-4">Capabilities — 02</Eyebrow>
            <h2
              id="pillars-heading"
              className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
            >
              Four ways
              <br />
              <em className="text-sage italic font-normal">we keep patients close.</em>
            </h2>
          </div>
        </Reveal>

        <ul className="grid sm:grid-cols-2 border-t border-line">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 60}>
              <div className="grid grid-cols-[40px_1fr] gap-4 py-6 md:py-8 border-b border-line">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-1">
                  {p.n}
                </span>
                <div>
                  <h3 className="font-serif text-xl md:text-[22px] leading-[1.2] mb-3">{p.label}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <FAQ items={faq} title="Questions about email & WhatsApp for hospitals" eyebrow="FAQ — 03" />

      <AuditCTA />
    </>
  );
}
