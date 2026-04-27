import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  KnowledgeBlock,
  KnowledgeBlocks,
} from "@/components/marketing/KnowledgeBlock";
import { ApprovalsVsDecisions } from "@/components/visuals/ApprovalsVsDecisions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description:
    "Qlarify Health — a digital health platform built to match how healthcare decisions actually get made. Health analytics, AI in healthcare, and patient insights for hospitals.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description:
      "A different model for hospital marketing — built on patient journey, clinical depth, health analytics and AI.",
    url: `${site.url}/about`,
    type: "website",
  },
};

const FOUNDER = "Zeeshan Soudagar";

const differentiators = [
  {
    n: "01",
    title: "Patient journey at the core.",
    body: "Every channel — search, video, paid, social, email, WhatsApp — is designed around the four moments a patient actually moves through, from symptom search to post-treatment care.",
  },
  {
    n: "02",
    title: "Clinical-grade communication.",
    body: "Briefs are reviewed for clinical accuracy and NMC awareness. Hospital content cannot be optimised the way a shoe-store landing page is.",
  },
  {
    n: "03",
    title: "Data, decoded.",
    body: "Health analytics and AI in healthcare turn anonymised intent signals into real patient insights — a clear picture of how families decide.",
  },
  {
    n: "04",
    title: "Outcomes, not outputs.",
    body: "We are accountable for OPD enquiries that convert, not impressions that disappear.",
  },
  {
    n: "05",
    title: "Independent. Founder-run. Hospital-only.",
    body: "One discipline, on purpose — so the depth compounds with every engagement.",
  },
] as const;

