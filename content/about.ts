// About-page content. Leadership and practice-lead initials are placeholders
// for headshots that arrive in Sprint 5.

export type Person = {
  initials: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string; // Path under /public, e.g. "/team/anjali-menon.jpg".
};

export const founders: readonly Person[] = [
  {
    initials: "AM",
    name: "Anjali Menon",
    role: "Co-founder · CEO",
    bio: "A decade running marketing inside hospitals before founding Qlarify. Knows what the marketing head's Monday morning actually looks like.",
  },
  {
    initials: "RK",
    name: "Dr. Ravi Krishnan",
    role: "Co-founder · Clinical",
    bio: "Cardiologist. Maintains a 2-day-a-week clinical practice. Reviews every campaign for medical accuracy before it ships.",
  },
  {
    initials: "NP",
    name: "Neha Pillai",
    role: "Head of Strategy",
    bio: "Patient-journey strategist. Built our journey-mapping framework. Previously inside a Bangalore multispecialty marketing team.",
  },
  {
    initials: "SD",
    name: "Siddharth Desai",
    role: "Head of Video",
    bio: "Has shipped doctor explainers, OT walk-throughs and consent-first patient stories across eight Indian languages.",
  },
];

export const practiceLeads: readonly Person[] = [
  { initials: "PM", name: "Priya Mehta", role: "Video" },
  { initials: "AT", name: "Arjun Tandon", role: "Performance" },
  { initials: "KS", name: "Kavya Shenoy", role: "SEO" },
  { initials: "VR", name: "Vikram Rao", role: "Lifecycle" },
  { initials: "AS", name: "Anushka Sen", role: "Content" },
  { initials: "JM", name: "Jay Mathur", role: "AI workflow" },
];

export const principles = [
  {
    n: "01",
    title: "The patient comes before the campaign.",
    body: "Every piece of content, every paid ad, every WhatsApp message is written first for the patient who will read it — and only then checked against what it does for the hospital. If a piece of work serves the campaign at the patient's expense, we do not ship it. This is a refusal we have made on real briefs.",
  },
  {
    n: "02",
    title: "No exaggerated medical claims, ever.",
    body: "We do not publish before-and-after imagery. We do not invent testimonials. We do not write 'best in India' or 'guaranteed results' copy. Every claim has to be either provable or softened — the only marketing posture that does not put your clinical registration at risk.",
  },
  {
    n: "03",
    title: "Clinician sign-off on every clinical word.",
    body: "Medical writers draft. Your clinicians sign off. No medical content goes live without a doctor's name attached as reviewedBy and a real lastReviewed date in the schema. This is what Google's E-E-A-T system reads first — and it's the right thing to do.",
  },
  {
    n: "04",
    title: "Consent before contact, always.",
    body: "We do not import cold lists. We do not run unofficial WhatsApp gateways. Every contact has a recorded opt-in event with a timestamp and a stated purpose. Withdrawal is one click — what every hospital deserves from a partner that handles its patients' data.",
  },
  {
    n: "05",
    title: "AI helps, humans decide.",
    body: "Every AI output that reaches a patient passes through a trained human reviewer — or comes from a pre-approved template library a clinician has signed off. We track hallucination-catch rates as an internal quality metric. The audit trail is yours to inspect any time.",
  },
  {
    n: "06",
    title: "The calling team owns the close.",
    body: "We deliver qualified enquiries into your CRM, tagged and clean. The conversion to a booked consult is your calling team's domain — and their close rate is theirs to own. Our line of accountability is lead quality and number. Drawing it there is the only way the partnership stays honest.",
  },
] as const;

// Work we have refused — by design, not as a positioning exercise.
export const refusals = [
  {
    title: "Insurance and TPA marketing.",
    body: "Health insurance companies want hospital-style trust signals to sell policies. We do not work with them. The conflict of interest with our hospital clients — whose claim approvals these companies decide — is structural, not negotiable.",
  },
  {
    title: "Pharma and medical-device promotion.",
    body: "We do not run consumer-facing pharma campaigns. We do not promote prescription medications direct-to-patient. The MCI and DCGI rules around pharma promotion are strict, and the line between 'patient education' and 'drug marketing' is too easy to blur.",
  },
  {
    title: "D2C wellness, supplements, fitness apps.",
    body: "Wellness brands that sell ashwagandha gummies, 'metabolism boosters', or app-based diet plans want medical authority without medical responsibility. We won't lend a hospital-grade voice to claims a hospital itself wouldn't make.",
  },
  {
    title: "Lead-resale and grey-market medical tourism.",
    body: "Aggregators that sell the same Lagos or Dhaka enquiry to four hospitals simultaneously are not a business we are willing to enter. Every inbound enquiry we deliver has named consent and a single destination.",
  },
] as const;

export const byTheNumbers = [
  { v: "10+", l: "Years in Indian healthcare marketing" },
  { v: "10,000+", l: "Healthcare videos shipped" },
  { v: "8", l: "Indian languages in production" },
  { v: "6", l: "Demand engines under one roof" },
  { v: "12", l: "Bangalore catchments mapped" },
  { v: "7", l: "Geographies actively served" },
  { v: "100%", l: "Opt-in nurture contacts" },
  { v: "0", l: "Non-healthcare clients" },
] as const;

export const accountability = {
  eyebrow: "Where our line is drawn",
  title: "Our accountability ends where your calling team's begins.",
  paragraphs: [
    "Every hospital we work with has a calling team — five to fifty people who pick up enquiries, shepherd consults, and handle the questions a website cannot. Their close rate is theirs to own. Our job is to give them clean, opt-in, well-tagged enquiries from the right catchment in the right language at the right journey stage. That hand-off — done well — is the whole of our accountability.",
    "We measure ourselves on lead quality and number. Cost-per-qualified-lead. Multilingual coverage. Calling-team handover SLA. Locality map-pack rank. Year-on-year compounding of organic and video assets. We do not measure ourselves on booked consults — because taking credit for those would mean taking credit for your team's skill in the conversation that follows.",
    "This line is named at signing. Every monthly review respects it. Every dashboard is structured around it. It is the simplest thing we say to a prospective client, and the most important.",
  ],
} as const;

export const aboutFaq = [
  {
    q: "Why only healthcare?",
    a: "Because hospital marketing is a different craft. The patient isn't a consumer; the product isn't a product; the regulation isn't a checklist. Generalist agencies that also take insurance, pharma, real-estate and D2C can fake it for 18 months. They cannot sustain it for ten years.",
  },
  {
    q: "Are you part of a holding company?",
    a: "No. We're independent and founder-run. Anjali and Dr. Krishnan still own a majority of the firm. That independence is why we can hold the principles even when a quarter is rough — and why we can refuse insurance and pharma work without a board conversation.",
  },
  {
    q: "Where is the team based?",
    a: "Bangalore HQ, with a Mumbai studio. About a third of the team works hybrid; client work happens on-site at the hospital several days a quarter. Five Indian languages on the home team, eight in production.",
  },
  {
    q: "Do you really turn away non-hospital work?",
    a: "Yes — the discipline is the product. Insurance, pharma, D2C wellness and lead-resale aggregators have all asked, and we have said no, on the record. The list is on this page above.",
  },
  {
    q: "Are you hiring?",
    a: "Almost always. Strategy, video, editorial, performance, AI workflow — see /careers. We hire slowly. Most senior hires have prior healthcare or clinical experience.",
  },
  {
    q: "Do you take equity in client work?",
    a: "Occasionally, in lieu of fees, with early-stage clinical brands we believe in. It's rare. Most engagements are straightforward retainers.",
  },
] as const;
