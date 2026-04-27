import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQ } from "@/components/marketing/FAQ";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { JourneyExplorer } from "@/components/visuals/interactive/JourneyExplorer";
import { videoFaqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Video as Infrastructure — ${site.name}`,
  description:
    "Turn every major specialty at your hospital into a patient-facing video library in 180 days. Permanent, compound, multi-language — built for Indian multi-specialty hospitals.",
  alternates: { canonical: "/video" },
  openGraph: {
    title: `Video as Infrastructure — ${site.name}`,
    description:
      "A structured video system that moves patients from found you to enquired. Not content. Lead generation infrastructure.",
    url: `${site.url}/video`,
    type: "website",
  },
};

const faq = videoFaqs;

function VideoSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Video as Infrastructure for Hospitals",
    description:
      "Permanent, hospital-owned patient-facing video libraries across every major specialty — organised by procedure and patient-journey stage.",
    serviceType: "Healthcare Video Production",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/video`,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Video as Infrastructure", item: `${site.url}/video` },
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

const stages = [
  {
    n: "01",
    label: "Symptom Awareness",
    body: "A patient notices a symptom and turns to YouTube, Google, and WhatsApp before calling a hospital. Symptom explainers, red-flag guides, and basic condition education earn the first interaction.",
  },
  {
    n: "02",
    label: "Trust Building",
    body: "The patient has decided they need a consult. Now they're choosing where — and with whom. Senior-specialist introductions and HOD profiles convert browsers into callers.",
  },
  {
    n: "03",
    label: "Decision",
    body: "The patient is weighing procedures, treatment paths, or specialist choice. Procedure comparisons, decision aids, and consented patient stories resolve the last mile of doubt.",
  },
  {
    n: "04",
    label: "Post-treatment Care",
    body: "The patient has had treatment. Recovery-arc videos and outcome stories support adherence — and also convert future patients researching your results.",
  },
];

const steps = [
  {
    n: "01",
    title: "Audit",
    body: "Review every video you have today across every specialty. Tag by department, procedure, journey stage, and specialist. The audit shows exactly where each specialty is leaking consults.",
  },
  {
    n: "02",
    title: "Map",
    body: "Plot your library against every specialty's patient decision journey. Identify the exact procedures, moments, and specialists that need content — before a single brief is written.",
  },
  {
    n: "03",
    title: "Produce",
    body: "Shoot with your senior specialists, your OTs, your patients, and your premium capex. One editorial standard across every specialty — 60 to 90 videos in the first 180 days.",
  },
  {
    n: "04",
    title: "Deploy",
    body: "Published across website, Google, YouTube, Practo, WhatsApp nurture, referral networks, and sales platforms. The library compounds every quarter.",
  },
];

export default function VideoPage() {
  return (
    <>
      <VideoSchema />

      <nav aria-label="Breadcrumb" className="px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">Video as Infrastructure</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Service · Flagship"
        title={
          <>
            A video library for every
            <br />
            <em className="text-sage italic font-normal">specialty you run.</em>
          </>
        }
        sub="Turn every major specialty at your hospital into a patient-facing video library, in 180 days. Permanent, compounding, multi-language — built for Indian multi-specialty hospitals."
        meta={[
          { label: "Specialties covered", value: "20" },
          { label: "Rollout timeline", value: "180-day" },
          { label: "Languages", value: "8" },
          { label: "Videos produced", value: "10,000+" },
        ]}
      />

      {/* Four journey stages */}
      <section
        aria-labelledby="stages-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">The framework — 01</Eyebrow>
              <h2
                id="stages-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Four stages.
                <br />
                <em className="text-sage italic font-normal">Every specialty.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Every library we build is organised around the four moments a patient actually goes through — from first symptom search to post-treatment trust. Generic content misses three of them. See how the four-stage system shows up in real engagements on our{" "}
              <Link href="/work" className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors">
                hospital case studies
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <div className="sr-only" aria-hidden="true">
          <ul className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {stages.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 70}>
                <article className="bg-paper border border-line rounded-[20px] p-7 md:p-9 h-full">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-sage mb-4">
                    Stage {s.n} · {s.label}
                  </div>
                  <h3 className="font-serif text-2xl md:text-[28px] leading-[1.1] tracking-[-0.01em] mb-4">
                    {s.label}
                  </h3>
                  <p className="text-base leading-[1.6] text-muted">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey Explorer — interactive */}
      <section
        aria-labelledby="journey-explorer-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-10 md:mb-12 items-end">
            <div>
              <Eyebrow className="mb-4">Explore the journey — 02</Eyebrow>
              <h2
                id="journey-explorer-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Four moments.
                <br />
                <em className="text-sage italic font-normal">What each one needs.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Select a patient-journey moment to see what good looks like, what
              the red flags are, and what video content earns the trust to move
              a patient to the next stage.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <JourneyExplorer />
        </Reveal>
      </section>

      {/* Four-step process */}
      <section
        aria-labelledby="process-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">Process — 02</Eyebrow>
              <h2
                id="process-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Audit. Map.
                <br />
                <em className="text-sage italic font-normal">Produce. Deploy.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Most agencies start with a creative brief. We start with an audit.{" "}
              <span className="sr-only">The four steps below are a precise path — not a proposal. They run in sequence because the sequence is the system.</span>{" "}
              Video pairs naturally with{" "}
              <Link href="/seo" className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors">
                hospital SEO
              </Link>
              {" "}— search and OPD operations are where the videos earn their return.
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 70}>
              <div className="border-t-2 border-ink pt-6 h-full">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3">
                  Step {s.n}
                </div>
                <h3 className="font-serif text-2xl md:text-[28px] leading-[1.1] mb-4">{s.title}</h3>
                <p className="text-base leading-[1.6] text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <FAQ
        items={faq}
        title="What hospital leaders ask about video infrastructure"
        eyebrow="FAQ — 04"
      />

      <AuditCTA />
    </>
  );
}
