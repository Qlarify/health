import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Hospital Marketing Agency in Bengaluru`,
  description:
    "Qlarify Health is Bengaluru's hospital-only marketing agency — SEO, YouTube, paid media and WhatsApp for multi-specialty hospitals across the city. OPD-accountable, India-built.",
  keywords: [
    "hospital marketing agency bengaluru",
    "healthcare marketing agency bangalore",
    "hospital digital marketing bengaluru",
    "hospital SEO bangalore",
    "medical marketing agency bangalore",
    "hospital patient acquisition bengaluru",
    "healthcare marketing company bangalore india",
  ],
  alternates: { canonical: "/bengaluru" },
  openGraph: {
    title: `Hospital Marketing Agency in Bengaluru — ${site.name}`,
    description:
      "Bengaluru's hospital-only marketing agency. SEO, video, paid and WhatsApp — accountable to cost per OPD appointment.",
    url: `${site.url}/bengaluru`,
    type: "website",
  },
};

function BengaluruSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hospital Marketing Agency — Bengaluru",
    description:
      "Hospital-only marketing services for multi-specialty and single-specialty hospitals in Bengaluru — SEO, YouTube, paid media, social media, and patient lifecycle communication.",
    serviceType: "Healthcare Marketing",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: {
      "@type": "City",
      name: "Bengaluru",
      addressCountry: "IN",
    },
    url: `${site.url}/bengaluru`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Bengaluru", item: `${site.url}/bengaluru` },
    ],
  };
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}

const specialties = [
  { n: "01", title: "Cardiac Sciences", body: "Bengaluru's cardiac market is dominated by a handful of established centres. Specialist positioning — named cardiologists, explainer content, cath lab visibility — is the primary differentiator." },
  { n: "02", title: "Fertility & IVF", body: "Bengaluru has one of India's most competitive fertility markets — patients have real choice, and trust signals determine who they call. Emotional-journey content, transparent pricing, and doctor trust are the growth levers." },
  { n: "03", title: "Orthopaedics & Joints", body: "A high-volume market with strong robotic surgery demand. Patients research extensively — the hospital that owns the SEO and YouTube landscape wins the consultation." },
  { n: "04", title: "Neurosciences", body: "Bengaluru's technology-literate population researches conditions deeply. Clinical-depth content — procedure walkthroughs and specialist explainers — consistently outperforms generic awareness content here." },
  { n: "05", title: "Women's & Paediatric Care", body: "Cloudnine, Rainbow, and several multi-specialty campuses compete for the same patient segment. Doctor visibility and community trust are the competitive edge." },
  { n: "06", title: "Oncology", body: "Second-opinion seeking is high in Bengaluru. A cancer centre that communicates clinical depth and accessible second-opinion pathways captures patients who don't find them first." },
];

export default function BengaluruPage() {
  return (
    <>
      <BengaluruSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Bengaluru</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Location · Bengaluru"
        title={
          <>
            Hospital marketing,
            <br />
            <em className="text-sage italic font-normal">Bengaluru-built.</em>
          </>
        }
        sub="We're headquartered on Bannerghatta Road. Bengaluru's hospital market is the most competitive in South India — we know the landscape, the patient demographics, and the specialties that matter most to patients in this city."
        meta={[
          { label: "HQ", value: "Bengaluru" },
          { label: "Languages", value: "Kannada, Telugu, Tamil, Hindi, English" },
          { label: "Coverage", value: "Pan-India" },
          { label: "Hospitals engaged", value: "17+" },
        ]}
      />

      {/* Market overview */}
      <section
        aria-labelledby="market-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20">
            <div>
              <Eyebrow className="mb-4">The market — 01</Eyebrow>
              <h2
                id="market-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Why Bengaluru is different.
              </h2>
            </div>
            <div className="text-base md:text-[17px] leading-[1.7] text-muted space-y-5 max-w-[720px]">
              <p>
                Bengaluru's private hospital market has more choices per patient than almost any other Indian city. Within any major Bengaluru neighbourhood, patients have multiple NABH-accredited multi-specialty hospitals to choose from — and dozens more specialist centres.
              </p>
              <p>
                The patient here is also different. Bengaluru's technology workforce researches before they call. They compare hospitals on YouTube before they pick up the phone. They read Google reviews before they book. A hospital that isn't visible in the moments before the search query doesn't get the call.
              </p>
              <p>
                We work across the spectrum — large multi-specialty campuses managing 10+ specialties, high-volume single-specialty centres, and growing day-care surgical units. The operating model is the same for each: map the patient's actual journey, build the channel system that matches it, and measure every rupee against confirmed OPD appointments.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Specialties */}
      <section
        aria-labelledby="specialties-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="mb-12 md:mb-16">
            <Eyebrow className="mb-4">Bengaluru specialties — 02</Eyebrow>
            <h2
              id="specialties-heading"
              className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
            >
              Six growth areas{" "}
              <em className="text-sage italic font-normal">we know well.</em>
            </h2>
          </div>
        </Reveal>

        <ul className="border-t border-line">
          {specialties.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 50}>
              <div className="grid md:grid-cols-[60px_1fr_1.6fr] gap-6 md:gap-8 py-7 md:py-9 border-b border-line items-baseline">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{s.n}</span>
                <h3 className="font-serif text-2xl md:text-[32px] leading-[1.05]">{s.title}</h3>
                <p className="text-base leading-[1.6] text-muted max-w-[560px]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section
        aria-labelledby="services-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">What we do — 03</Eyebrow>
              <h2
                id="services-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Six channels.{" "}
                <em className="text-sage italic font-normal">One journey.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Every channel we run in Bengaluru is calibrated to the city&rsquo;s patient behaviour — the languages they search in, the platforms they use to research, and the trust signals that move them from awareness to appointment.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/video", label: "Video as Infrastructure", note: "YouTube channel · permanent asset" },
              { href: "/seo", label: "Hospital SEO", note: "Rank for Bengaluru searches" },
              { href: "/paid", label: "Performance Marketing", note: "Google & Meta · local campaigns" },
              { href: "/social", label: "Social Media", note: "Specialist visibility · Kannada + English" },
              { href: "/email", label: "Email & WhatsApp", note: "Patient lifecycle · return bookings" },
              { href: "/services", label: "All Services", note: "Full service overview" },
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