function AboutSchema() {
  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${site.name}`,
    url: `${site.url}/about`,
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      foundingDate: String(site.founded),
      url: site.url,
      founder: { "@type": "Person", name: FOUNDER },
      parentOrganization: {
        "@type": "Organization",
        name: site.parent.name,
        foundingDate: String(site.parent.founded),
        description: site.parent.description,
      },
    },
  };
  return <JsonLd data={aboutPage} />;
}

export default function AboutPage() {
  return (
    <>
      <AboutSchema />

      <PageHero
        eyebrow="About · Qlarify Health"
        title={
          <>
            A different model for{" "}
            <em className="text-sage italic font-normal">hospital growth.</em>
          </>
        }
        sub="Qlarify Health is a digital health platform built to match how healthcare decisions actually get made — combining patient-journey strategy, health analytics, AI in healthcare and patient insights into one accountable system."
        meta={[
          { label: "Founded", value: "2026" },
          { label: "Lineage", value: "Digitinize Creative · est. 2014" },
          { label: "Origin", value: "10 yrs in hospitals" },
          { label: "HQ", value: "Bengaluru" },
        ]}
      />

      {/*
        Quick definition — crawler-only block.
        Two entity-definition KnowledgeBlocks present in HTML for Google + AI
        extractors. sr-only = 1px × 1px absolutely positioned off-screen.
        Not display:none — every heading and answer is fully readable by crawlers.
      */}
      <div className="sr-only" aria-hidden="true">
        <KnowledgeBlocks
          eyebrow="Quick definition"
          title={
            <>
              Qlarify Health, in{" "}
              <em className="text-sage italic font-normal">one paragraph.</em>
            </>
          }
        >
          <KnowledgeBlock
            id="what-is-qlarify-health"
            eyebrow="What is Qlarify Health?"
            question="What is Qlarify Health?"
            answer={
              <>
                Qlarify Health is a digital health platform built for hospitals
                in India. It combines patient-journey strategy, health analytics,
                AI in healthcare and patient insights into one accountable system
                that turns clinical depth into measurable OPD growth.
              </>
            }
          />
          <KnowledgeBlock
            id="who-its-for"
            eyebrow="Who it&rsquo;s for"
            question="Who is Qlarify Health for?"
            answer={
              <>
                Multi-specialty and single-specialty hospitals across India that
                want predictable patient acquisition — not campaign-by-campaign
                guesswork. Built for marketing leaders, COOs and founders
                accountable for OPD numbers, not impressions.
              </>
            }
          />
        </KnowledgeBlocks>
      </div>

      <section
        aria-labelledby="story-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20">
            <div>
              <Eyebrow className="mb-4">Our story — 01</Eyebrow>
              <h2
                id="story-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                A decade-long question,{" "}
                <em className="text-sage italic font-normal">
                  finally answered.
                </em>
              </h2>
            </div>
            <div className="text-lg md:text-[19px] leading-[1.65] max-w-[720px] space-y-6">
              <p>
                The company began in 2026. The work behind it began ten years
                earlier — with <strong>{FOUNDER}</strong> inside seven of
                India&rsquo;s largest hospital groups, watching the same pattern
                repeat in every one, and refusing to let go of a single
                stubborn question.
              </p>
              <p className="text-muted">
                Ten years inside seven of India&rsquo;s largest private hospital
                groups — Manipal, Narayana Health, Sparsh, KIMS, Sakra World,
                Rainbow, Gleneagles. Different cities. Different specialties.
                Different scale. The same pattern in every one of them — quiet
                enough that no one called it a crisis, persistent enough that
                no one could ignore it.
              </p>
              <p className="text-muted">
                Talented marketing teams. Real budgets. Campaigns that launched
                with energy, spiked for a week, and quietly disappeared. OPD
                numbers that didn&rsquo;t move. Patient acquisition that felt
                random. And the same unresolved question after every review:
                why does a patient choose one hospital over another — and what
                would it actually take to change that?
              </p>
              <p className="sr-only text-muted" aria-hidden="true">
                No one had a confident answer. The teams weren&rsquo;t failing.
                The effort was real. The model they were working inside was
                the problem.
              </p>
              <p className="text-muted">
                Healthcare decisions aren&rsquo;t made in a funnel. They&rsquo;re
                made in hesitation, late at night, in half-whispered
                conversations with people you trust, shaped by content you
                stumble across when no one is watching.
              </p>
              <p className="text-muted">
                Most hospital marketing isn&rsquo;t built for that moment. It is
                structured for approvals — not for the anxious family member
                sitting with a diagnosis they don&rsquo;t yet understand.
                Optimised for outputs: posts published, ads served. Not for
                the moment a patient finally decides,{" "}
                <em className="text-sage italic font-serif">
                  &ldquo;I trust this place.&rdquo;
                </em>
              </p>
              <p className="text-muted">
                After ten years of watching this repeat, we stopped trying to
                fix campaigns one at a time. We started asking a different
                question: what would it look like to build a system that
                actually matches how healthcare decisions get made? Patient
                journey at the centre. Communication with clinical depth.
                Channels that work together, not alongside each other. Growth
                measured in outcomes, not activity.
              </p>
              <p>
                That system is what Qlarify Health is being built to deliver.
                Not another campaign. Not another agency. A different model —
                one that healthcare has needed for a long time.
              </p>
              <p>
                Qlarify Health is the healthcare-only practice of{" "}
                <strong>Digitinize Creative</strong> — a digital marketing
                studio in its second decade, established in 2014. The studio&rsquo;s
                ten-plus years of operating depth in performance, content,
                brand systems and platform engineering is the infrastructure
                that lets Qlarify operate as a digital health platform from
                day one — not a year-three startup still figuring out its
                operating model.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        aria-labelledby="mission-heading"
        className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-12 md:pb-16 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20">
            <div>
              <Eyebrow className="mb-4">Mission — 02</Eyebrow>
              <h2
                id="mission-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Turn clinical depth into{" "}
                <em className="text-sage italic font-normal">patient trust.</em>
              </h2>
            </div>
            <p className="text-lg md:text-[19px] leading-[1.65] max-w-[720px] text-muted">
              To be the digital health platform that turns clinical depth into
              patient trust — combining health analytics, AI in healthcare and
              patient insights to make hospital growth predictable,
              accountable and human.
            </p>
          </div>
        </Reveal>
      </section>

      <section
        aria-labelledby="vision-heading"
        className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-24 md:pb-32 border-b border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20">
            <div>
              <Eyebrow className="mb-4">Vision — 03</Eyebrow>
              <h2
                id="vision-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Match the way real{" "}
                <em className="text-sage italic font-normal">
                  decisions get made.
                </em>
              </h2>
            </div>
            <p className="text-lg md:text-[19px] leading-[1.65] max-w-[720px] text-muted">
              A world where every hospital can match the way real healthcare
              decisions get made — replacing campaign-by-campaign guesswork
              with a system that listens, learns and earns the patient&rsquo;s
              trust at the exact moment they need it.
            </p>
          </div>
        </Reveal>
      </section>

      <section
        aria-labelledby="different-heading"
        className="px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-24 md:pb-36 bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">What makes us different — 04</Eyebrow>
              <h2
                id="different-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Five lines that{" "}
                <em className="text-sage italic font-normal">
                  shape every engagement.
                </em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.55] text-muted max-w-[520px]">
              Not a values poster. The operating principles that decide what
              gets built, what gets refused and how growth is measured.
            </p>
          </div>
        </Reveal>

        <ul className="border-t border-line">
          {differentiators.map((d, i) => (
            <Reveal as="li" key={d.n} delay={i * 50}>
              <div className="grid md:grid-cols-[60px_1fr_1.6fr] gap-6 md:gap-8 py-7 md:py-9 border-b border-line items-baseline">
                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  {d.n}
                </div>
                <h3 className="font-serif text-2xl md:text-[38px] leading-[1.05]">
                  {d.title}
                </h3>
                <p className="text-base leading-[1.55] text-muted max-w-[560px]">
                  {d.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Approvals vs Decisions */}
      <section
        aria-labelledby="avd-heading"
        className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-24 md:pb-32 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-10 md:mb-14 items-end">
            <div>
              <Eyebrow className="mb-4">The gap — 05</Eyebrow>
              <h2
                id="avd-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Two very different{" "}
                <em className="text-sage italic font-normal">operating systems.</em>
              </h2>
            </div>
            <p className="sr-only text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]" aria-hidden="true">
              Hospital marketing is typically structured for internal alignment.
              Healthcare decisions are made in private, anxious, late-night
              moments. The gap between the two columns below is where most
              marketing budgets disappear.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ApprovalsVsDecisions />
        </Reveal>
      </section>

      <AuditCTA />
    </>
  );
}
