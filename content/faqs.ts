// Site-wide FAQ catalog — 15 questions targeting the queries patients,
// hospital marketing leaders, and AI search engines actually ask.
//
// Each answer is 2–4 sentences, written as a featured-snippet-friendly,
// AI-extractable block. Pages compose their own slice from this catalog
// plus 1–3 page-specific entries.

import type { FaqItem } from "./services";

const Q = {
  patientAcquisition: {
    q: "How do hospitals increase patient acquisition in India?",
    a: "Hospitals increase patient acquisition by replacing campaign-by-campaign spend with a system mapped to the four moments of a patient's decision — symptom search, trust-building, decision, and post-treatment care. The fastest gains come from intent-led SEO, doctor-led video, and a call-centre that converts the enquiries those channels generate. Vanity metrics like impressions and reach do not predict OPD growth; cost per qualified lead and inbound call conversion do.",
  },
  whatIsHealthcareMarketing: {
    q: "What is healthcare marketing?",
    a: "Healthcare marketing is the practice of helping a hospital be found, trusted, and chosen by the right patient at the right moment. Unlike consumer marketing, it is bound by clinical accuracy and medical ethics codes (in India, the NMC). Done well, it converts anxious search behaviour into measurable OPD enquiries — not into impressions.",
  },
  howPatientsChoose: {
    q: "How do patients choose a hospital in India?",
    a: "Patients choose a hospital through a private, anxious sequence: a symptom search, a YouTube explainer by a senior doctor, a WhatsApp conversation with a relative, a Google review check, and finally a call. They are not comparing hospitals on a funnel — they are looking for a place they can trust. Hospitals win when their content shows up at every one of those moments with clinical depth and named specialists.",
  },
  opdFootfall: {
    q: "How can hospitals improve OPD footfall?",
    a: "OPD footfall improves when four layers work together: digital channels generate qualified enquiries, the call centre converts them with structured scripts, the front desk delivers a consistent first visit, and lifecycle communication brings patients back. Most hospitals invest in only the first layer and lose the rest. Fixing the chain matters more than adding spend at the top.",
  },
  digitalHealthPlatform: {
    q: "What is a digital health platform?",
    a: "A digital health platform is a connected system of technology, content, analytics and patient-communication tools that enables healthcare organisations to reach and retain patients across digital channels — search, video, social, messaging, and appointment systems. In a hospital context, it ties together the demand-generation, patient-education, and lifecycle-management layers that most hospitals run as separate, disconnected programmes.",
  },
  youtubeImportance: {
    q: "Why is YouTube important for hospital marketing?",
    a: "YouTube is one of the highest-trust channels in healthcare decisions because patients prefer to hear directly from physicians before choosing a hospital — doctors consistently rank among the most trusted sources of health information, and video makes that expertise accessible at scale. Unlike paid ads, a YouTube library is durable: a video filmed once keeps surfacing in search and recommendations for years. Channel programmes structured around symptom awareness, trust, decision and post-treatment care lift inbound enquiry volume in the specialties they cover.",
  },
  aiInHealthcare: {
    q: "How does AI in healthcare marketing work?",
    a: "AI in healthcare marketing analyses anonymised patient-search and engagement signals — processed in compliance with India's DPDP Act 2023 — to identify which symptoms, conditions and specialists drive enquiries in a given catchment. It powers personalised content sequencing, predictive call-centre prioritisation, and patient-journey attribution that human teams alone cannot do at scale. Used responsibly, it sharpens what is shown to a patient — not who the patient is.",
  },
  patientJourney: {
    q: "What is the patient journey in healthcare?",
    a: "The patient journey is the four-stage path every patient moves through: symptom awareness, trust-building, decision, and post-treatment care. Each stage demands different content and different channels. Hospital marketing that maps to all four stages — instead of optimising only the decision moment — converts more patients and retains them longer.",
  },
  seoTimeline: {
    q: "How long does hospital SEO take to show results?",
    a: "Most hospitals see a measurable lift in organic enquiries within 3–6 months of a structured programme. Competitive specialties like cardiac care and oncology take 6–9 months. The compound effect — where the content library ranks across hundreds of procedure-level queries — usually arrives between months 9 and 12.",
  },
  marketingMetrics: {
    q: "What metrics matter for hospital marketing ROI?",
    a: "The metrics that matter are cost per qualified lead, inbound call volume by specialty, OPD enquiry-to-appointment conversion, patient lifetime value, and 12-month retention. Impressions, click-through rate, and follower count are leading indicators at best — they do not predict OPD growth. Every report we deliver leads with enquiries that converted, not activity that occurred.",
  },
  qlarifyDifferent: {
    q: "How is Qlarify Health different from a generic marketing agency?",
    a: "Qlarify Health is a hospital-only digital health platform — not a generalist agency that also takes hospital briefs. Founder-run, built on over a decade working inside Indian hospital systems, every channel is designed around the patient journey and reviewed for clinical accuracy. We are accountable for qualified OPD enquiries — well-tagged, opt-in, matched to the right specialty.",
  },
  singleSpecialty: {
    q: "Does Qlarify Health work with single-specialty hospitals?",
    a: "Yes. Single-specialty hospitals — fertility, ortho, oncology, cardiac, paediatric, women's care — benefit the most from a journey-led approach because depth compounds faster in a focused content library. We work with both single-specialty centres and multi-specialty groups across India.",
  },
  healthcareAnalytics: {
    q: "What is healthcare analytics?",
    a: "Healthcare analytics turns anonymised patient signals — symptom searches, video watch-time, call-centre logs, OPD outcomes — into a clear picture of how families decide. It tells a hospital which specialties are leaking enquiries, which doctors convert, and which content is actually moving patients. It is the difference between guessing where to spend and knowing.",
  },
  patientTrust: {
    q: "How do hospitals build patient trust online?",
    a: "Hospitals build patient trust online by being consistently present in the moments before a patient is ready to call — symptom explainers, named specialists on camera, real patient stories with consent, and Google reviews answered with care. Trust is not a campaign; it is the residue of clinical depth shown over months. The hospitals that win are the ones that treat content as a clinical responsibility, not a marketing output.",
  },

} as const satisfies Record<string, FaqItem>;

