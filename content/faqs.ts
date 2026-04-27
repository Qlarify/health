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
    a: "Healthcare marketing is the practice of helping a hospital be found, trusted, and chosen by the right patient at the right moment. Unlike consumer marketing, it is bound by clinical accuracy, medical ethics codes (in India, the NMC) and data-protection law (DPDP). Done well, it converts anxious search behaviour into measurable OPD enquiries — not into impressions.",
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
    a: "A digital health platform is a connected system of strategy, content, analytics and AI that helps a hospital reach, convert and retain patients across every channel a patient uses — search, video, social, email, WhatsApp and OPD. Qlarify Health is a digital health platform built specifically for hospitals in India, designed to turn clinical depth into measurable OPD growth.",
  },
  youtubeImportance: {
    q: "Why is YouTube important for hospital marketing?",
    a: "YouTube is one of the highest-trust channels in healthcare decisions because patients prefer to hear directly from physicians before choosing a hospital — Edelman's 2024 Trust Barometer consistently places doctors among the most-trusted information sources. Unlike paid ads, a YouTube library is durable: a video filmed once keeps surfacing in search and recommendations for years. Channel programmes structured around symptom awareness, trust, decision and post-treatment care lift inbound enquiry volume in the specialties they cover.",
  },
  aiInHealthcare: {
    q: "How does AI in healthcare marketing work?",
    a: "AI in healthcare marketing analyses anonymised patient-search and engagement signals to identify which symptoms, conditions and specialists drive enquiries in a given catchment. It powers personalised content sequencing, predictive call-centre prioritisation, and patient-journey attribution that human teams alone cannot do at scale. Used responsibly, it sharpens what is shown to a patient — not who the patient is.",
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
    a: "Qlarify Health is a hospital-only digital health platform — not a generalist agency that also takes hospital briefs. Founder-run, built on a decade inside Manipal, Narayana, Sparsh, KIMS, Sakra, Rainbow and Gleneagles, every channel is designed around the patient journey and reviewed for clinical accuracy and DPDP compliance. We are accountable for OPD enquiries that convert, not for impressions that disappear.",
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
  dpdp: {
    q: "What is DPDP and why does it matter for hospital marketing?",
    a: "The Digital Personal Data Protection Act 2023 (DPDP) is India's data-protection law. For hospitals, it governs how patient data — phone numbers, enquiries, health context — is collected, stored, used in marketing and shared with partners. Every campaign we build captures explicit opt-in, stores data in India, and offers one-click withdrawal. Non-compliance is a compliance risk; compliance is also a trust signal.",
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
  Q.dpdp,
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
    a: "Most hospitals see meaningful qualified-lead volume starting at ₹2–3 lakh per month in competitive cities. Specialties like cardiac surgery, oncology and orthopaedics need higher budgets because the patient lifetime value justifies higher cost-per-lead targets. We scope budgets against specialty mix, catchment geography and target enquiry volume — not a generic recommendation.",
  },
  {
    q: "What is a good cost per lead for hospitals?",
    a: "Cost per qualified lead varies by specialty. Orthopaedics and cardiology typically run ₹300–₹800 per qualified inbound call; fertility and oncology run ₹800–₹2,000 because the patient journey is longer and the decision is more considered. The number that matters is cost per qualified lead — not cost per click.",
  },
  {
    q: "Do Meta Ads work for hospitals?",
    a: "Yes. Meta Ads excel at building awareness and trust before a patient needs care. A 45-year-old in your catchment who sees a cardiologist explain hypertension is six months away from becoming a qualified enquiry. Meta builds the retargeting pool that Google then converts — the two platforms work best together.",
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
  Q.dpdp,
  {
    q: "Is WhatsApp marketing effective for hospitals in India?",
    a: "WhatsApp consistently outperforms email on read-rate in India — published industry benchmarks (Meta business, 2024) put WhatsApp message read-rates well above typical email open-rates. Appointment reminders, 48-hour pre-op checklists, post-discharge follow-ups and six-month preventive nudges all perform when the message is timely, relevant and comes from a verified hospital number. Every flow is built with explicit opt-in and one-click withdrawal under DPDP.",
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

