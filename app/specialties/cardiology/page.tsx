import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Cardiology Marketing for Hospitals`,
  description:
    "Cardiology service line marketing for Indian hospitals — YouTube explainers, cardiac SEO, paid media for cardiac intent, and specialist positioning for cardiologists and cardiac surgeons.",
  keywords: [
    "cardiology hospital marketing india",
    "cardiac service line marketing",
    "cardiology marketing india",
    "cardiologist marketing india",
    "cardiac hospital patient acquisition",
    "cardiology SEO hospital",
    "hospital cardiac programme growth",
  ],
  alternates: { canonical: "/specialties/cardiology" },
  openGraph: {
    title: `Cardiology Marketing for Hospitals — ${site.name}`,
    description:
      "Grow cardiac OPD volume in India — YouTube positioning, cardiac SEO, high-intent paid media, and specialist visibility for cardiologists.",
    url: `${site.url}/specialties/cardiology`,
    type: "website",
  },
};

function CardiologySchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cardiology Marketing for Hospitals",
    description:
      "Specialist marketing for cardiology departments and cardiac hospitals in India — YouTube, SEO, paid media and specialist positioning.",
    serviceType: "Healthcare Marketing — Cardiology",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/specialties/cardiology`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Specialties", item: `${site.url}/specialties` },
      { "@type": "ListItem", position: 3, name: "Cardiology", item: `${site.url}/specialties/cardiology` },
    ],
  };
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}

const pillars = [
  {
    n: "01",
    title: "Cardiologist visibility",
    body: "The patient choosing between two cardiac centres is often choosing between two cardiologists. A consultant who is known — who has YouTube videos, who appears in search, whose name comes up in Google reviews — wins the referral before the OPD call is made.",
  },
  {
    n: "02",
    title: "Procedure-level SEO",
    body: "Cardiac patients research specific procedures once diagnosed. 'TAVR procedure India cost', 'angioplasty vs bypass surgery', 'best cath lab Bengaluru' — these are high-intent, high-conversion queries. Owning them organically builds a referral channel that compounds.",
  },
  {
    n: "03",
    title: "Emergency + elective separation",
    body: "Cardiac marketing operates across two fundamentally different patient pathways — emergency (immediate referral to nearest capable centre) and elective (planned procedures where the patient chooses). Each requires a different channel mix and a different content strategy.",
  },
  {
    n: "04",
    title: "Post-cardiac care retention",
    body: "The post-MI patient, post-valve replacement patient, or chronic heart failure patient is one of the highest-lifetime-value patient profiles in the hospital. A structured WhatsApp and email lifecycle programme keeps them connected to the cardiac team — reducing readmissions and building long-term loyalty.",
  },
];

export default function CardiologyPage() {
  return (
    <>
      <CardiologySchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/services" className="hover:text-ink transition-colors">Specialties</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Cardiology</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Specialty · Cardiology"
        title={
          <>
            Cardiology is the highest-revenue
            <br />
            <em className="text-sage italic font-normal">service line in most Indian hospitals.</em>
          </>
        }
        sub="It is also the most competitive. Patients researching cardiac care compare cardiologists, cath labs, and success rates before they make a call. The cardiac centre that is most visible, most credible, and most familiar in the patient's research phase wins the referral."
        meta={[
          { label: "Revenue contribution", value: "25–35% (avg hospital)" },
          { label: "Research intensity", value: "High — 6–12 touchpoints" },
          { label: "Key asset", value: "Cardiologist visibility" },
          { label: "Primary KPI", value: "Cost per cardiac OPD" },
        ]}
      />

      {/* Four pillars */}
      <section
        aria-labelledby="cardiology-pillars-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="mb-12 md:mb-16">
            <Eyebrow className="mb-4">The strategy — 01</Eyebrow>
            <h2
              id="cardiology-pillars-heading"
              className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
            >
              Four ways to grow{" "}
              <em className="text-sage italic font-normal">cardiac OPD.</em>
            </h2>
          </div>
        </Reveal>

        <ul className="border-t border-line">
          {pillars.map((p, i) => (
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

      {/* Channel links */}
      <section
        aria-labelledby="cardio-channels-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-24 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="mb-10 md:mb-12">
            <Eyebrow className="mb-4">Build the programme — 02</Eyebrow>
            <h2
              id="cardio-channels-heading"
              className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
            >
              Every channel,{" "}
              <em className="text-sage italic font-normal">cardiac-calibrated.</em>
            </h2>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/video", label: "YouTube — Cardiac Explainers", note: "Cardiologist visibility · procedure videos" },
              { href: "/seo", label: "Cardiac SEO", note: "Rank for procedure and specialist queries" },
              { href: "/paid", label: "Paid Media", note: "High-intent cardiac search capture" },
              { href: "/social", label: "Social Media", note: "Cardiologist trust · awareness content" },
              { href: "/email", label: "Post-Cardiac Lifecycle", note: "WhatsApp follow-up · retention" },
              { href: "/contact", label: "Start a conversation", note: "Free 30-min discovery call" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group block bg-surface border border-line rounded-[16px] p-6 hover:border-ink transition-colors"
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
