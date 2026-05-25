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

// Catchment-level intelligence — what most Bangalore agencies treat as a
// single "Bengaluru" market is actually six distinct sub-markets with
// different patient profiles, language preference and competitive density.
const catchments = [
  {
    n: "01",
    zone: "Bannerghatta Road · South Bengaluru",
    profile: "Tech corridor meets traditional South Bengaluru households. Patients in the 30–55 band research deeply on YouTube and Practo; older patients lean on family-doctor referrals. Kannada and English both matter on landing pages.",
    competition: "Apollo, Fortis, Sagar, Jayadeva (cardiac), Narayana — high density.",
    play: "Specialty-led SEO + Kannada YouTube + Google Business Profile reviews. Paid search converts well on procedure queries; awareness ads underperform.",
  },
  {
    n: "02",
    zone: "Whitefield · Marathahalli · Sarjapur",
    profile: "Largely IT workforce, 28–45, high English literacy. Patients book through HR-tier insurance networks (Star, Niva Bupa) and prioritise convenience — same-day OPD slots, online consult availability, cashless approval speed.",
    competition: "Manipal Whitefield, Vydehi, Sakra, Aster Whitefield, Columbia Asia.",
    play: "Performance marketing with insurance-cashless messaging, English social content, and Google Maps optimisation for the 5 km catchment.",
  },
  {
    n: "03",
    zone: "Hebbal · Yelahanka · North Bengaluru",
    profile: "Mixed catchment — established families plus new IT migration. Patients drive longer for tertiary care but want local OPD convenience. Telugu and Hindi spike with the airport corridor migration.",
    competition: "Aster CMI, Columbia Asia Hebbal, Manipal Yelahanka, Cytecare (oncology).",
    play: "Multi-language paid search (English + Telugu + Hindi), specialist YouTube, and locality-specific landing pages.",
  },
  {
    n: "04",
    zone: "Koramangala · Indiranagar · CBD",
    profile: "High-income, English-first, very digital. Patients vet hospitals on Google reviews, Practo ratings and Instagram presence before calling. Premium-care expectations across cosmetology, IVF, gastro and orthopaedics.",
    competition: "Manipal, Sakra, Mallya, Apollo Cradle, plus dozens of premium specialty centres.",
    play: "Reputation management and review velocity matter more here than ad spend. Premium-positioned doctor branding outperforms hospital branding.",
  },
  {
    n: "05",
    zone: "Jayanagar · JP Nagar · Banashankari",
    profile: "Traditional South Bengaluru, multi-generational households. Kannada-first content lifts trust significantly. Patients research with family before deciding; second-opinion behaviour is common, especially for oncology and cardiac.",
    competition: "Apollo Jayanagar, Fortis, Sagar Hospitals, BGS Gleneagles, Sparsh.",
    play: "Kannada YouTube, family-decision content, and Google Business Profile optimisation in Kannada. WhatsApp lifecycle messages should default to Kannada with English opt-in.",
  },
  {
    n: "06",
    zone: "Old Airport Road · HAL · Domlur",
    profile: "Mature affluent catchment with strong existing hospital relationships. Patient acquisition is slower; the bigger lever is retention and referral activation.",
    competition: "Manipal Old Airport Road, Sakra, Hosmat, Cloudnine.",
    play: "Lifecycle marketing (WhatsApp + email), NPS-to-review pipeline, and patient-ambassador programmes outperform paid acquisition.",
  },
];

