import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Oncology Marketing for Hospitals`,
  description:
    "Oncology and cancer centre marketing for Indian hospitals — ethical patient acquisition, second-opinion positioning, NABH accreditation trust signals, and survivorship retention.",
  keywords: [
    "oncology hospital marketing india",
    "cancer centre marketing india",
    "hospital oncology patient acquisition",
    "cancer hospital marketing strategy",
    "oncology marketing india",
    "cancer treatment hospital SEO",
    "hospital oncology programme growth",
  ],
  alternates: { canonical: "/specialties/oncology" },
  openGraph: {
    title: `Oncology Marketing for Hospitals — ${site.name}`,
    description:
      "Grow cancer centre OPD volume in India — ethically, accurately, and without exploiting fear. YouTube, SEO, second-opinion pathways, and survivorship retention.",
    url: `${site.url}/specialties/oncology`,
    type: "website",
  },
};

function OncologySchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Oncology Marketing for Hospitals",
    description:
      "Specialist marketing for oncology departments and cancer hospitals in India — ethical patient acquisition, YouTube, SEO, and survivorship retention.",
    serviceType: "Healthcare Marketing — Oncology",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/specialties/oncology`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Specialties", item: `${site.url}/specialties` },
      { "@type": "ListItem", position: 3, name: "Oncology", item: `${site.url}/specialties/oncology` },
    ],
  };
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}

const principles = [
  {
    n: "01",
    title: "Ethics before performance.",
    body: "Oncology marketing must never exploit fear. ASCI guidelines prohibit guaranteed outcomes. NMC norms restrict testimonials. These are not constraints — they are the framework. Within them, a cancer centre can build extraordinary patient trust. Outside them, the legal and reputational risk is significant.",
  },
  {
    n: "02",
    title: "Clinical depth over reach.",
    body: "A cancer patient does not choose by advertising reach. They choose by clinical credibility — NABH accreditation, oncologist credentials, published outcomes, protocol transparency. The marketing job is to make that clinical depth visible to the patient who is looking for it.",
  },
  {
    n: "03",
    title: "Second opinions are an opportunity.",
    body: "A significant proportion of oncology patients seek a second opinion — often after an initial diagnosis elsewhere. A cancer centre that makes its second-opinion pathway explicitly accessible, clear, and compassionate captures patients at a moment when the relationship begins.",
  },
  {
    n: "04",
    title: "Survivorship is the long-term asset.",
    body: "A cancer survivor who remains connected to the treating hospital — through follow-up care, wellness programmes, and community — is the most powerful referral source in the hospital. Survivorship communication is not an afterthought. It is the back-half of the patient acquisition programme.",
  },
];

const channels = [
  { label: "YouTube — Oncologist Introductions", note: "Trust before the first call", href: "/video" },
  { label: "Oncology SEO", note: "Condition-specific content, NABH visibility", href: "/seo" },
  { label: "Second-Opinion Paid Campaigns", note: "Capturing active decision-stage patients", href: "/paid" },
  { label: "Social Media — Awareness + Doctor Trust", note: "Non-fear awareness campaigns", href: "/social" },
  { label: "Survivorship Lifecycle", note: "WhatsApp, email, wellness follow-ups", href: "/email" },
  { label: "Start a conversation", note: "Free 30-min discovery call", href: "/contact" },
];

export default function OncologyPage() {
  return (
    <>
      <OncologySchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/services" className="hover:text-ink transition-colors">Specialties</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Oncology</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Specialty · Oncology"
        title={
          <>
            Oncology marketing that earns
            <br />
            <em className="text-sage italic font-normal">trust, not just clicks.</em>
          </>
        }
        sub="Cancer patients are frightened, exhausted, and highly sceptical of healthcare marketing. The oncology centre that communicates clinical depth, transparency, and compassion — without exploiting the fear — builds the only kind of trust that converts in this specialty."
        meta={[
          { label: "Research intensity", value: "Very high" },
          { label: "Second-opinion rate", value: "40–60%" },
          { label: "Survivorship opportunity", value: "Long-term asset" },
          { label: "Key constraint", value: "ASCI + NMC compliance" },
        ]}
      />

      {/* Four principles */}
      <section
        aria-labelledby="oncology-principles-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="mb-12 md:mb-16">
            <Eyebrow className="mb-4">The framework — 01</Eyebrow>
            <h2
              id="oncology-principles-heading"
              className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
            >
              Four principles every{" "}
              <em className="text-sage italic font-normal">oncology marketer must hold.</em>
            </h2>
          </div>
        </Reveal>

        <ul className="border-t border-line">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 50}>
              <div className="grid md:grid-cols-[60px_1fr_1.6fr] gap-6 md:gap-8 py-7 md:py-9 border-b border-line items-baseline">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{p.n}</span>
                <h3 className="font-serif text-2xl md:text-[30px] leading-[1.05]">{p.title}</h3>
                <p className="text-base leading-[1.6] text-muted max-w-[560px]">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Pull quote */}
      <section
        aria-label="Oncology insight"
        className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-16 md:pb-20 border-t border-line"
      >
        <Reveal>
          <h2 className="font-serif italic text-2xl md:text-[34px] leading-[1.3] tracking-[-0.01em] max-w-[880px] text-ink">
            &ldquo;A cancer patient who watches an oncologist explain their diagnosis clearly and calmly — without fear-mongering, without guarantees — has already begun trusting that doctor before they walk through the door.&rdquo;
          </h2>
        </Reveal>
      </section>

      {/* Channels */}
      <section
        aria-labelledby="oncology-channels-heading"
        className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="mb-10 md:mb-12">
            <Eyebrow className="mb-4">Build the programme — 02</Eyebrow>
            <h2
              id="oncology-channels-heading"
              className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
            >
              Five channels,{" "}
              <em className="text-sage italic font-normal">oncology-tuned.</em>
            </h2>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {channels.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="group block bg-paper border border-line rounded-[16px] p-6 hover:border-ink transition-colors"
                >
                  <div className="font-serif text-xl leading-[1.2] mb-1 group-hover:text-sage transition-colors">
                    {c.label}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{c.note}</div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <AuditCTA />
    </>
  );
}