// 15 FAQs in the order they should appear on the home page / sitewide FAQ.
export const siteFaqs: readonly FaqItem[] = [
  Q.patientAcquisition,
  Q.whatIsHealthcareMarketing,
  Q.howPatientsChoose,
  Q.opdFootfall,
  Q.digitalHealthPlatform,
  Q.youtubeImportance,
  Q.aiInHealthcare,
  Q.patientJourney,
  Q.seoTimeline,
  Q.marketingMetrics,
  Q.qlarifyDifferent,
  Q.singleSpecialty,
  Q.healthcareAnalytics,
  Q.patientTrust,
];

// Eight-question subset emitted as FAQPage schema on the home page.
// Chosen for highest-volume search intent and AI-citation potential.
export const homeFaqsForSchema: readonly FaqItem[] = [
  Q.patientAcquisition,
  Q.whatIsHealthcareMarketing,
  Q.howPatientsChoose,
  Q.opdFootfall,
  Q.digitalHealthPlatform,
  Q.aiInHealthcare,
  Q.qlarifyDifferent,
  Q.patientTrust,
];

// Per-service slices — 4 site-wide FAQs + 2 service-specific entries that
// already exist on each service page. Total = 6 FAQs per service.

export const videoFaqs: readonly FaqItem[] = [
  Q.youtubeImportance,
  Q.patientJourney,
  Q.qlarifyDifferent,
  Q.patientAcquisition,
  {
    q: "How long does it take to build a multi-specialty video library?",
    a: "The first priority-specialty library is live in 45–60 days from kickoff. A full multi-specialty rollout across 10–20 departments typically takes 180 days to 12 months, with quarterly extensions thereafter.",
  },
  {
    q: "Which Indian languages do you produce in?",
    a: "English plus eight Indian languages: Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Gujarati, and Bengali. Every video ships with subtitled versions on request.",
  },
];

export const seoFaqs: readonly FaqItem[] = [
  Q.seoTimeline,
  Q.howPatientsChoose,
  Q.patientJourney,
  Q.patientTrust,
  {
    q: "What keywords should hospitals target?",
    a: "Hospitals should target intent-driven keywords — condition-specific queries ('knee replacement recovery time'), local searches ('cardiologist near me Bengaluru'), and named-specialist queries. Vanity keywords like 'best hospital in India' drive traffic but rarely convert. We map keywords to specialties, procedures, and patient-journey stages.",
  },
  {
    q: "Why is healthcare SEO different from regular SEO?",
    a: "Healthcare content must be clinically accurate, specialty-specific, and written with the authority Google's E-E-A-T guidelines and patients both demand. A wellness blog template does not work for a procedure page a patient is using to decide whether to have surgery. Every piece is reviewed by the relevant specialist before publication.",
  },
];