// Operating-model differentiators — concrete capabilities that Bengaluru
// hospital marketing agencies routinely either ignore or under-build.
const differentiators = [
  {
    n: "01",
    title: "Call tracking that ties ads to OPD bookings",
    body: "Most agencies report cost-per-click and form-fills. We deploy dynamic number insertion (CallRail / Servetel / Knowlarity) so every inbound call is tagged to the campaign, ad group, and landing page that drove it — then matched back to the HMS to confirm whether the call became an OPD. The reporting layer hospital CFOs actually want.",
  },
  {
    n: "02",
    title: "NMC, ASCI and DPDP compliance built into the brief",
    body: "Most healthcare campaigns in Bengaluru breach at least one of these — usually outcome claims, before/after imagery, or undisclosed paid testimonials. We run a pre-publish compliance check on every ad, video and landing page against the NMC Professional Conduct Regulations 2023, ASCI healthcare code, and DPDP Act 2023 consent standards.",
  },
  {
    n: "03",
    title: "Clinical review on every patient-facing word",
    body: "Generalist agencies repurpose wellness-blog templates. We run a structured clinical review workflow — every script, every article, every condition page is signed off by a relevant specialist (with name and review date in the schema) before it goes live. Google E-E-A-T reads this; so do patients.",
  },
  {
    n: "04",
    title: "Multi-campus coordination, not just multi-location SEO",
    body: "For hospital groups with 2+ campuses in Bengaluru, the failure mode isn't local SEO — it's brand cannibalisation, duplicate Google Business Profiles, and inconsistent specialty positioning across campuses. We build one editorial standard, campus-aware landing-page structure, and a content calendar that respects each campus's specialty mix.",
  },
  {
    n: "05",
    title: "Call-centre conversion alongside ad spend",
    body: "Most agencies deliver a lead and walk away. The biggest single lever in hospital OPD growth is the call-centre's conversion rate — the gap between a 30% and a 60% call-to-OPD conversion is bigger than any ad-spend increase. We coach call centres, build script-based intake flows, and report on the conversion side of the funnel as well as the acquisition side.",
  },
  {
    n: "06",
    title: "WhatsApp Business API with proper consent architecture",
    body: "Most hospitals run WhatsApp on the free Business App and break at scale. We set up the full Business API stack (Interakt / Wati / Gupshup), build DPDP-compliant double opt-in flows, design lifecycle journeys for re-engagement and follow-up — and connect every send back to the HMS so the appointment loop is closed.",
  },
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

      {/* Bengaluru catchment intelligence — six sub-markets */}
      <section
        aria-labelledby="catchments-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">Catchment intelligence — 04</Eyebrow>
              <h2
                id="catchments-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Bengaluru is not one market.{" "}
                <em className="text-sage italic font-normal">It&rsquo;s six.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Most Bengaluru hospital marketing agencies treat the city as a single catchment. The reality is six distinct sub-markets — each with different patient income bands, language preference, insurance behaviour, competitive density and digital research habits. We build a separate playbook for each.
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
          {catchments.map((c, i) => (
            <Reveal as="li" key={c.n} delay={i * 50}>
              <article className="bg-surface border border-line rounded-[20px] p-7 md:p-9 h-full">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-sage">Catchment {c.n}</span>
                </div>
                <h3 className="font-serif text-2xl md:text-[26px] leading-[1.15] mb-5">{c.zone}</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted mb-1">Patient profile</dt>
                    <dd className="text-[14px] leading-[1.6] text-ink">{c.profile}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted mb-1">Competitive density</dt>
                    <dd className="text-[14px] leading-[1.6] text-muted">{c.competition}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted mb-1">What works</dt>
                    <dd className="text-[14px] leading-[1.6] text-ink">{c.play}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* What we own that most agencies don't */}
      <section
        aria-labelledby="differentiators-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">Operating model — 05</Eyebrow>
              <h2
                id="differentiators-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                What we own that most Bengaluru agencies{" "}
                <em className="text-sage italic font-normal">don&rsquo;t.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Bengaluru has dozens of digital marketing agencies that take hospital briefs. Most stop at SEO, paid media and social. The six capabilities below are the ones that separate a hospital marketing engagement from a generalist agency engagement — and the ones that decide whether ad spend converts to OPD footfall.
            </p>
          </div>
        </Reveal>

        <ul className="border-t border-line">
          {differentiators.map((d, i) => (
            <Reveal as="li" key={d.n} delay={i * 40}>
              <div className="grid md:grid-cols-[60px_1fr_1.6fr] gap-6 md:gap-10 py-7 md:py-9 border-b border-line items-baseline">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{d.n}</span>
                <h3 className="font-serif text-xl md:text-[26px] leading-[1.15]">{d.title}</h3>
                <p className="text-[15px] leading-[1.65] text-muted max-w-[620px]">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <AuditCTA />
    </>
  );
}
