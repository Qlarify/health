import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { ServiceVisual } from "@/components/marketing/ServiceVisual";
import { FAQ } from "@/components/marketing/FAQ";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  KnowledgeBlock,
  KnowledgeBlocks,
} from "@/components/marketing/KnowledgeBlock";
import { ChannelGrid } from "@/components/visuals/ChannelGrid";
import { BenchmarkBars } from "@/components/visuals/BenchmarkBars";
import { services, servicesFaq } from "@/content/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Services · Six practices, one patient journey — ${site.name}`,
  description:
    "Six healthcare-marketing practices — YouTube, social, SEO, performance, content, lifecycle — each mapped to a moment in the patient journey. Built to compound, not to vanish at the end of a campaign cycle.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services — ${site.name}`,
    description:
      "Six practices mapped to one patient journey. Built for hospitals, only hospitals.",
    url: `${site.url}/services`,
    type: "website",
  },
};

const journeyStages = [
  {
    n: "01",
    t: "Symptom Awareness",
    q: "Is this serious?",
    d: "This is where demand is created. The patient has symptoms and is searching for answers — not hospitals. The job is to be present with education at the exact moment they realise something might be wrong.",
    assets: [
      "Symptom explainers",
      "Early warning signs",
      "Condition basics",
      "YouTube Shorts",
      "Health-literacy articles",
    ],
  },
  {
    n: "02",
    t: "Trust Building",
    q: "Which doctor should I go to?",
    d: "This is where preference is formed. The patient knows they need care — now they are deciding who to trust. Doctor introductions, clinical proof and facility credibility are what move this stage.",
    assets: [
      "Doctor introductions",
      "Hospital capability videos",
      "Team credibility reels",
      "Procedure walkthroughs",
      "Patient stories",
    ],
  },
  {
    n: "03",
    t: "Decision",
    q: "Do I need surgery or not?",
    d: "This is where conversion happens. The patient is comparing treatment options and ready to commit. The content that wins here removes the last piece of doubt before they book.",
    assets: [
      "Procedure comparisons",
      "Treatment pathway explanations",
      "Patient journeys",
      "Click-to-call",
      "Pre-consult prep",
    ],
  },
  {
    n: "04",
    t: "Post-Op Care & Recovery",
    q: "What should I expect after surgery?",
    d: "This is where retention and amplification happen. The patient is post-treatment and needs guidance, reassurance and continuity — and is most likely to become an advocate if looked after well.",
    assets: [
      "Recovery timelines",
      "Rehabilitation guidance",
      "Patient testimonials",
      "WhatsApp follow-ups",
      "Annual check nudges",
    ],
  },
] as const;

function ServicesIndexSchema() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Healthcare marketing practices",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/services/${s.slug}`,
      name: s.title,
    })),
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
  const channelGridImageObject = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: "Channel × Patient Journey Matrix — Qlarify Health",
    description:
      "A grid showing which of Qlarify's five hospital marketing channels — YouTube, Social, SEO, Paid, and Email & WhatsApp — takes a primary or supporting role at each of the four patient-journey moments: Symptom Awareness, Trust Building, Decision, and Post-Op Care & Recovery.",
    contentUrl: `${site.url}/services#channel-grid`,
    encodingFormat: "text/html",
    representativeOfPage: false,
  };
  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd data={faq} />
      <JsonLd data={channelGridImageObject} />
    </>
  );
}