export const paidFaqs: readonly FaqItem[] = [
  Q.patientAcquisition,
  Q.opdFootfall,
  Q.marketingMetrics,
  {
    q: "How much should a hospital spend on Google Ads?",
    a: "A practical starting range is ₹50,000–₹1,50,000 per specialty per month — enough to generate consistent enquiry volume and produce useful data within 60–90 days. The real budget is set by three things: how competitive your specialties are in your city, how many specialties you want to run in parallel, and how mature your call tracking is. We don't recommend starting paid media without call tracking and CRM integration in place.",
  },
  {
    q: "What is a good cost per lead for hospitals?",
    a: "Cost per lead varies widely by specialty, geography and competitive density — orthopaedics and cardiology in metro cities run higher than awareness-stage health-check campaigns. But cost per lead in isolation is a misleading metric. A cheap lead the call centre can't convert is more expensive than an expensive one that consistently books an OPD. The numbers worth tracking together are cost per inbound call, call-to-OPD conversion rate, and enquiry quality by specialty.",
  },
  {
    q: "Do Meta Ads work for hospitals?",
    a: "Yes — for specific roles, not as a primary acquisition channel. Meta works for catchment-area awareness, doctor-led brand building, and retargeting patients who have already visited your site or watched your video. It rarely works as a direct-response channel for high-consideration specialties like cardiology or oncology, where the patient takes weeks to decide. Meta builds the audience that Google Search later converts — the two together outperform either alone.",
  },
];

export const socialFaqs: readonly FaqItem[] = [
  Q.patientTrust,
  Q.howPatientsChoose,
  Q.patientJourney,
  {
    q: "Which social platform is best for hospitals in India?",
    a: "Instagram works best for patient-facing awareness — doctor reels, procedure explainers, patient stories. YouTube is the long-form trust engine. WhatsApp has the highest open rates of any channel in India. LinkedIn serves referral networks. Most hospitals need 2–3 platforms, not all five.",
  },
  {
    q: "How often should a hospital post on social media?",
    a: "Four to five posts per week, consistently, outperforms sporadic bursts of fifteen posts in one week. The algorithm rewards consistency, and patients who follow a hospital expect a continuous relationship. A calendar structured around your specialty areas, seasonal health moments and specialist availability works better than reactive posting.",
  },
  {
    q: "Can social media actually bring patients to a hospital?",
    a: "Directly, rarely — and that is not its job. Social media builds familiarity and trust over time so that when a patient has a health need, your hospital is already in their consideration set. The patient who calls after watching three reels by your cardiologist did not 'come from social' in a last-click sense, but the trust that converted them was built there.",
  },
];

export const emailFaqs: readonly FaqItem[] = [
  Q.opdFootfall,
  Q.marketingMetrics,
  {
    q: "Is WhatsApp marketing effective for hospitals in India?",
    a: "WhatsApp consistently outperforms email on read-rate in India — published industry benchmarks (Meta business, 2024) put WhatsApp message read-rates well above typical email open-rates. Appointment reminders, 48-hour pre-op checklists, post-discharge follow-ups and six-month preventive nudges all perform when the message is timely, relevant and comes from a verified hospital number. Every flow is built with explicit opt-in and one-click withdrawal.",
  },
  {
    q: "How do you re-engage inactive patients?",
    a: "We segment the patient database by specialty, last visit date, treatment stage and care relevance. A cardiac patient due for a six-month follow-up gets a different message than an orthopaedics patient 12 months post-surgery. Seasonal health prompts and preventive care windows bring different cohorts back at the right moment — not a mass-blast to everyone.",
  },
  {
    q: "What is the ROI of email and WhatsApp for hospitals?",
    a: "Across our hospital engagements, retaining an existing patient is materially cheaper than acquiring a new one — public marketing benchmarks (Bain, HubSpot) place retention spend at a fraction of acquisition spend. A patient who visited your oncology OPD once and never returned is a lost relationship, not a closed file. The ROI is measured in return appointments and avoided re-acquisition cost.",
  },
];

