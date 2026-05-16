import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Specialty Hospital Marketing — IVF, Cardiology, Oncology`,
  description:
    "Specialty-specific hospital marketing in India — IVF & fertility, cardiology, and oncology. Each patient journey is different. Each marketing strategy should be too.",
  keywords: [
    "specialty hospital marketing india",
    "IVF marketing india",
    "cardiology hospital marketing",
    "oncology marketing india",
    "hospital specialty marketing services",
  ],
  alternates: { canonical: "/specialties" },
  openGraph: {
    title: `Specialty Hospital Marketing — ${site.name}`,
    description:
      "IVF, cardiology, and oncology marketing — each calibrated to the specific patient journey and competitive dynamics of that specialty in India.",
    url: `${site.url}/specialties`,
    type: "website",
  },
};

const specialties = [
  {
    href: "/specialties/ivf",
    label: "IVF & Fertility",
    sub: "3–18 month research journey · multi-cycle patients · emotional trust signals",
    n: "01",
  },
  {
    href: "/specialties/cardiology",
    label: "Cardiology",
    sub: "Highest-revenue service line · cardiologist visibility · elective + emergency",
    n: "02",
  },
  {
    href: "/specialties/oncology",
    label: "Oncology",
    sub: "Ethical framework · second-opinion pathways · survivorship retention",
    n: "03",
  },
];

function SpecialtiesSchema() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Specialties", item: `${site.url}/specialties` },
    ],
  };
  return <JsonLd data={breadcrumbs} />;
}

export default function SpecialtiesPage() {
  return (
    <>
      <SpecialtiesSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Specialties</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Specialties · service line marketing"
        title={
          <>
            Each specialty.
            <br />
            <em className="text-sage italic font-normal">Its own patient journey.</em>
          </>
        }
        sub="A patient researching IVF and a patient researching cardiac surgery are in completely different emotional states, searching different queries, and making decisions on different timescales. Specialty-specific marketing matches the strategy to the journey."
      />

      <section
        aria-labelledby="specialties-list-heading"
        className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-24 md:pb-32 border-t border-line"
      >
        <h2 id="specialties-list-heading" className="sr-only">Specialty pages</h2>

        <ul className="border-t border-line">
          {specialties.map((s, i) => (
            <Reveal as="li" key={s.href} delay={i * 60}>
              <Link
                href={s.href}
                className="group grid md:grid-cols-[60px_1fr_1.6fr_120px] gap-6 md:gap-8 py-8 md:py-10 border-b border-line items-center hover:bg-surface transition-colors px-0 -mx-0"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{s.n}</span>
                <h2 className="font-serif text-3xl md:text-[42px] leading-[1.05] group-hover:text-sage transition-colors">
                  {s.label}
                </h2>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-muted hidden sm:block">{s.sub}</p>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-sage hidden md:block text-right">
                  Explore →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="more-specialties-heading"
        className="px-6 md:px-12 lg:px-20 pt-12 pb-24 md:pb-32 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-center">
            <div>
              <Eyebrow className="mb-4">Other specialties</Eyebrow>
              <h2
                id="more-specialties-heading"
                className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]"
              >
                Don&rsquo;t see your
                specialty listed?
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-base md:text-[17px] leading-[1.7] text-muted">
                We work across all major hospital specialties — orthopaedics, neurosciences, women&rsquo;s health, paediatrics, gastroenterology, and more. Every engagement starts with a discovery call to understand the specific patient journey, competitive landscape, and growth goals for your specialty.
              </p>
              <Link
                href="/contact"
                className="inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
              >
                Book a discovery call →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <AuditCTA />
    </>
  );
}
