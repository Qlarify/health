import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { AuditCTA } from "@/components/home/AuditCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Healthcare Content Studio — Content, Social & Video Infrastructure`,
  description:
    "One studio for content, social, and video — built as infrastructure, not a campaign. A 12-month engine across seven pillars for hospital chains and 300+ bed units.",
  keywords: [
    "healthcare content studio india",
    "hospital content marketing agency",
    "hospital social media agency",
    "video infrastructure hospitals",
    "doctor content marketing",
    "patient stories video",
    "ceo ghostwriting hospital",
    "healthcare seo content",
  ],
  alternates: { canonical: "/content-studio" },
  openGraph: {
    title: `Healthcare Content Studio — ${site.name}`,
    description:
      "Content + social + video as one editorial engine. Seven pillars, one brief, twelve months. Built for hospital chains and 300+ bed units.",
    url: `${site.url}/content-studio`,
    type: "website",
  },
};

function ContentStudioSchema() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Healthcare Content Studio",
    description:
      "A 12-month content engine across seven editorial pillars — written content, social, and standing video infrastructure — for hospital chains and 300+ bed single units.",
    serviceType: "Healthcare Content Marketing",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/content-studio`,
    offers: [
      {
        "@type": "Offer",
        name: "Content Studio",
        price: "299000",
        priceCurrency: "INR",
        description: "Foundational content engine + monthly video infrastructure.",
      },
      {
        "@type": "Offer",
        name: "Content Studio+",
        price: "499000",
        priceCurrency: "INR",
        description: "Double video infra, SEO pages, CEO ghostwriting.",
      },
      {
        "@type": "Offer",
        name: "Content Engine",
        price: "799000",
        priceCurrency: "INR",
        description: "Full video infrastructure, PR-ready assets, employer brand.",
      },
    ],
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Content Studio",
        item: `${site.url}/content-studio`,
      },
    ],
  };
  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}

const why = [
  {
    n: "01",
    title: "One shoot stack, five pillars",
    body: "A single day on standing video infrastructure produces social cuts, doctor reels, long-form patient stories, employer-brand films, and PR-ready visuals. Five of the seven content pillars come out of the same footage — without booking three vendors and a freelancer.",
  },
  {
    n: "02",
    title: "Capability beats budget",
    body: "A Rs. 8L launch budget gets you one polished campaign film. The same money spent on a mapped library and a production cadence that runs every month gets you twelve months of compounding content. Boards measure what compounds, not what launches.",
  },
  {
    n: "03",
    title: "The layer beats the launch",
    body: "Six weeks after a campaign ends, the agency is gone and the footage sits on a hard drive. Six weeks into an infrastructure retainer, the patient-journey gaps are closing one specialty at a time, the editor knows your tone, and the SEO pages are starting to rank.",
  },
];

const stages = [
  {
    n: "01",
    stage: "Educate",
    title: "Awareness",
    body: "Symptom explainers and when-to-see-a-doctor videos that reach patients at the first moment of concern.",
    formats: "Symptom Videos · Condition Explainers",
  },
  {
    n: "02",
    stage: "Credibilise",
    title: "Trust Building",
    body: "Doctor profiles, facility tours, technology showcases that help patients evaluate before they call.",
    formats: "Doctor Profiles · Facility Tours",
  },
  {
    n: "03",
    stage: "Reassure",
    title: "Decision",
    body: "Patient testimonials and success stories that convert a hesitant patient into a confirmed appointment.",
    formats: "Testimonials · Success Stories",
  },
  {
    n: "04",
    stage: "Guide",
    title: "Post-Op Care",
    body: "Recovery guides and aftercare that build loyalty, reduce readmissions, and generate organic referrals.",
    formats: "Recovery Guides · Aftercare Tips",
  },
];

const pillars = [
  {
    name: "Social",
    output:
      "LinkedIn, Instagram, YouTube Shorts — posts, reels, carousels with consistent voice and pillars",
    powered: "Editorial + video infra",
  },
  {
    name: "Doctor-led",
    output:
      "Doctor explainers, condition Q&A reels, sub-specialty deep-dives shot inside the hospital",
    powered: "Video infra (primary)",
  },
  {
    name: "Patient stories",
    output:
      "Long-form video case studies, written testimonials, compliant before-and-after content with consent",
    powered: "Video infra (primary)",
  },
  {
    name: "Thought leadership",
    output:
      "CEO and CMO LinkedIn ghostwriting, op-eds, conference recaps, anchor essays",
    powered: "Editorial only",
  },
  {
    name: "Written & SEO",
    output:
      "Website page copywriting, campaign landing pages, condition deep-dives, doctor profiles, locality pages, ad and email copy",
    powered: "Editorial + doctor video",
  },
  {
    name: "Employer brand",
    output:
      "Recruitment reels, life-at-hospital stories, staff spotlights, Glassdoor response strategy",
    powered: "Video infra (primary)",
  },
  {
    name: "PR-ready",
    output:
      "Press kits, milestone announcements, awards write-ups, journalist-ready visual assets",
    powered: "Video infra + editorial",
  },
];

const tiers = [
  {
    label: "Entry",
    name: "Content Studio",
    price: "Rs. 2,99,000",
    unit: "/ month",
    annual: "Annual commitment: Rs. 35.88L",
    blurb:
      "Foundational content engine + monthly video infrastructure for hospitals starting to professionalise their voice.",
    bullets: [
      "Video infra: 2 shoot days / month, in-hospital",
      "20 social posts / month (LinkedIn + IG)",
      "8 doctor reels / month",
      "2 patient case studies per quarter",
      "Monthly calendar + analytics review",
    ],
    compare:
      "Healthcare social retainer (Rs. 80K–1.5L) + ad-hoc shoot day (Rs. 50K–1L) + editor (Rs. 30–50K) = Rs. 1.6–3L / month, with no continuity.",
  },
  {
    label: "Growth",
    name: "Content Studio+",
    price: "Rs. 4,99,000",
    unit: "/ month",
    annual: "Annual commitment: Rs. 59.88L",
    blurb:
      "Doubles the video infra. Adds the SEO and leadership voice that compound across twelve months.",
    bullets: [
      "Video infra: 3 shoot days / month",
      "Long-form video pipeline added",
      "Everything in Studio, plus:",
      "4 SEO condition pages / month",
      "CEO + 2 doctor LinkedIn ghostwriting",
      "Dedicated content lead (50%)",
    ],
    compare:
      "Enterprise healthcare retainer (Rs. 1.5–3L) + 3 shoot days (Rs. 1.5–3L) + SEO writer (Rs. 40–80K) + CEO ghostwriter (Rs. 50K–1L) = Rs. 3.9–7.8L / month, across four vendors.",
    featured: true,
  },
  {
    label: "Flagship",
    name: "Content Engine",
    price: "Rs. 7,99,000",
    unit: "/ month",
    annual: "Annual commitment: Rs. 95.88L",
    blurb:
      "Full video infrastructure. PR-ready assets, employer brand, dedicated full-time lead.",
    bullets: [
      "Video infra: 5 shoot days / month",
      "Everything in Studio+, plus:",
      "PR-ready press kits + milestones",
      "Employer brand & recruitment reels",
      "Dedicated content lead (full-time)",
    ],
    compare:
      "Producer + 2 editors + writer + SEO lead + PR retainer + kit = Rs. 15–25L / month loaded, 6–9 months to staff. Engine is 30–50% of in-house cost from month one.",
  },
];

const fits = [
  "A hospital chain (3+ units) or a 300+ bed single unit",
  "CMO-led, with at least one in-house marketing manager",
  "Already running social — you need scale, consistency, and craft",
  "Treating brand authority and organic OPD demand as board-level priorities",
];

const nonFits = [
  "A standalone under 200 beds — a Rs. 80K social retainer will serve you better",
  "A single-doctor practice or single-specialty clinic",
  "Looking for a project shoot, not a 12-month editorial commitment",
  "Buying performance media; we don't run paid campaigns",
];

const commitments = [
  "Monthly content calendar published by the 25th of the previous month",
  "Quarterly content planning session with the CMO and one clinical lead",
  "Monthly analytics review: reach, engagement, SEO ranking, video watch-time",
  "90-day exit clause if monthly review reveals systemic underdelivery",
  "All content reviewed by hospital marketing before publication",
];

const wonts = [
  "Promise patient volumes or specific OPD numbers",
  "Publish claims a doctor wouldn't sign in writing",
  "Run before/after content that could embarrass a patient",
  "Use AI to write patient stories without a real patient and consent",
  "Take on a chain competing with an existing client in the same city",
];

const voices = [
  {
    quote:
      "The production quality was unlike anything we had seen in healthcare video. It felt like content a patient would actually want to watch, not a corporate bulletin.",
    role: "VP Marketing",
    org: "Multi-specialty hospital group · Mumbai",
  },
  {
    quote:
      "Our doctors had been filmed before, but never like this. Patients started quoting specific lines from the videos during consultations.",
    role: "Marketing Head",
    org: "Tertiary care hospital · Bengaluru",
  },
  {
    quote:
      "Every frame was intentional. The patient testimonial videos felt real, not rehearsed. Families said it felt like talking to another patient.",
    role: "Brand Lead",
    org: "Women & children's hospital · Chennai",
  },
  {
    quote:
      "We'd worked with three video agencies before. The difference was in the brief. They understood the patient mindset before a single camera was switched on.",
    role: "CMO",
    org: "Multi-specialty chain · Hyderabad",
  },
];

export default function ContentStudioPage() {
  return (
    <>
      <ContentStudioSchema />

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
          <li className="text-ink">Content Studio</li>
        </ol>
      </nav>

      <PageHero
        eyebrow="Content + Social + Video Infrastructure"
        title={
          <>
            One studio for content, social, and video.
            <br />
            <em className="text-sage italic font-normal">
              Built as infrastructure, not a campaign.
            </em>
          </>
        }
        sub="A 12-month engine that runs every form of content a hospital ships — written (website copy, SEO content, doctor profiles, CEO ghostwriting, press kits) and video (doctor explainers, patient stories, recovery guides, employer-brand reels) — plus social media, off one editorial brief, by one editor-led team."
        meta={[
          { label: "Content · Social · Video", value: "3-in-1" },
          { label: "Pillars, one brief", value: "7" },
          { label: "Month engagement", value: "12" },
        ]}
      />

      {/* Why infrastructure */}
      <section
        aria-labelledby="why-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">
                Why infrastructure, not projects — 01
              </Eyebrow>
              <h2
                id="why-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Campaigns end.
                <br />
                <em className="text-sage italic font-normal">
                  Infrastructure compounds.
                </em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Hospital chains fund video by the campaign: a shoot when a
              launch happens, a freelancer when an awards entry is due. The
              layer underneath — a standing capability that turns every
              Tuesday into doctor reels, patient stories, and SEO content —
              doesn&apos;t get funded, because it doesn&apos;t fit inside a
              campaign cycle.
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
          {why.map((w, i) => (
            <Reveal as="li" key={w.n} delay={i * 70}>
              <div className="border-t-2 border-ink pt-6 h-full">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3">
                  {w.n}
                </div>
                <h3 className="font-serif text-2xl md:text-[28px] leading-[1.1] mb-4">
                  {w.title}
                </h3>
                <p className="text-base leading-[1.6] text-muted">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Video as infrastructure film + four stages */}
      <section
        aria-labelledby="video-infra-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-ink text-paper"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4 text-sage">
                The layer underneath — 02
              </Eyebrow>
              <h2
                id="video-infra-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em] text-paper"
              >
                Most chains <em className="text-sage italic font-normal">buy</em>{" "}
                video.
                <br />
                We{" "}
                <em className="text-sage italic font-normal">install</em> it.
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-paper/75 max-w-[560px]">
              Most hospitals don&apos;t have a shooting problem. They have a
              structure problem. A mapped library across the four-stage
              patient journey, a gap matrix that tells you exactly what to
              shoot next, and a production cadence that runs every month —
              not every campaign.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <figure className="max-w-[1100px] mx-auto mb-16">
            <div className="relative aspect-video rounded-[20px] overflow-hidden border border-paper/15 bg-black">
              <video
                src="/content-studio/qlarify-logo-revision.mp4"
                poster="/content-studio/qlarify-logo-revision-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Qlarify Health video infrastructure film"
                width={1280}
                height={720}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="text-sm leading-[1.6] text-paper/70 max-w-[760px] mx-auto mt-6 text-center">
              The film above isn&apos;t a demo reel. It&apos;s a 90-second
              look at what one quarter on standing video infrastructure
              produces — doctor stories, patient stories, employer-brand
              cuts, and SEO B-roll, from one shoot stack.
            </figcaption>
          </figure>
        </Reveal>

        {/* Four stages */}
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <Eyebrow className="mb-3 text-sage justify-center inline-flex">
              The framework underneath
            </Eyebrow>
            <h3 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-[-0.01em] text-paper mb-3">
              Four stages.{" "}
              <em className="text-sage italic font-normal">
                One complete patient journey.
              </em>
            </h3>
            <p className="text-base leading-[1.6] text-paper/75 max-w-[760px] mx-auto">
              Every hospital needs guided video at every stage — from first
              Google search to full recovery. Most cover only one or two.
              Oncology has 40 videos. Recovery is silent. The free Video
              Audit maps which stages are missing for each specialty.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stages.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 70}>
                <article className="bg-paper/[0.04] border border-paper/15 rounded-[20px] p-6 h-full">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-sage mb-2">
                    Stage {s.n} · {s.stage}
                  </div>
                  <h4 className="font-serif text-xl text-paper font-bold mb-2 tracking-[-0.01em]">
                    {s.title}
                  </h4>
                  <p className="text-[13px] leading-[1.55] text-paper/75 mb-3">
                    {s.body}
                  </p>
                  <div className="text-[11px] text-sage font-semibold">
                    {s.formats}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={300}>
            <div className="max-w-[820px] mx-auto mt-12 px-7 py-6 rounded-[16px] border border-sage/40 bg-sage/[0.08] text-center">
              <p className="text-paper text-[15px] leading-[1.6] mb-4">
                <strong>Most hospitals cover only 1–2 stages.</strong> The
                free <strong>48-hour Video Audit</strong> maps exactly which
                stages are missing for each specialty.
              </p>
              <Link
                href="https://video.qlarify.health/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage text-ink font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Claim the free Video Audit at video.qlarify.health →
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center max-w-[760px] mx-auto mt-12 pt-8 border-t border-paper/15">
            <div className="text-center">
              <div className="font-serif text-3xl text-sage font-bold leading-none">
                10,000+
              </div>
              <div className="text-[11px] text-paper/75 uppercase tracking-[0.08em] font-semibold mt-1.5">
                Patient-facing videos shipped
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl text-sage font-bold leading-none">
                17+
              </div>
              <div className="text-[11px] text-paper/75 uppercase tracking-[0.08em] font-semibold mt-1.5">
                Hospitals served
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl text-sage font-bold leading-none">
                10+
              </div>
              <div className="text-[11px] text-paper/75 uppercase tracking-[0.08em] font-semibold mt-1.5">
                Years inside Indian healthcare
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seven pillars */}
      <section
        aria-labelledby="pillars-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">Inside the studio — 03</Eyebrow>
              <h2
                id="pillars-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Seven pillars.
                <br />
                <em className="text-sage italic font-normal">
                  One editorial brief.
                </em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Every retainer covers the foundational pillars. Higher tiers
              unlock the rest.{" "}
              <strong>
                Five of the seven pillars are powered by the video
                infrastructure layer above.
              </strong>
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="text-left font-mono text-[11px] uppercase tracking-[0.12em] text-muted py-3 pr-4 font-semibold">
                    Pillar
                  </th>
                  <th className="text-left font-mono text-[11px] uppercase tracking-[0.12em] text-muted py-3 px-4 font-semibold">
                    What it produces
                  </th>
                  <th className="text-left font-mono text-[11px] uppercase tracking-[0.12em] text-muted py-3 pl-4 font-semibold">
                    Powered by
                  </th>
                </tr>
              </thead>
              <tbody>
                {pillars.map((p) => (
                  <tr key={p.name} className="border-b border-line">
                    <td className="py-5 pr-4 align-top font-serif text-lg font-semibold w-[170px]">
                      {p.name}
                    </td>
                    <td className="py-5 px-4 align-top text-base leading-[1.55] text-muted">
                      {p.output}
                    </td>
                    <td className="py-5 pl-4 align-top text-[13px] uppercase tracking-[0.08em] font-semibold text-sage w-[200px]">
                      {p.powered}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface scroll-mt-24"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">Commercials — 04</Eyebrow>
              <h2
                id="pricing-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Three tiers.
                <br />
                <em className="text-sage italic font-normal">
                  One commitment.
                </em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              You&apos;re not buying a social media retainer. You&apos;re
              buying a content engine with standing video infrastructure
              underneath it — the kind a chain CMO would otherwise have to
              assemble from three vendors and a freelancer pool.
            </p>
          </div>
        </Reveal>

        <ul className="grid lg:grid-cols-3 gap-5 md:gap-6">
          {tiers.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 70}>
              <article
                className={[
                  "rounded-[20px] p-7 md:p-8 h-full bg-paper border",
                  t.featured
                    ? "border-sage shadow-[0_0_0_2px_rgba(0,0,0,0)_inset] ring-2 ring-sage/30"
                    : "border-line",
                ].join(" ")}
              >
                <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-sage mb-3">
                  {t.label}
                </div>
                <h3 className="font-serif text-3xl tracking-[-0.01em] mb-3">
                  {t.name}
                </h3>
                <div className="font-serif text-[28px] tracking-[-0.01em] mb-1">
                  {t.price}{" "}
                  <span className="text-base text-muted font-sans">
                    {t.unit}
                  </span>
                </div>
                <div className="text-[12px] text-muted mb-5 uppercase tracking-[0.08em] font-semibold">
                  {t.annual}
                </div>
                <p className="text-[15px] leading-[1.55] text-muted mb-6">
                  {t.blurb}
                </p>
                <ul className="space-y-2.5 mb-6">
                  {t.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-[14.5px] leading-[1.5] flex gap-2"
                    >
                      <span className="text-sage" aria-hidden="true">
                        ·
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-line pt-5 mb-6">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted mb-2">
                    Pieced together elsewhere
                  </div>
                  <p className="text-[13px] leading-[1.55] text-muted">
                    {t.compare}
                  </p>
                </div>
                <Link
                  href="#audit"
                  className="block text-center w-full py-3 rounded-full bg-ink text-paper text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Start with a free audit →
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Honest pricing math */}
        <Reveal delay={300}>
          <div className="max-w-[920px] mx-auto mt-14 p-8 md:p-10 rounded-[20px] bg-paper border border-line">
            <Eyebrow className="mb-4">The honest pricing math</Eyebrow>
            <p className="text-base md:text-[17px] leading-[1.65] text-ink mb-5">
              A Rs. 80K Indian healthcare social retainer doesn&apos;t
              include the camera, the producer, or the doctor scheduling.
              Add those line items and a chain CMO ends up paying{" "}
              <strong>Rs. 1.6–3L a month across two or three vendors</strong>{" "}
              — without the editorial layer that turns a shoot day into SEO
              content, CEO ghostwriting, or PR-ready assets. Studio bundles
              all of that into one bill, one calendar, and one team
              that&apos;s accountable to your CMO every Monday.
            </p>
            <p className="text-[13px] leading-[1.55] text-muted">
              Twelve-month engagement. Quarterly content planning. Monthly
              review. 90-day exit clause if systemic underdelivery shows up
              in review.
            </p>
          </div>
        </Reveal>

        {/* Fit / non-fit */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-12 max-w-[920px] mx-auto">
          <Reveal>
            <div className="rounded-[20px] p-7 md:p-8 bg-paper border border-line h-full">
              <Eyebrow className="mb-4">This fits if you are</Eyebrow>
              <ul className="space-y-3">
                {fits.map((f) => (
                  <li
                    key={f}
                    className="text-[14.5px] leading-[1.5] flex gap-2"
                  >
                    <span className="text-sage" aria-hidden="true">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-[20px] p-7 md:p-8 bg-paper border border-line h-full">
              <Eyebrow className="mb-4">
                This is the wrong fit if you are
              </Eyebrow>
              <ul className="space-y-3">
                {nonFits.map((f) => (
                  <li
                    key={f}
                    className="text-[14.5px] leading-[1.5] flex gap-2 text-muted"
                  >
                    <span aria-hidden="true">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Commitments */}
      <section
        aria-labelledby="commitments-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">What we commit to — 05</Eyebrow>
              <h2
                id="commitments-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                What we do.
                <br />
                <em className="text-sage italic font-normal">
                  What we don&apos;t.
                </em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Healthcare content is too important to be vague about. These
              are the lines we hold.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          <Reveal>
            <div className="rounded-[20px] p-7 md:p-8 bg-paper border border-line h-full">
              <h3 className="font-serif text-2xl mb-5 tracking-[-0.01em]">
                What we commit to
              </h3>
              <ul className="space-y-3">
                {commitments.map((c) => (
                  <li
                    key={c}
                    className="text-[14.5px] leading-[1.5] flex gap-2"
                  >
                    <span className="text-sage" aria-hidden="true">
                      ✓
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-[20px] p-7 md:p-8 bg-paper border border-line h-full">
              <h3 className="font-serif text-2xl mb-5 tracking-[-0.01em]">
                What we won&apos;t do
              </h3>
              <ul className="space-y-3">
                {wonts.map((w) => (
                  <li
                    key={w}
                    className="text-[14.5px] leading-[1.5] flex gap-2 text-muted"
                  >
                    <span aria-hidden="true">×</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust */}
      <section
        aria-labelledby="trust-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line bg-surface"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">Trust layer — 06</Eyebrow>
              <h2
                id="trust-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                Production quality that{" "}
                <em className="text-sage italic font-normal">
                  patients trust before they call.
                </em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Anonymised voices from the marketing leads we&apos;ve worked
              with across India. The hospitals are different sizes, in
              different cities, with different specialties. The brief looked
              the same.
            </p>
          </div>
        </Reveal>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10">
          {voices.map((v, i) => (
            <Reveal as="li" key={v.role + v.org} delay={i * 70}>
              <article className="rounded-[20px] p-6 md:p-7 bg-paper border border-line h-full">
                <p className="font-serif italic text-[15px] leading-[1.55] mb-4">
                  &ldquo;{v.quote}&rdquo;
                </p>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-sage font-semibold">
                  {v.role}
                </div>
                <div className="text-[12px] text-muted mt-1">{v.org}</div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={300}>
          <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center px-7 py-8 rounded-[20px] bg-paper border border-line max-w-[920px] mx-auto">
            <div className="text-center">
              <div className="font-serif text-4xl font-bold leading-none">
                10,000+
              </div>
              <div className="text-[11.5px] text-muted uppercase tracking-[0.1em] font-semibold mt-1.5">
                Patient-facing videos
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold leading-none">
                17+
              </div>
              <div className="text-[11.5px] text-muted uppercase tracking-[0.1em] font-semibold mt-1.5">
                Hospitals served
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold leading-none">
                10+
              </div>
              <div className="text-[11.5px] text-muted uppercase tracking-[0.1em] font-semibold mt-1.5">
                Years in Indian healthcare
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold leading-none text-sage">
                4
              </div>
              <div className="text-[11.5px] text-muted uppercase tracking-[0.1em] font-semibold mt-1.5">
                Journey stages, mapped
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* About strip */}
      <section
        aria-labelledby="about-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
            <div>
              <Eyebrow className="mb-4">About — 07</Eyebrow>
              <h2
                id="about-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
              >
                A creative company.
                <br />
                <em className="text-sage italic font-normal">
                  A healthcare arm.
                </em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[560px]">
              Qlarify Health is the healthcare marketing arm of Digitinize
              Creative. We work exclusively with hospitals.
            </p>
          </div>
        </Reveal>

        <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
          {[
            {
              label: "The parent",
              title: "Digitinize Creative",
              body: "A creative company with a 10-year legacy. Brand, design, and content for organisations that care about craft.",
            },
            {
              label: "The arm",
              title: "Qlarify Health",
              body: "Built exclusively for hospitals. Editors who know healthcare. Writers who know the compliance line. Producers who know what a doctor will and won't say on camera.",
            },
            {
              label: "The offer",
              title: "Healthcare Content Studio",
              body: "A 12-month content engine across 7 pillars. One brief, many outputs. Start with a free Content Audit before any retainer conversation.",
            },
          ].map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 70}>
              <div className="rounded-[20px] p-7 bg-paper border border-line h-full">
                <Eyebrow className="mb-3">{a.label}</Eyebrow>
                <h3 className="font-serif text-2xl mb-3 tracking-[-0.01em]">
                  {a.title}
                </h3>
                <p className="text-base leading-[1.6] text-muted">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <AuditCTA />
    </>
  );
}
