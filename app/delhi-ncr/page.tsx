import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Hospital Marketing Agency in Delhi NCR`,
  description:
    "Hospital marketing for Delhi NCR hospitals — SEO, YouTube, paid media and WhatsApp designed for the capital's competitive private healthcare market and medical tourism inflows.",
  keywords: [
    "hospital marketing agency delhi",
    "healthcare marketing agency delhi ncr",
    "hospital digital marketing delhi",
    "hospital SEO delhi ncr",
    "medical marketing agency delhi",
    "hospital patient acquisition delhi",
    "healthcare marketing gurgaon noida",
  ],
  alternates: { canonical: "/delhi-ncr" },
  openGraph: {
    title: `Hospital Marketing Agency in Delhi NCR — ${site.name}`,
    description:
      "Hospital-only marketing for Delhi NCR's high-competition private healthcare market. OPD-accountable across YouTube, SEO, paid and WhatsApp.",
    url: `${site.url}/delhi-ncr`,
    type: "website",
  },
};

function DelhiSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hospital Marketing Agency — Delhi NCR",
    description:
      "Hospital-only marketing services for multi-specialty and single-specialty hospitals in Delhi NCR — SEO, YouTube, paid media, social media, and patient lifecycle communication.",
    serviceType: "Healthcare Marketing",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Delhi NCR",
      addressCountry: "IN",
    },
    url: `${site.url}/delhi-ncr`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Delhi NCR", item: `${site.url}/delhi-ncr` },
    ],
  };
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}

const ncr_factors = [
  {
    n: "01",
    title: "The AIIMS benchmark effect.",
    body: "Patients in Delhi NCR have AIIMS as their mental reference point. Private hospital marketing must work harder to justify cost and choice — clinical credibility signals are non-negotiable in every piece of communication.",
  },
  {
    n: "02",
    title: "NCR is four cities, not one.",
    body: "Gurgaon, Noida, Faridabad, and Ghaziabad each have distinct patient populations, catchment dynamics, and hospital choices. A city-wide campaign wastes budget on the wrong geographies.",
  },
  {
    n: "03",
    title: "Medical tourism gateway.",
    body: "Delhi NCR is India's primary medical tourism entry point — particularly from South Asia, the Middle East, and Africa. International patient acquisition requires English, Arabic, and Bangla content strategies alongside domestic Hindi.",
  },
  {
    n: "04",
    title: "High-competition specialties.",
    body: "Cardiology, neurosciences, orthopaedics, and oncology are deeply competitive in Delhi NCR. Medanta, Max, Fortis, Apollo, and BLK compete aggressively for the same high-value patient segments.",
  },
];

export default function DelhiNcrPage() {
  return (
    <>
      <DelhiSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Delhi NCR</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Location · Delhi NCR"
        title={
          <>
            Delhi NCR hospitals,
            <br />
            <em className="text-sage italic font-normal">accountable growth.</em>
          </>
        }
        sub="Delhi NCR is India's most complex private healthcare market — four distinct sub-regions, the AIIMS benchmark setting patient expectations, a major medical tourism corridor, and some of the country's largest hospital groups competing for the same specialties."
        meta={[
          { label: "Region", value: "Delhi, Gurgaon, Noida, NCR" },
          { label: "Languages", value: "Hindi, English, Arabic, Bangla" },
          { label: "Key specialties", value: "Cardiac, Neuro, Onco, Ortho" },
          { label: "Delivery", value: "Remote + on-site" },
        ]}
      />

      {/* Delhi context */}
      <section
        aria-labelledby="delhi-context-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20">
            <div>
              <Eyebrow className="mb-4">The market — 01</Eyebrow>
              <h2
                id="delhi-context-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                The capital&rsquo;s
                <br />
                unique challenge.
              </h2>
            </div>
            <div className="text-base md:text-[17px] leading-[1.7] text-muted space-y-5 max-w-[720px]">
              <p>
                No other Indian hospital market has AIIMS as a competitor. Delhi NCR private hospitals are not just competing with each other — they are competing with a public institution that sets the benchmark for clinical excellence in the patient's mind. Marketing in this environment must lead with clinical credibility, not price or convenience.
              </p>
              <p>
                The NCR sprawl also means the geography is fragmented. A Gurgaon family will not consider a hospital in Noida. Faridabad and Ghaziabad have their own growing private hospital ecosystems that are still building digital presence. Each sub-region has distinct competitive dynamics.
              </p>
              <p>
                Add to this Delhi NCR's role as India's primary international patient gateway — particularly from Afghanistan, Bangladesh, East Africa, and the Indian diaspora — and you have a market that requires the most sophisticated multi-audience, multi-language marketing system of any Indian city.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Four factors */}
      <section
        aria-labelledby="factors-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="mb-12 md:mb-16">
            <Eyebrow className="mb-4">What shapes strategy — 02</Eyebrow>
            <h2
              id="factors-heading"
              className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
            >
              Four realities that define{" "}
              <em className="text-sage italic font-normal">Delhi NCR marketing.</em>
            </h2>
          </div>
        </Reveal>

        <ul className="border-t border-line">
          {ncr_factors.map((f, i) => (
            <Reveal as="li" key={f.n} delay={i * 50}>
              <div className="grid md:grid-cols-[60px_1fr_1.6fr] gap-6 md:gap-8 py-7 md:py-9 border-b border-line items-baseline">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{f.n}</span>
                <h3 className="font-serif text-2xl md:text-[28px] leading-[1.05]">{f.title}</h3>
                <p className="text-base leading-[1.6] text-muted max-w-[560px]">{f.body}</p>
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
            <Eyebrow className="mb-4">Services for Delhi NCR — 03</Eyebrow>
            <h2
              id="services-heading"
              className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
            >
              The full system,{" "}
              <em className="text-sage italic font-normal">NCR-tuned.</em>
            </h2>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/video", label: "Video as Infrastructure", note: "YouTube · Hindi, English, Arabic" },
              { href: "/seo", label: "Hospital SEO", note: "Delhi NCR local dominance" },
              { href: "/paid", label: "Performance Marketing", note: "Sub-region targeted campaigns" },
              { href: "/social", label: "Social Media", note: "Specialist credibility, multi-language" },
              { href: "/email", label: "Email & WhatsApp", note: "Patient retention & international nurture" },
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
