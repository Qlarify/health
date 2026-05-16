import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Hospital Marketing Glossary — 24 Terms Explained`,
  description:
    "24 hospital marketing terms every Indian CMO should know — OPD, cost-per-appointment, YMYL, E-E-A-T, video as infrastructure, patient decision journey, and more. Plain definitions, no jargon.",
  keywords: [
    "hospital marketing glossary",
    "healthcare marketing terms india",
    "OPD meaning hospital",
    "cost per appointment hospital",
    "hospital SEO terms",
    "YMYL healthcare",
    "patient acquisition cost hospital",
    "healthcare digital marketing terms",
  ],
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: `Hospital Marketing Glossary — ${site.name}`,
    description:
      "24 plain-English definitions of hospital marketing terms — from OPD to E-E-A-T to video as infrastructure.",
    url: `${site.url}/glossary`,
    type: "website",
  },
};

const terms = [
  {
    id: "hospital-marketing",
    term: "Hospital Marketing",
    definition:
      "The discipline of generating, nurturing, and converting patient enquiries for a hospital or clinic — from the moment a patient first searches a symptom to the moment they book, attend, and return. Hospital marketing differs from generic marketing in that every channel, message, and metric must be calibrated to the YMYL (Your Money or Your Life) nature of healthcare decisions, the regulatory constraints of India's ASCI and NMC guidelines, and the multi-specialist structure of most Indian hospital groups.",
  },
  {
    id: "opd",
    term: "OPD",
    definition:
      "Out-Patient Department. The front door of a hospital for most patients — consultation-based visits that do not require admission. OPD volume is the primary metric for hospital growth in India: more OPD consultations compound directly into investigations, procedures, electives, and inpatient admissions. The OPD is also the marketing-to-revenue conversion point — the moment a lead becomes a patient.",
  },
  {
    id: "opd-footfall",
    term: "OPD Footfall",
    definition:
      "The number of unique patients who physically attend the Out-Patient Department in a given period. Often used interchangeably with 'OPD volume'. Footfall is the real-world output of the entire marketing system — the number that proves whether digital campaigns, SEO, video, and WhatsApp are working. A hospital can have high web traffic and high enquiry volume and still have low footfall if call-centre conversion or appointment fulfilment is broken.",
  },
  {
    id: "patient-acquisition-cost",
    term: "Patient Acquisition Cost (PAC)",
    definition:
      "The total marketing and sales spend required to bring one new patient to an OPD consultation. Calculated as total marketing spend ÷ number of new patients acquired in the same period. PAC varies significantly by specialty (cardiac and oncology are higher; general OPD is lower), by channel (paid media is immediately measurable; SEO and video compound over time), and by hospital tier. The benchmark metric: meaningful hospital digital marketing begins to show positive unit economics when PAC falls below the average first-consultation revenue per specialty.",
  },
  {
    id: "cost-per-appointment",
    term: "Cost Per Appointment (CPA)",
    definition:
      "The marketing spend attributed to each confirmed OPD appointment booked. Distinct from Patient Acquisition Cost in that CPA can be tracked at the campaign level — specific ads, keywords, or content pieces — making it the primary performance KPI for paid media campaigns. At Qlarify Health, cost per confirmed OPD appointment is the contracted KPI for every engagement: an accountability measure that connects spend directly to the business outcome that matters.",
  },
  {
    id: "hospital-seo",
    term: "Hospital SEO",
    definition:
      "Search engine optimisation applied to hospital websites and content — structured to match the specific way patients search for healthcare. Hospital SEO differs from generic SEO in three material ways: the queries are high-intent ('best cardiologist Indiranagar', 'chest pain causes serious'), the pages are YMYL (attracting stricter Google quality signals), and the local dimension (proximity, trust, reviews) compounds into multi-location strategy. Well-executed hospital SEO is the only zero-marginal-cost patient acquisition channel — each additional patient costs nothing once rankings are established.",
  },
  {
    id: "local-seo",
    term: "Local SEO",
    definition:
      "Optimisation for searches with geographic intent — 'hospital near me', 'cardiologist Koramangala', 'IVF clinic Bangalore'. For Indian hospitals, Local SEO is primarily driven by Google Business Profile optimisation, review velocity, citation consistency across health directories (Practo, JustDial, Sulekha), and location-specific landing pages. Multi-location hospital groups need a separate Local SEO strategy for each campus: shared national rankings do not substitute for location-specific visibility.",
  },
  {
    id: "google-business-profile",
    term: "Google Business Profile (GBP)",
    definition:
      "The free Google listing that appears in map pack results and the knowledge panel when a patient searches for a hospital or specialist by location. For Indian hospitals, GBP is often the single highest-traffic digital asset — more patients call from GBP than from the hospital website. Key optimisation levers: review count and recency, specialties and services listed, appointment link, Q&A moderation, and photo freshness. A hospital with a stale or unclaimed GBP is leaking enquiries to competitors every day.",
  },
  {
    id: "video-as-infrastructure",
    term: "Video as Infrastructure",
    definition:
      "Qlarify Health's framework for treating hospital video production as a permanent, compounding asset rather than a one-off campaign. A doctor-led explainer published in 2026 still earns enquiries in 2029. Video as Infrastructure means building a YouTube channel as a search engine — sequencing content across the four patient journey stages (symptom awareness, trust building, decision, post-treatment) and optimising each video for discoverability and conversion. Unlike paid ads, which stop delivering when spend stops, well-produced video compounds without ongoing cost.",
  },
  {
    id: "patient-decision-journey",
    term: "Patient Decision Journey",
    definition:
      "The non-linear sequence of moments a patient moves through from first symptom awareness to booking a consultation, attending, and returning. Unlike a traditional marketing funnel, the patient journey is recursive, emotionally complex, and often interrupted — a patient may research for weeks, pause, talk to family, and restart. The four stages mapped by Qlarify Health: (1) symptom search, (2) trust building, (3) decision and booking, (4) post-treatment and retention. Each stage requires different content, different channels, and different conversion metrics.",
  },
  {
    id: "symptom-explainer",
    term: "Symptom Explainer",
    definition:
      "A piece of content — video, article, or FAQ — that explains a medical symptom in plain language for a patient who is not yet thinking about hospitals, only about themselves. Symptom explainers are the top-of-funnel asset in hospital content marketing, capturing search intent at the earliest and most abundant stage of the patient journey. They must be clinically accurate (YMYL stakes), non-alarming (ethical responsibility), and subtly brand-attributed without being promotional.",
  },
  {
    id: "doctor-profile",
    term: "Doctor Profile",
    definition:
      "A structured digital presence — video, text biography, FAQ content, and social posts — built around a named specialist to make them recognisable and approachable before the patient's first call. Doctor profiles reduce the hesitation that precedes booking: a patient who has watched a cardiologist explain a procedure on YouTube three times has already begun building trust. In high-stakes specialties (cardiac, oncology, neurosciences), the consultant's name is often the deciding factor in hospital choice.",
  },
  {
    id: "medical-animation",
    term: "Medical Animation",
    definition:
      "Animated video content that explains procedures, anatomy, or treatment processes in a way that live video cannot — useful for visualising laparoscopic surgery, robotic procedures, or chemotherapy mechanisms. Medical animations increase patient understanding, reduce anxiety, and reduce the number of consultation minutes spent on basic explanation. For marketing, they serve the trust-building stage of the patient journey and perform well on YouTube and in pre-consultation WhatsApp sequences.",
  },
  {
    id: "ymyl",
    term: "YMYL (Your Money or Your Life)",
    definition:
      "Google's classification for content that could significantly affect a person's health, financial stability, or safety. Hospital and healthcare content is the canonical YMYL category. YMYL pages are evaluated against a stricter standard of E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Practical implications for hospital marketers: every page must be authored or reviewed by a credentialled clinician, sources must be cited, and claims must be conservative. A hospital website that publishes medically inaccurate content risks both ranking penalties and regulatory exposure.",
  },
  {
    id: "eeat",
    term: "E-E-A-T",
    definition:
      "Experience, Expertise, Authoritativeness, Trustworthiness — the four dimensions Google's quality raters use to evaluate YMYL content. For hospital websites: Experience means demonstrating real clinical and patient cases. Expertise means named, credentialled authors. Authoritativeness means being cited by other trusted health sources. Trustworthiness means transparent authorship, accurate claims, accessible contact details, and an HTTPS-secure website. Hospitals with strong E-E-A-T signals consistently outrank larger competitors on high-intent queries.",
  },
  {
    id: "schema-markup",
    term: "Schema Markup",
    definition:
      "Structured data added to webpage HTML that helps search engines understand content and enables rich results — star ratings, FAQs, event listings, breadcrumbs, and knowledge panel entries. For hospital websites, the most important schema types are: Organization, MedicalClinic, Physician, FAQPage, BreadcrumbList, and BlogPosting. Schema does not directly improve rankings but increases click-through rates from search results and improves AI engine citation probability (important for AEO/GEO targeting).",
  },
  {
    id: "faqpage-schema",
    term: "FAQPage Schema",
    definition:
      "A specific schema type that marks up question-and-answer content so Google can display it as a rich result directly in search — expanding to show the answer without a click. For hospital marketing, FAQPage schema on service pages and blog posts captures voice search queries, increases zero-click brand impressions, and anchors hospital content in AI-generated search summaries. A well-structured FAQ schema on a 'What does an IVF cycle cost in Bangalore?' question can put the hospital's answer in front of the searcher without a click.",
  },
  {
    id: "performance-marketing",
    term: "Performance Marketing",
    definition:
      "Paid digital advertising — Google Search Ads, Google Display, Meta Ads — where spend is optimised against a measurable conversion event, typically a form submission, phone call, or appointment booking. For hospitals, performance marketing is a demand-capture channel: it captures patients who are already searching for care, not creates new demand. Performance marketing without a functioning SEO and content programme becomes progressively more expensive as competitors bid for the same keywords. The hospital that owns organic rankings does not need to pay for the traffic it already earns.",
  },
  {
    id: "crm-marketing",
    term: "CRM Marketing",
    definition:
      "Communication with a known patient database — existing patients who have previously visited — using email, WhatsApp, or SMS to drive re-engagement, follow-up appointments, and preventive care visits. CRM marketing is the most capital-efficient patient acquisition channel for Indian hospitals: retaining an existing patient costs five to seven times less than acquiring a new one. Most Indian hospitals have thousands of patient records that are used once, at discharge, and then never activated.",
  },
  {
    id: "whatsapp-business-api",
    term: "WhatsApp Business API",
    definition:
      "The enterprise tier of WhatsApp that enables hospitals to send templated, automated messages at scale — appointment reminders, discharge summaries, recovery check-ins, re-engagement campaigns — through an approved Business Service Provider (BSP). Requires explicit patient opt-in under DPDP Act 2023. WhatsApp open rates in India run at 60–80%, significantly outperforming email. The WhatsApp Business API (distinct from the free WhatsApp Business app) is necessary for automation and CRM integration at hospital scale.",
  },
  {
    id: "specialist-positioning",
    term: "Specialist Positioning",
    definition:
      "The marketing strategy of building a named specialist's visibility, credibility, and approachability in the patient's mind before the first inquiry — through video, social content, speaking appearances, and editorial coverage. Specialist positioning matters most in high-stakes specialties (cardiac surgery, neurosurgery, oncology, fertility) where the patient's choice of hospital is often a proxy for their choice of individual consultant. A hospital with well-positioned specialists wins patients who specifically seek those consultants by name.",
  },
  {
    id: "call-centre-conversion",
    term: "Call Centre Conversion",
    definition:
      "The percentage of inbound patient enquiry calls that result in a confirmed OPD appointment. Call-centre conversion is the most consistently broken link in Indian hospital marketing: hospitals spend heavily on digital campaigns, rank well on Google, and receive high inbound call volume — and then lose 30–50% of those calls to poor handling, long hold times, or inability to book an appointment on the first call. Improving call-centre conversion from 40% to 65% typically yields more OPD growth than doubling the marketing budget.",
  },
  {
    id: "patient-retention-rate",
    term: "Patient Retention Rate",
    definition:
      "The percentage of patients who return to the same hospital for a subsequent visit — for follow-up care, a different specialty, or a family referral. Patient retention is a proxy for satisfaction and trust. High retention reduces the marginal cost of each subsequent patient acquisition, because a returning patient costs nothing to acquire. For most Indian hospitals, the post-treatment communication strategy — or absence of it — is the single biggest determinant of retention. Hospitals that communicate nothing after discharge lose patients to any competitor who remembers to follow up.",
  },
  {
    id: "multi-specialty-hospital",
    term: "Multi-Specialty Hospital",
    definition:
      "A hospital that houses multiple clinical departments — typically cardiology, orthopaedics, oncology, neurosciences, gastroenterology, women's health, and paediatrics, among others — under one roof, enabling patients with complex or overlapping conditions to receive coordinated care. For marketing, multi-specialty hospitals require a service-line approach: each specialty has its own patient journey, its own search behaviour, its own trust-building requirements, and its own competitive landscape. A single hospital-wide marketing strategy rarely serves each service line effectively.",
  },
];

function GlossarySchema() {
  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Hospital Marketing Glossary",
    description:
      "24 hospital marketing terms defined for Indian healthcare CMOs, marketers, and operators — from OPD to E-E-A-T to video as infrastructure.",
    url: `${site.url}/glossary`,
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      url: `${site.url}/glossary#${t.id}`,
      inDefinedTermSet: `${site.url}/glossary`,
    })),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Glossary",
        item: `${site.url}/glossary`,
      },
    ],
  };
  return (
    <>
      <JsonLd data={definedTermSet} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}

