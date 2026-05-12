// Single source of truth for all six service practices.
// Used by /services overview, /services/[slug] details, footer, sitemap, and
// schema.org Service nodes. Adding a service here adds a route, a sitemap
// entry, a schema entry, and a footer link in one place.

export type Service = {
  slug: string;
  n: string;
  title: string;
  flagship?: boolean;
  stage: string;
  lede: string;
  deliverables: readonly string[];
  proof: { metric: string; label: string; sub: string };
  visual:
    | "youtube"
    | "social"
    | "seo"
    | "funnel"
    | "content"
    | "lifecycle";
  philosophy: string;
};

export const services: readonly Service[] = [
  {
    slug: "youtube-for-hospitals",
    n: "01",
    title: "YouTube for hospitals",
    flagship: true,
    stage: "Awareness → Decision",
    lede: "The single highest-trust channel in healthcare — and the one most hospitals are spending on without a strategy. We build channels that compound.",
    deliverables: [
      "Channel strategy & content calendar",
      "Doctor-led video production",
      "Packaging — thumbnails, titles, end screens",
      "Playlist architecture & SEO",
      "Analytics, attribution to OPD",
      "Community + comments management",
    ],
    proof: {
      metric: "4.8×",
      label: "Avg. enquiry lift in first 6 months",
      sub: "Across 12 hospital channels we run",
    },
    visual: "youtube",
    philosophy:
      "A doctor on YouTube is doing rounds for a million people. We just make sure the rounds are coherent.",
  },
  {
    slug: "social-media-marketing",
    n: "02",
    title: "Social media marketing",
    stage: "Awareness → Consideration",
    lede: "Instagram, Facebook, LinkedIn. Where patients vet your hospital before they ever click an ad — and where most hospital social feels like a hospital newsletter from 2014.",
    deliverables: [
      "Channel strategy (IG, FB, LinkedIn)",
      "Doctor-led content & reels",
      "Patient education carousels",
      "Awareness day & campaign calendars",
      "Community management & DMs",
      "Brand voice & visual system",
    ],
    proof: {
      metric: "12.4×",
      label: "Avg. follower growth, 12 months",
      sub: "Across hospital Instagram channels we run",
    },
    visual: "social",
    philosophy:
      "Social isn't where patients book — it's where they decide whether you're the kind of hospital they'd trust to. We design for that quieter moment.",
  },
  {
    slug: "seo-for-hospitals",
    n: "03",
    title: "SEO for hospitals",
    stage: "Awareness → Consideration",
    lede: "Rank for the queries patients actually type — symptoms, doctors, localities, procedure costs. Built on medically-reviewed pages, not blog spam.",
    deliverables: [
      "Symptom & condition pages",
      "Doctor & specialty SEO",
      "Local SEO (city, locality, near-me)",
      "Procedure & cost pages",
      "Schema, structured data, FAQ",
      "Technical & Core Web Vitals",
    ],
    proof: {
      metric: "+312%",
      label: "Organic enquiry growth, 18 months",
      sub: "Multi-speciality hospital, Bengaluru",
    },
    visual: "seo",
    philosophy:
      "Patients search the way they speak in the consult room. Most hospital sites are written for a brochure.",
  },
  {
    slug: "performance-marketing",
    n: "04",
    title: "Performance marketing",
    stage: "Consideration → Decision",
    lede: "Ads tuned for lead quality, not volume. Tied to call-tracking and downstream OPD outcomes — so we can tell the difference between a click and a footfall.",
    deliverables: [
      "Google Search & PMax",
      "Meta (Facebook, Instagram)",
      "YouTube & Display",
      "Quality-score engineering",
      "Call tracking & conversion modeling",
      "Landing pages & intake design",
    ],
    proof: {
      metric: "₹128",
      label: "Avg. cost per qualified enquiry",
      sub: "Cardiology, oncology, ortho — last 12 months",
    },
    visual: "funnel",
    philosophy:
      "A lead is not the goal. A booked OPD is. We optimise to the metric the CFO cares about.",
  },
  {
    slug: "content-marketing",
    n: "05",
    title: "Content marketing",
    stage: "Awareness → Consideration",
    lede: "Medically-reviewed content that earns trust and ranks. Written by clinicians, edited for clarity, structured for search.",
    deliverables: [
      "Editorial strategy & taxonomy",
      "Clinical review workflow",
      "Long-form articles (clinician-led)",
      "Health literacy adaptation",
      "Multi-language (Hindi, Kannada, Tamil, Telugu)",
      "Internal linking & topic clusters",
    ],
    proof: {
      metric: "600+",
      label: "Clinically-reviewed articles published",
      sub: "Across active engagements",
    },
    visual: "content",
    philosophy:
      "Health content without clinical review is malpractice in slow motion. We make doctors the editors.",
  },
  {
    slug: "email-and-whatsapp",
    n: "06",
    title: "Email & WhatsApp",
    stage: "Consideration → Advocacy",
    lede: "Lifecycle nurture on the two channels patients in India actually read. Pre-consult prep, post-consult follow-up, reactivation — without spamming.",
    deliverables: [
      "WhatsApp Business API setup",
      "Lifecycle journey design",
      "Pre & post-consult sequences",
      "Reactivation & alumni",
      "Annual health check reminders",
      "Opt-in management",
    ],
    proof: {
      metric: "38%",
      label: "WhatsApp open-to-action rate",
      sub: "Pre-consult prep flows",
    },
    visual: "lifecycle",
    philosophy:
      "Patients open WhatsApp 40 times a day and email twice a week. The channel mix should reflect that.",
  },
];

export const servicesIndex = Object.fromEntries(
  services.map((s) => [s.slug, s])
) as Readonly<Record<string, Service>>;

export type FaqItem = { q: string; a: string };

// Per-page FAQ banks. Keyed for re-use in JSON-LD FAQPage and the Disclosure UI.
export const servicesFaq: readonly FaqItem[] = [
  {
    q: "Do you work with hospitals outside India?",
    a: "Occasionally — we have clients in the GCC and Singapore — but our primary focus is India. The patient-decision context, language mix and channel preference (WhatsApp dominance) all shape how we work, and we know the Indian context best.",
  },
  {
    q: "Can we engage you for one practice — say, just YouTube — or is it all-or-nothing?",
    a: "You can engage us for a single practice. About 40% of our clients start with one (usually YouTube or SEO) and add others as the relationship deepens. We don't push the full stack on day one.",
  },
  {
    q: "How is performance measured? Leads or OPD bookings?",
    a: "OPD bookings, where the data allows. We integrate with your CRM (HIS, Plustar, custom) and call analytics so every campaign ties back to a footfall — not just a form fill. Leads are a leading indicator; OPD is the goal.",
  },
  {
    q: "Do you produce video in-house or use partners?",
    a: "In-house. Our video team is permanent — producers, editors, motion designers, doctor-coaches. We do not subcontract creative, because consistency across 50–100 doctor videos a year requires institutional memory.",
  },
  {
    q: "How long until we see results?",
    a: "Performance marketing: 30–60 days. YouTube and SEO: 90–180 days for early signal, 12 months for compounding. Anyone promising paid-ad-style timelines on organic is selling you a story.",
  },
  {
    q: "How does pricing work?",
    a: "Retainer, scoped to practices engaged. Typical engagements range from ₹4–25 lakh / month depending on scope. We share a written scope and KPI sheet before any contract — no hidden production fees.",
  },
];
