import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { VideoCarousel } from "@/components/ui/VideoCarousel";
import { getAllCaseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Work · hospital patient-journey case studies — ${site.name}`,
  description:
    "YouTube patient-journey case studies, each mapped across the four stages — symptom awareness, trust building, decision, and post-treatment care — for the Bangalore hospital it ran on.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Work — ${site.name}`,
    description:
      "Ten patient journeys built on hospital YouTube channels. Awareness → Trust → Decision → Post-treatment.",
    url: `${site.url}/work`,
    type: "website",
  },
};

export default async function WorkPage() {
  const all = await getAllCaseStudies();
  const studies = all.filter((s) => s.videos && s.videos.length === 4);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hospital YouTube patient-journey case studies",
    itemListElement: studies.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/work#${s.slug}`,
      name: `${s.client} — ${s.clientType.split(",")[0].trim()}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />

      <PageHero
        eyebrow="Work · patient-journey case studies"
        title={
          <>
            Patient journeys.
            <br />
            <em className="text-sage italic font-normal">Four stages each.</em>
          </>
        }
        sub="Each block below is one hospital, one specialty, one YouTube channel — mapped across the four stages a patient actually researches: symptom awareness, trust building, decision, and post-treatment care."
        meta={[
          { label: "Case studies", value: String(studies.length) },
          { label: "Hospitals", value: "17" },
          { label: "Stages each", value: "4" },
        ]}
      />

      <section
        aria-labelledby="cases-heading"
        className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 border-t border-line"
      >
        <h2 id="cases-heading" className="sr-only">
          Patient-journey case studies
        </h2>

        {studies.length === 0 ? (
          <p className="text-muted text-base py-12">
            Case studies publishing soon. In the meantime, the{" "}
            <Link href="/services" className="underline underline-offset-4">
              services overview
            </Link>{" "}
            includes outcome metrics for each practice.
          </p>
        ) : (
          <ol className="grid gap-20 md:gap-28 pb-24 md:pb-28">
            {studies.map((s, i) => {
              const specialty = s.clientType.split(",")[0].trim();
              return (
                <Reveal as="li" key={s.slug} delay={i === 0 ? 0 : 60}>
                  <article
                    id={s.slug}
                    aria-labelledby={`case-${s.slug}-title`}
                    className="scroll-mt-24"
                  >
                    <header className="mb-8 md:mb-10 max-w-[860px]">
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-sage mb-4">
                        Case {String(i + 1).padStart(2, "0")} · {s.city}
                      </div>
                      <h2
                        id={`case-${s.slug}-title`}
                        className="font-serif text-3xl md:text-5xl leading-[1.04] tracking-[-0.02em]"
                      >
                        {s.client}
                        <span className="block text-sage italic font-normal text-2xl md:text-4xl mt-2">
                          {specialty}
                        </span>
                      </h2>
                    </header>

                    {s.videos && s.videos.length > 0 && (
                      <VideoCarousel videos={s.videos} brand={s.client} />
                    )}
                  </article>
                </Reveal>
              );
            })}
          </ol>
        )}
      </section>

      <AuditCTA />
    </>
  );
}
