import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/PageHero";
import { ServiceVisual } from "@/components/marketing/ServiceVisual";
import { FAQ } from "@/components/marketing/FAQ";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, servicesIndex, servicesFaq, type Service } from "@/content/services";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = servicesIndex[slug];
  if (!s) return {};
  const title = `${s.title} — ${site.name}`;
  const description = s.lede;
  return {
    title,
    description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/services/${s.slug}`,
      type: "article",
    },
  };
}

function ServiceDetailSchema({ s }: { s: Service }) {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.lede,
    serviceType: s.title,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    url: `${site.url}/services/${s.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.title} deliverables`,
      itemListElement: s.deliverables.map((d, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${site.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: s.title,
        item: `${site.url}/services/${s.slug}`,
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faq} />
    </>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = servicesIndex[slug];
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === s.slug);
  const next = services[(idx + 1) % services.length];
  const prev = services[(idx - 1 + services.length) % services.length];

  return (
    <>
      <ServiceDetailSchema s={s} />

      <nav
        aria-label="Breadcrumb"
        className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10"
      >
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li>
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/services" className="hover:text-ink transition-colors">
              Services
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{s.title}</li>
        </ol>
      </nav>

      <PageHero
        eyebrow={`Practice ${s.n} of 06 · ${s.stage}`}
        title={s.title}
        sub={s.lede}
        meta={[
          { label: "Stage", value: s.n },
          { label: s.proof.label, value: s.proof.metric },
          { label: "Hospitals", value: "40+" },
          { label: "Compounding for", value: "11 yrs" },
        ]}
      />

      <section
        aria-labelledby="philosophy-heading"
        className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
          <Reveal>
            <div>
              <Eyebrow className="mb-5">Our take</Eyebrow>
              <blockquote
                id="philosophy-heading"
                className="font-serif italic text-3xl md:text-5xl leading-[1.15] tracking-[-0.01em] text-sage max-w-[820px]"
              >
                &ldquo;{s.philosophy}&rdquo;
              </blockquote>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-line rounded-[20px] p-6 md:p-8 bg-paper">
              <ServiceVisual kind={s.visual} />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="deliverables-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 mb-12 md:mb-16">
            <div>
              <Eyebrow className="mb-4">Deliverables</Eyebrow>
              <h2
                id="deliverables-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                What we ship.
              </h2>
            </div>
            <p className="self-end text-lg leading-[1.55] text-muted max-w-[540px]">
              Every engagement is scoped before kickoff. The list below is the
              standard menu — the actual scope is what you and we agree on.
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-[12px] overflow-hidden">
          {s.deliverables.map((d, i) => (
            <Reveal as="li" key={d} delay={i * 40}>
              <div className="bg-paper p-6 md:p-8 h-full">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-sage mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-serif text-2xl md:text-[26px] leading-[1.15]">
                  {d}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="proof-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-ink text-paper"
      >
        <Reveal>
          <div className="max-w-[1100px]">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.14em] mb-8"
              style={{ color: "#9BA89F" }}
            >
              Proof
            </div>
            <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-end">
              <div
                id="proof-heading"
                className="font-serif text-7xl md:text-[160px] leading-[0.9] tracking-[-0.03em]"
                style={{ color: "#A8C0B4" }}
              >
                {s.proof.metric}
              </div>
              <div>
                <p className="font-serif text-2xl md:text-4xl leading-[1.15] mb-3">
                  {s.proof.label}
                </p>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "#9BA89F" }}
                >
                  {s.proof.sub}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        aria-label={`Other practices besides ${s.title}`}
        className="px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-16 md:pb-20 border-t border-line"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <Link
            href={`/services/${prev.slug}`}
            className="group block border border-line rounded-[12px] p-6 md:p-8 hover:border-ink transition-colors duration-300 bg-paper"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4">
              ← Previous practice · {prev.n}
            </div>
            <div className="font-serif text-3xl md:text-4xl leading-[1.05] group-hover:text-sage transition-colors duration-300">
              {prev.title}
            </div>
          </Link>
          <Link
            href={`/services/${next.slug}`}
            className="group block border border-line rounded-[12px] p-6 md:p-8 hover:border-ink transition-colors duration-300 bg-paper text-right"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4">
              Next practice · {next.n} →
            </div>
            <div className="font-serif text-3xl md:text-4xl leading-[1.05] group-hover:text-sage transition-colors duration-300">
              {next.title}
            </div>
          </Link>
        </div>
      </section>

      <FAQ
        items={servicesFaq}
        title="Common questions"
        eyebrow="Engagement details"
      />

      <AuditCTA />
    </>
  );
}
