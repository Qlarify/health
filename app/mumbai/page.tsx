import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Hospital Marketing Agency in Mumbai`,
  description:
    "Hospital marketing for Mumbai hospitals — SEO, YouTube, paid media and WhatsApp built around Mumbai's patient demographics and competitive private healthcare landscape.",
  keywords: [
    "hospital marketing agency mumbai",
    "healthcare marketing agency mumbai",
    "hospital digital marketing mumbai",
    "hospital SEO mumbai",
    "medical marketing agency mumbai",
    "hospital patient acquisition mumbai",
    "healthcare marketing company mumbai india",
  ],
  alternates: { canonical: "/mumbai" },
  openGraph: {
    title: `Hospital Marketing Agency in Mumbai — ${site.name}`,
    description:
      "Hospital-only marketing for Mumbai's competitive private healthcare market. OPD-accountable strategy across YouTube, SEO, paid and WhatsApp.",
    url: `${site.url}/mumbai`,
    type: "website",
  },
};

function MumbaiSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hospital Marketing Agency — Mumbai",
    description:
      "Hospital-only marketing services for multi-specialty and single-specialty hospitals in Mumbai — SEO, YouTube, paid media, social media, and patient lifecycle communication.",
    serviceType: "Healthcare Marketing",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: {
      "@type": "City",
      name: "Mumbai",
      addressCountry: "IN",
    },
    url: `${site.url}/mumbai`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Mumbai", item: `${site.url}/mumbai` },
    ],
  };
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}

const differentiators = [
  {
    n: "01",
    title: "Multi-lingual patient base.",
    body: "Mumbai's patient population spans Marathi, Gujarati, Hindi, English, and significant diaspora communities. Content strategy that reaches only English-speakers misses the majority of the market.",
  },
  {
    n: "02",
    title: "High-value, high-expectation patients.",
    body: "Mumbai's private hospital segment includes some of the country's most discerning patients. Clinical credentials, specialist reputation, and facility standards all surface in the patient's digital research before the first call.",
  },
  {
    n: "03",
    title: "Geography-specific catchment.",
    body: "Western suburbs, Central suburbs, and South Mumbai have distinct patient populations with different commute tolerances. Location-specific campaigns — not a single city-wide push — drive efficient OPD growth.",
  },
  {
    n: "04",
    title: "Medical tourism inflow.",
    body: "Mumbai receives significant medical tourism from Africa, the Middle East, and global Indian diaspora. International patient acquisition requires a distinct content and conversion strategy.",
  },
];

export default function MumbaiPage() {
  return (
    <>
      <MumbaiSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Mumbai</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Location · Mumbai"
        title={
          <>
            Mumbai hospitals,
            <br />
            <em className="text-sage italic font-normal">real patient growth.</em>
          </>
        }
        sub="Mumbai's private healthcare market is one of India's most complex — high patient expectations, a multi-lingual catchment, distinct catchment geographies across the suburbs, and a competitive landscape that includes some of the country's most recognised hospital brands."
        meta={[
          { label: "Delivery", value: "Remote + on-site" },
          { label: "Languages", value: "Marathi, Gujarati, Hindi, English" },
          { label: "Specialties", value: "All major" },
          { label: "Hospitals engaged", value: "Pan-India" },
        ]}
      />

      {/* Mumbai context */}
      <section
        aria-labelledby="mumbai-context-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20">
            <div>
              <Eyebrow className="mb-4">The market — 01</Eyebrow>
              <h2
                id="mumbai-context-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                What makes Mumbai&rsquo;s
                <br />
                market unique.
              </h2>
            </div>
            <div className="text-base md:text-[17px] leading-[1.7] text-muted space-y-5 max-w-[720px]">
              <p>
                Mumbai is not one hospital catchment — it is six. Patients in Andheri don't consider hospitals in Chembur. A Borivali family won't commute to Bandra unless the specialist is specifically known to them. Multi-location hospital groups in Mumbai require different campaign strategies for each campus, not a single brand push.
              </p>
              <p>
                The city's patient population is also one of India's most linguistically diverse. A campaign that speaks only to English or Hindi-speaking patients reaches perhaps 40% of the accessible market. Marathi and Gujarati content — especially for community-specific health concerns — unlocks the rest.
              </p>
              <p>
                We run pan-India delivery from Bengaluru with deep campaign experience in Mumbai's private hospital market. Every engagement is calibrated to the specific geography, language mix, and specialty profile of the hospital — not a generic Mumbai template.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* What's different */}
      <section
        aria-labelledby="differentiators-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="mb-12 md:mb-16">
            <Eyebrow className="mb-4">What we calibrate — 02</Eyebrow>
            <h2
              id="differentiators-heading"
              className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
            >
              Four things the Mumbai market
              <br />
              <em className="text-sage italic font-normal">demands you get right.</em>
            </h2>
          </div>
        </Reveal>

        <ul className="border-t border-line">
          {differentiators.map((d, i) => (
            <Reveal as="li" key={d.n} delay={i * 50}>
              <div className="grid md:grid-cols-[60px_1fr_1.6fr] gap-6 md:gap-8 py-7 md:py-9 border-b border-line items-baseline">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{d.n}</span>
                <h3 className="font-serif text-2xl md:text-[28px] leading-[1.05]">{d.title}</h3>
                <p className="text-base leading-[1.6] text-muted max-w-[560px]">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section
        aria-labelledby="services-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-24 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="mb-10 md:mb-12">
            <Eyebrow className="mb-4">Services for Mumbai hospitals — 03</Eyebrow>
            <h2
              id="services-heading"
              className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
            >
              The full channel system,{" "}
              <em className="text-sage italic font-normal">Mumbai-calibrated.</em>
            </h2>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/video", label: "Video as Infrastructure", note: "YouTube · Marathi, Hindi, English" },
              { href: "/seo", label: "Hospital SEO", note: "Mumbai local search domination" },
              { href: "/paid", label: "Performance Marketing", note: "Suburb-specific campaigns" },
              { href: "/social", label: "Social Media", note: "Community trust, specialist visibility" },
              { href: "/email", label: "Email & WhatsApp", note: "Patient retention & reactivation" },
              { href: "/contact", label: "Start a conversation", note: "Free 30-min discovery call" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group block bg-paper border border-line rounded-[16px] p-6 hover:border-ink transition-colors"
                >
                  <div className="font-serif text-xl leading-[1.2] mb-1 group-hover:text-sage transition-colors">
                    {l.label}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{l.note}</div>
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
