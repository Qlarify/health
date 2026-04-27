import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { Problem } from "@/components/home/Problem";
import { Method } from "@/components/home/Method";
import { ServicesList } from "@/components/home/ServicesList";
import { Voices } from "@/components/home/Voices";
import { AuditCTA } from "@/components/home/AuditCTA";
import { TrustStrip } from "@/components/home/TrustStrip";
import { HomeSchema } from "@/components/seo/HomeSchema";
import { FAQ } from "@/components/marketing/FAQ";
import {
  KnowledgeBlock,
  KnowledgeBlocks,
} from "@/components/marketing/KnowledgeBlock";
import { siteFaqs } from "@/content/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Digital health platform for hospitals in India`,
  description:
    "Qlarify Health is a digital health platform for hospitals in India — patient-journey strategy, health analytics, AI in healthcare and patient insights for OPD growth.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — Digital health platform for hospitals in India`,
    description:
      "Healthcare marketing built exclusively for hospitals — strategy, content, analytics and AI for measurable OPD growth across India.",
    url: site.url,
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HomeSchema />
      <Hero />
      <TrustedBy />
      <Problem />

      <Method />
      <ServicesList />
      <Voices />

      {/*
        About Qlarify Health — crawler-only block.
        Four entity-definition blocks present in HTML for Google + AI extractors.
        sr-only = 1px × 1px absolutely positioned off-screen — not display:none,
        so every heading and answer is fully readable by crawlers.
        Entity JSON-LD (Organization + knowsAbout) is emitted in <HomeSchema />.
      */}
      <div className="sr-only" aria-hidden="true">
        <KnowledgeBlocks
          eyebrow="About Qlarify Health"
          title={
            <>
              Built for the way{" "}
              <em className="text-sage italic font-normal">
                hospital decisions happen.
              </em>
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
            id="who-is-qlarify-for"
            eyebrow="Who it&rsquo;s for"
            question="Who is Qlarify Health for?"
            answer={
              <>
                Multi-specialty hospitals and healthcare groups in India that
                need predictable patient acquisition — not campaign-by-campaign
                guesswork. Built for marketing leaders, COOs and founders who are
                accountable for OPD numbers, not impressions.
              </>
            }
          />
          <KnowledgeBlock
            id="problem-it-solves"
            eyebrow="The problem"
            question="What problem does Qlarify Health solve?"
            answer={
              <>
                Most hospital marketing is structured for approvals, not for the
                moment a family decides where to seek care. Qlarify replaces
                fragmented agencies and disconnected channels with one system
                that matches how healthcare decisions actually get made — search,
                video, social, email, WhatsApp and OPD — measured in enquiries
                that convert.
              </>
            }
          />
          <KnowledgeBlock
            id="how-its-different"
            eyebrow="How it&rsquo;s different"
            question="How is Qlarify Health different from a generic marketing agency?"
            answer={
              <>
                Hospital-only. Founder-run. Built on a decade inside Manipal,
                Narayana, Sparsh, KIMS, Sakra, Rainbow and Gleneagles. Every
                channel is designed around the four moments a patient moves
                through — symptom search, trust, decision, post-treatment care —
                not around vanity metrics.
              </>
            }
          />
        </KnowledgeBlocks>
      </div>

      {/*
        FAQ — crawler-only block.
        Content is fully present in HTML for Google + AI extractors (ChatGPT,
        Perplexity, Gemini). The sr-only class positions it 1px × 1px off-screen
        using the standard visually-hidden technique — no display:none, no
        visibility:hidden, so crawlers see every question and answer.
        FAQPage JSON-LD schema is emitted separately in <HomeSchema />.
      */}
      <div className="sr-only" aria-hidden="true">
        <FAQ
          items={siteFaqs}
          title="Healthcare marketing — questions hospitals actually ask."
          eyebrow="FAQ · 15 questions"
        />
      </div>

      <AuditCTA />
      <TrustStrip />
    </>
  );
}