export default function ServicesPage() {
  return (
    <>
      <ServicesIndexSchema />

      <PageHero
        eyebrow="Services · all six practices"
        title={
          <>
            Six practices.
            <br />
            <em className="text-sage italic font-normal">
              One patient journey.
            </em>
          </>
        }
        sub="Each service maps to a patient moment — symptom awareness, trust building, decision, post-op recovery. Built to compound, not to vanish at the end of a campaign cycle."
        meta={[
          { label: "Practices", value: "06" },
          { label: "Hospitals served", value: "40+" },
          { label: "Cities", value: "14" },
          { label: "Years compounding", value: "11" },
        ]}
      />

      <div className="sr-only" aria-hidden="true">
        <KnowledgeBlocks
          eyebrow="The short answer"
          title={
            <>
              Healthcare marketing,{" "}
              <em className="text-sage italic font-normal">
                not generalist marketing.
              </em>
            </>
          }
        >
          <KnowledgeBlock
            id="how-different-from-agency"
            eyebrow="How we&rsquo;re different"
            question="How is Qlarify Health different from a generic healthcare marketing agency?"
            answer={
              <>
                Qlarify Health is a hospital-only digital health platform — not a
                generalist agency that also takes hospital briefs. Every brief is
                reviewed for clinical accuracy and NMC awareness, and every channel is mapped to one of the four
                moments in the patient journey. We are accountable for OPD
                enquiries that convert, not impressions that disappear.
              </>
            }
          />
          <KnowledgeBlock
            id="what-services-cover"
            eyebrow="What we cover"
            question="What does Qlarify Health do for hospitals?"
            answer={
              <>
                Six connected practices — YouTube, social, hospital SEO,
                performance marketing, content, and email &amp; WhatsApp —
                orchestrated as one system for predictable patient acquisition
                and OPD growth. Each practice is mapped to a specific moment in
                the patient journey, so depth compounds instead of vanishing at
                the end of a campaign cycle.
              </>
            }
          />
        </KnowledgeBlocks>
      </div>

      {/* Channel × Journey matrix */}
      <section
        aria-labelledby="channel-grid-heading"
        className="px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-16 md:pb-20 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-10 md:mb-12 items-end">
            <div>
              <Eyebrow className="mb-4">Channel mapping — 02</Eyebrow>
              <h2
                id="channel-grid-heading"
                className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
              >
                Which channel owns{" "}
                <em className="text-sage italic font-normal">which moment.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Every channel has a primary role in the patient journey — and a
              supporting role in the stages it amplifies but doesn&rsquo;t own.{" "}
              <span className="sr-only">No single channel covers everything; all six are needed to serve every moment.</span>
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ChannelGrid
            caption="Primary = the channel owns this patient-journey stage. Supporting = it amplifies the primary. No mark = limited contribution at this moment."
          />
        </Reveal>
      </section>

      {/* Benchmark data section */}
      <section
        aria-labelledby="benchmarks-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-10 md:mb-14 items-end">
            <div>
              <Eyebrow className="mb-4">Benchmarks — 03</Eyebrow>
              <h2
                id="benchmarks-heading"
                className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
              >
                Typical hospital.
                <br />
                <em className="text-sage italic font-normal">
                  Best-in-class.
                </em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Numbers drawn from twelve hospital engagements between 2019 and
              2024. Not promises — ranges. Specialty mix and catchment density
              move them by up to 30% in either direction.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="max-w-[760px]">
            <BenchmarkBars />
          </div>
        </Reveal>
      </section>

      {services.map((s, i) => (
        <section
          key={s.slug}
          aria-labelledby={`service-${s.slug}-heading`}
          className={[
            "px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line",
            i % 2 === 0 ? "bg-surface" : "bg-paper",
          ].join(" ")}
        >
          <Reveal>
            <div className="grid md:grid-cols-[0.4fr_1.6fr] gap-8 md:gap-20 mb-12 md:mb-16">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4">
                  {s.n} / 06
                </div>
                {s.flagship && (
                  <div className="inline-block font-mono text-[9px] uppercase tracking-[0.1em] font-medium px-2 py-1 rounded-full bg-sage text-paper mb-3">
                    Flagship
                  </div>
                )}
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-sage">
                  {s.stage}
                </div>
              </div>
              <div>
                <h2
                  id={`service-${s.slug}-heading`}
                  className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1] tracking-[-0.02em] mb-5 md:mb-6"
                >
                  {s.title}
                </h2>
                <p className="text-lg md:text-[21px] leading-[1.5] text-muted max-w-[720px]">
                  {s.lede}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <Reveal delay={80}>
              <div>
                <Eyebrow className="mb-5">Deliverables</Eyebrow>
                <ul className="border-t border-line">
                  {s.deliverables.map((d, j) => (
                    <li
                      key={d}
                      className="grid grid-cols-[32px_1fr] items-center gap-4 py-3.5 border-b border-line"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base">{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href={`/services/${s.slug}`}
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink border-b border-ink pb-1 hover:text-sage hover:border-sage transition-colors duration-300"
                  >
                    Read the full {s.title.toLowerCase()} brief →
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div>
                <div
                  className={[
                    "border border-line rounded-[20px] p-6 md:p-8 mb-6",
                    i % 2 === 0 ? "bg-paper" : "bg-surface",
                  ].join(" ")}
                >
                  <ServiceVisual kind={s.visual} />
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-6 py-6 border-y border-line mb-6">
                  <div className="font-serif text-5xl md:text-6xl leading-[1] text-sage">
                    {s.proof.metric}
                  </div>
                  <div>
                    <div className="text-[15px] leading-[1.4] mb-1">
                      {s.proof.label}
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                      {s.proof.sub}
                    </div>
                  </div>
                </div>
                <blockquote className="font-serif italic text-xl md:text-[22px] leading-[1.35] max-w-[480px]">
                  &ldquo;{s.philosophy}&rdquo;
                </blockquote>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section
        aria-labelledby="journey-heading"
        className="px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-28 md:pb-36 bg-ink text-paper border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-16 md:mb-20">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist-2 mb-4">
                The patient journey
              </div>
              <h2
                id="journey-heading"
                className="font-serif text-5xl md:text-7xl leading-[1] tracking-[-0.02em]"
              >
                Four stages.
                <br />
                <em
                  className="italic font-normal"
                  style={{ color: "#A8C0B4" }}
                >
                  Mapped to assets.
                </em>
              </h2>
            </div>
            <p
              className="self-end text-lg leading-[1.55] max-w-[540px]"
              style={{ color: "#D8DDD8" }}
            >
              Every video, every page, every ad we make is tied to one of these
              four moments. A piece of content that doesn&apos;t map to a stage
              doesn&apos;t get built.
            </p>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
          {journeyStages.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80}>
              <div
                className="pt-6 h-full"
                style={{ borderTop: "1px solid #2C3A35" }}
              >
                <div
                  className="font-mono text-[11px] uppercase tracking-[0.1em] mb-3.5"
                  style={{ color: "#7A8A82" }}
                >
                  {s.n}
                </div>
                <h3 className="font-serif text-3xl leading-[1.1] mb-3">
                  {s.t}
                </h3>
                <p
                  className="font-serif italic text-[17px] mb-4"
                  style={{ color: "#A8C0B4" }}
                >
                  &ldquo;{s.q}&rdquo;
                </p>
                <p
                  className="text-sm leading-[1.55] mb-6"
                  style={{ color: "#C9D2C8" }}
                >
                  {s.d}
                </p>
                <div className="sr-only" aria-hidden="true">
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.1em] mb-3"
                    style={{ color: "#7A8A82" }}
                  >
                    Assets we build
                  </div>
                  <ul>
                    {s.assets.map((a) => (
                      <li
                        key={a}
                        className="text-[13px] py-1.5"
                        style={{ borderBottom: "1px solid #2C3A35" }}
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <FAQ
        items={servicesFaq}
        title="Common questions about how we work"
        eyebrow="Questions"
      />

      <AuditCTA />
    </>
  );
}