export default function GlossaryPage() {
  return (
    <>
      <GlossarySchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li>
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Glossary</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Glossary · hospital marketing terms"
        title={
          <>
            24 terms.
            <br />
            <em className="text-sage italic font-normal">Plain definitions.</em>
          </>
        }
        sub="The language of hospital marketing in India — from OPD to E-E-A-T to video as infrastructure. Each term defined for the CMO, the hospital operator, and the marketing manager who needs to brief an agency without being misled."
        meta={[
          { label: "Terms defined", value: "24" },
          { label: "Updated", value: "2026" },
          { label: "Focus", value: "India" },
        ]}
      />

      <section
        aria-labelledby="glossary-heading"
        className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-24 md:pb-32 border-t border-line"
      >
        <h2 id="glossary-heading" className="sr-only">
          Glossary of hospital marketing terms
        </h2>

        {/* Quick-jump index */}
        <Reveal>
          <nav aria-label="Jump to term" className="mb-12 md:mb-16">
            <Eyebrow className="mb-4">Jump to</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {terms.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="inline-block font-mono text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 border border-line rounded-full text-muted hover:text-ink hover:border-ink transition-colors"
                >
                  {t.term}
                </a>
              ))}
            </div>
          </nav>
        </Reveal>

        {/* Term definitions */}
        <dl className="border-t border-line">
          {terms.map((t, i) => (
            <Reveal as="div" key={t.id} delay={Math.min(i * 30, 180)}>
              <div
                id={t.id}
                className="grid md:grid-cols-[260px_1fr] gap-4 md:gap-12 py-8 md:py-10 border-b border-line scroll-mt-24"
              >
                <dt className="font-serif text-2xl md:text-[28px] leading-[1.1] tracking-[-0.01em]">
                  {t.term}
                </dt>
                <dd className="text-base md:text-[17px] leading-[1.7] text-muted">
                  {t.definition}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Related links */}
      <section
        aria-labelledby="related-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-24 pb-24 md:pb-32 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 mb-12 items-end">
            <div>
              <Eyebrow className="mb-4">Go deeper</Eyebrow>
              <h2
                id="related-heading"
                className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
              >
                Put the terms{" "}
                <em className="text-sage italic font-normal">to work.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Each service page goes deeper on the practice behind the term — with
              benchmarks, channel strategy, and the questions to ask before hiring
              an agency.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { href: "/video", label: "Video as Infrastructure", note: "YouTube channel strategy" },
              { href: "/seo", label: "Hospital SEO", note: "Organic patient acquisition" },
              { href: "/paid", label: "Performance Marketing", note: "Google & Meta for hospitals" },
              { href: "/social", label: "Social Media", note: "Specialist visibility" },
              { href: "/email", label: "CRM & WhatsApp", note: "Patient lifecycle" },
              { href: "/insights", label: "Insights", note: "Field notes from hospital marketing" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group block bg-paper border border-line rounded-[16px] p-6 hover:border-ink transition-colors"
                >
                  <div className="font-serif text-xl leading-[1.2] mb-1 group-hover:text-sage transition-colors">
                    {l.label}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {l.note}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
