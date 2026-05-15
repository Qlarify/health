/**
 * Build-time prerendering for Qlarify Health SPA
 *
 * Generates per-route HTML files with correct <head> meta tags
 * and the correct page pre-activated, so crawlers and social
 * sharing bots see the right content without executing JS.
 *
 * Usage: node build.js
 * Output: dist/ directory with 19 HTML files + static assets
 */

const fs = require('fs');
const path = require('path');

// ── Basic minifiers (no external deps) ────────────────────────────────────────
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')       // remove comments
    .replace(/\s*([{};:,>~+])\s*/g, '$1')   // strip spaces around punctuation
    .replace(/\s*\n\s*/g, '')               // remove newlines
    .replace(/\s{2,}/g, ' ')               // collapse multiple spaces
    .replace(/;\}/g, '}')                  // remove trailing semicolons
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')       // remove block comments first
    // Remove single-line comments but NOT // inside URL schemes (http:// https://)
    // or inside string literals. Match // only when NOT preceded by : ' "
    .replace(/([^:'"\\])\/\/[^\n]*/g, '$1') // inline comment after code
    .replace(/^\/\/[^\n]*/gm, '')           // comment-only lines
    .replace(/\n\s*\n/g, '\n')             // collapse blank lines
    .replace(/[ \t]+/g, ' ')               // collapse spaces/tabs
    .replace(/\n /g, '\n')                 // trim leading spaces from lines
    .trim();
}

// ── Page definitions (mirrors pageMeta in index.html) ──────────────────────

const pages = {
  home: {
    path: '',
    title: 'Healthcare Marketing Agency India | Qlarify Health',
    desc: "India's specialist hospital marketing agency. Video, SEO, and paid media engineered to turn patient intent into measurable OPD growth across India."
  },
  video: {
    path: 'video',
    title: 'Hospital Video Marketing & Production | Qlarify Health',
    desc: 'Specialist video production for multi-specialty hospitals in India. Permanent patient-education libraries built in 180 days across every department.'
  },
  seo: {
    path: 'seo',
    title: 'Hospital SEO & Medical Content Strategy | Qlarify Health',
    desc: 'Rank on Google for the condition, symptom, and specialist searches your patients make. SEO and content marketing built exclusively for Indian hospitals.'
  },
  paid: {
    path: 'paid',
    title: 'Hospital Paid Media & Performance Ads | Qlarify Health',
    desc: 'Google Ads and Meta campaigns engineered for patient enquiries, not vanity metrics. Every rupee tracked from click to confirmed OPD appointment across India.'
  },
  social: {
    path: 'social',
    title: 'Social Media Marketing for Hospitals | Qlarify Health',
    desc: 'Social media strategy that positions your specialists as trusted voices on Instagram, Facebook, and LinkedIn — driving patient recall and referral growth.'
  },
  email: {
    path: 'email',
    title: 'Hospital Email & WhatsApp Campaigns | Qlarify Health',
    desc: 'Reactivate your patient database with structured email and WhatsApp — reminders, health tips, and follow-ups that drive repeat visits at 5x lower cost.'
  },
  opd: {
    path: 'opd',
    title: 'OPD Growth Marketing for Hospitals | Qlarify Health',
    desc: 'End-to-end OPD growth combining digital marketing, call centre training, and front desk alignment — for single-location and multi-specialty hospitals.'
  },
  campaigns: {
    path: 'campaigns',
    title: 'Hospital Campaign Planning & Strategy | Qlarify Health',
    desc: 'Integrated hospital campaign planning — specialty launches, OPD growth campaigns, and seasonal health drives engineered for measurable patient enquiry growth.'
  },
  'content-studio': {
    path: 'content-studio',
    title: 'Healthcare Content Studio — Content, Social & Video Infrastructure | Qlarify Health',
    desc: 'One studio for content, social, and video — built as infrastructure, not a campaign. A 12-month engine across seven editorial pillars for hospital chains and 300+ bed units in India.'
  },
  about: {
    path: 'about',
    title: 'About Qlarify Health — Our Story & Team',
    desc: "Built from inside India's leading hospital systems. Meet the team behind 10,000+ medical videos and OPD growth for top hospital brands across India."
  },
  contact: {
    path: 'contact',
    title: 'Schedule a Call | Qlarify Health',
    desc: "Book a free 30-minute call with our healthcare marketing specialists. No obligations — just clarity on your hospital's growth path."
  },
  audit: {
    path: 'audit',
    title: 'Free Hospital Video ROI Audit | Qlarify Health',
    desc: 'Free 30-minute Hospital Video ROI Audit. We map your patient acquisition, identify the highest-leverage gap, and give one specific recommendation.'
  },
  privacy: {
    path: 'privacy',
    title: 'Privacy Policy | Qlarify Health',
    desc: 'How Qlarify Health collects, uses, and protects your personal information. Read our full policy covering data handling, cookies, and third parties.'
  },
  terms: {
    path: 'terms',
    title: 'Terms & Conditions | Qlarify Health',
    desc: 'Terms and conditions governing your use of the Qlarify Health website. Covers intellectual property, limitations of liability, and acceptable use.'
  },
  blog: {
    path: 'blog',
    title: 'Hospital Marketing Insights & Guides | Qlarify Health',
    desc: 'Expert strategies for hospital marketing — SEO, video, paid media, OPD growth, and patient acquisition. Guides by healthcare marketing specialists.'
  },
  'blog-hospital-marketing': {
    path: 'blog/what-is-hospital-marketing',
    title: 'What is Hospital Marketing? Complete Guide | Qlarify',
    desc: 'Hospital marketing explained — why clinical sensitivity, patient psychology, and systems thinking matter more than ad spend. A guide for hospital leaders.'
  },
  'blog-opd-footfall': {
    path: 'blog/increase-opd-footfall',
    title: 'How to Increase OPD Footfall: 10 Strategies | Qlarify',
    desc: '10 proven strategies to increase OPD footfall — hospital SEO, Google Ads, video marketing, call centre training, and patient retention campaigns.'
  },
  'blog-video-marketing': {
    path: 'blog/video-marketing-hospitals',
    title: 'Video Marketing for Hospitals: Why It Works | Qlarify',
    desc: 'Why structured video systems outperform random content in healthcare. Map every video to the patient journey and drive 4x more hospital appointments.'
  },
  'blog-hospital-seo': {
    path: 'blog/hospital-seo-guide',
    title: 'Hospital SEO: The Ultimate Guide for 2026 | Qlarify',
    desc: 'How to rank your hospital on Google for searches that bring real patients. Covers keyword strategy, technical SEO, content planning, and measurement.'
  },
  'blog-healthcare-agency': {
    path: 'blog/healthcare-vs-general-agency',
    title: 'Healthcare Agency vs General Agency | Qlarify Health',
    desc: 'Why generic marketing agencies fail at hospital marketing. What to look for in a specialised healthcare partner — clinical sensitivity to journey mapping.'
  },
  'blog-social-media-hospitals': {
    path: 'blog/social-media-strategy-hospitals',
    title: 'Social Media Strategy for Hospitals | Qlarify Health',
    desc: 'A practical social media framework for hospitals — what to post on each platform, how to feature specialists, and how to measure engagement that converts.'
  },
  'blog-vs-generic-agencies': {
    path: 'blog/qlarify-health-vs-generic-agencies',
    title: 'Qlarify vs Generic Agencies: Hospital CMO Framework',
    desc: 'A decision framework for hospital CMOs choosing between specialist healthcare agencies and generic marketing agencies. Compliance, journey mapping, and ROI compared.'
  },
  'blog-in-house-vs-agency': {
    path: 'blog/in-house-vs-healthcare-agency',
    title: 'In-House vs Healthcare Agency for Hospital Marketing',
    desc: 'When to hire in-house marketing vs partner with a healthcare agency. A framework for Indian hospital leaders weighing cost, speed, expertise, and accountability.'
  },
  'blog-hospital-content-marketing': {
    path: 'blog/hospital-content-marketing-strategy',
    title: 'Hospital Content Marketing Strategy: Why Your Videos Miss Patients | Qlarify',
    desc: 'We audited nearly 9,000 hospital YouTube videos. Fewer than one in five answered a real patient question. Here\'s what that misalignment is costing your growth.'
  },
  'blog-hospital-video-production-india': {
    path: 'blog/hospital-video-production-india',
    title: 'Hospital Video Production in India: Strategic Guide | Qlarify',
    desc: 'How hospitals in India should approach video production — vendor-led vs strategy-led, the five asset categories that compound enquiries, and how to choose the right production partner.'
  },
  'blog-whatsapp-marketing-hospitals': {
    path: 'blog/whatsapp-marketing-for-hospitals-india',
    title: 'WhatsApp Marketing for Hospitals in India (2026) | Qlarify',
    desc: 'How Indian hospitals use WhatsApp Business API for patient retention, OPD reactivation, and post-consult follow-ups. Real strategies, real results.'
  },
  'blog-google-ads-hospitals': {
    path: 'blog/google-ads-for-hospitals-india',
    title: 'Google Ads for Hospitals in India: Complete Guide (2026) | Qlarify',
    desc: 'Everything hospital marketing teams need to know about Google Ads in India — Search, PMax, call campaigns, quality scores, and cost per patient lead benchmarks.'
  },
  'blog-local-seo-hospitals': {
    path: 'blog/local-seo-for-hospitals-india',
    title: 'Local SEO for Hospitals in India: Zero to Page One (2026) | Qlarify',
    desc: 'Complete local SEO guide for Indian hospitals — Google Business Profile, review strategy, local citations, specialty page optimisation, and GMB ranking factors.'
  },
  'blog-doctor-youtube-channel': {
    path: 'blog/doctor-youtube-channel-how-to-start-grow-india',
    title: 'Doctor YouTube Channel: Start, Grow & Convert Patients (2026) | Qlarify',
    desc: 'Step-by-step guide for Indian hospitals and doctors to launch and grow a YouTube channel that builds patient trust and drives OPD appointments.'
  },
  'blog-hospital-marketing-budget': {
    path: 'blog/hospital-marketing-budget-allocation-india-2026',
    title: 'Hospital Marketing Budget Allocation India (2026) | Qlarify',
    desc: 'How hospital CMOs should allocate marketing budgets across digital channels — channel-by-channel benchmarks and ROI framework for Indian hospitals.'
  },
  'blog-hospital-video-appointments': {
    path: 'blog/hospital-video-marketing-increase-appointments',
    title: 'How Video Marketing Helps Hospitals Increase Appointments | Qlarify',
    desc: 'The video types that drive the most hospital appointments, where to distribute them, and how to measure results that show up in your OPD numbers — not just your view count.'
  },
  'blog-why-hospital-videos-dont-convert': {
    path: 'blog/why-hospital-videos-dont-convert',
    title: 'Why Hospital Marketing Videos Don\'t Convert: And How to Fix It | Qlarify',
    desc: 'Most hospital videos get views but not appointments. Six reasons hospital video marketing underperforms and how a video-as-infrastructure approach turns it into a patient acquisition engine.'
  },
  'blog-patient-decision-videos': {
    path: 'blog/patient-decision-support-videos',
    title: 'Patient Decision Support Videos: What They Are & Why Hospitals Need Them | Qlarify',
    desc: 'Patient education videos reduce readmissions, raise HCAHPS scores, and improve treatment adherence. What decision support videos are, how they work, and how to deploy them inside a hospital workflow.'
  },
  glossary: {
    path: 'glossary',
    title: 'Hospital Marketing Glossary | Qlarify Health',
    desc: 'Definitions for the terms hospital marketing teams encounter — OPD footfall, hospital SEO, patient acquisition cost, video as infrastructure, and 20+ more.'
  },
  bengaluru: {
    path: 'bengaluru',
    title: 'Hospital Marketing Agency in Bengaluru | Qlarify Health',
    desc: 'Bengaluru hospital-only marketing agency. SEO, YouTube, paid media and WhatsApp for multi-specialty hospitals — accountable to cost per confirmed OPD appointment.'
  },
  mumbai: {
    path: 'mumbai',
    title: 'Hospital Marketing Agency in Mumbai | Qlarify Health',
    desc: 'Hospital-only marketing for Mumbai\'s competitive private healthcare market. OPD-accountable across YouTube, SEO, paid and WhatsApp — built for Mumbai\'s multi-lingual base.'
  },
  'delhi-ncr': {
    path: 'delhi-ncr',
    title: 'Hospital Marketing Agency in Delhi NCR | Qlarify Health',
    desc: 'Hospital-only marketing for Delhi NCR\'s competitive private healthcare market. Strategy for Delhi, Gurgaon, Noida and Faridabad hospitals.'
  },
  specialties: {
    path: 'specialties',
    title: 'Specialty Hospital Marketing | Qlarify Health',
    desc: 'Specialty-specific hospital marketing in India — IVF, cardiology, oncology. Each patient journey is different. Each marketing strategy should be too.'
  },
  'specialties-ivf': {
    path: 'specialties/ivf',
    title: 'IVF & Fertility Marketing for Hospitals | Qlarify Health',
    desc: 'IVF and fertility clinic marketing in India — patient journey content, YouTube explainers, paid media for IVF intent, and WhatsApp nurture for multi-cycle patients.'
  },
  'specialties-cardiology': {
    path: 'specialties/cardiology',
    title: 'Cardiology Marketing for Hospitals | Qlarify Health',
    desc: 'Cardiology service line marketing for Indian hospitals — YouTube, cardiac SEO, paid media, and specialist positioning for cardiologists and cardiac surgeons.'
  },
  'specialties-oncology': {
    path: 'specialties/oncology',
    title: 'Oncology Marketing for Hospitals | Qlarify Health',
    desc: 'Oncology and cancer centre marketing for Indian hospitals — ethical patient acquisition, second-opinion positioning, NABH trust signals, and survivorship retention.'
  },
  'insights-what-to-look-for-in-a-hospital-marketing-agency': {
    path: 'insights/what-to-look-for-in-a-hospital-marketing-agency',
    title: 'What to Look for in a Hospital Marketing Agency | Qlarify',
    desc: 'Seven criteria for evaluating a hospital marketing agency — plus the red flags that separate healthcare-specialist firms from generalists who learn on your budget.'
  },
  'insights-hospital-marketing-metrics-kpis-cmo': {
    path: 'insights/hospital-marketing-metrics-kpis-cmo',
    title: '12 Hospital Marketing KPIs Every CMO Should Track | Qlarify',
    desc: 'The 12 hospital marketing metrics that connect spend to OPD outcomes — with benchmarks, how to measure each, and the single KPI that matters most.'
  },
  'insights-cardiology-service-line-marketing-hospitals': {
    path: 'insights/cardiology-service-line-marketing-hospitals',
    title: 'Cardiology Service Line Marketing Playbook | Qlarify',
    desc: 'How to grow cardiac OPD volume in India — patient journey mapping, channel strategy, TAVR and cath lab positioning, and the metrics that matter for cardiology.'
  },
  'insights-hospital-orthopedics-marketing-joint-replacement': {
    path: 'insights/hospital-orthopedics-marketing-joint-replacement',
    title: 'Hospital Orthopedics Marketing & Joint Replacement | Qlarify',
    desc: 'How to grow orthopaedic OPD volume in India — competing with standalone clinics, positioning robotic surgery, and building a campaign around joint replacement intent.'
  },
  'insights-hospital-oncology-marketing': {
    path: 'insights/hospital-oncology-marketing',
    title: 'Hospital Oncology Marketing | Qlarify',
    desc: 'How Indian cancer centres grow patient volume without exploiting fear — awareness channels, referral networks, NABH positioning, and survivorship retention.'
  },
  'insights-how-to-market-a-hospital-2026': {
    path: 'insights/how-to-market-a-hospital-2026',
    title: 'How to Market a Hospital in 2026 | Qlarify',
    desc: 'The complete hospital marketing framework for 2026 — channel mix, service line strategy, budget allocation, and a 10-step checklist for Indian hospital CMOs.'
  },
  'insights-hospital-reputation-management-online': {
    path: 'insights/hospital-reputation-management-online',
    title: 'Hospital Reputation Management | Qlarify',
    desc: 'How Indian hospitals manage online reputation — Google reviews strategy, responding to negative feedback, NABH star ratings, and the monitoring stack.'
  },
  'insights-hospital-digital-marketing-strategy-2026': {
    path: 'insights/hospital-digital-marketing-strategy-2026',
    title: 'Hospital Digital Marketing Strategy: The 2026 Playbook | Qlarify',
    desc: 'The comprehensive hospital digital marketing strategy for 2026 — channel mix, paid media, SEO, patient CRM, analytics, and what AI search changes for hospitals.'
  },
  'insights-hospital-patient-experience-marketing': {
    path: 'insights/hospital-patient-experience-marketing',
    title: 'Hospital Patient Experience Marketing | Qlarify',
    desc: 'How Indian hospitals turn patient satisfaction into a marketing asset — Google reviews, NPS to advocacy pipelines, word-of-mouth amplification, and loyalty loops.'
  },
  'insights-best-hospital-marketing-agencies-india-2026': {
    path: 'insights/best-hospital-marketing-agencies-india-2026',
    title: 'Best Hospital Marketing Agencies in India 2026 | Qlarify',
    desc: 'A pragmatic guide for hospital CMOs evaluating marketing agencies in India in 2026 — the shortlist criteria, who meets them, what disqualifies an agency, and the three questions to ask in the first call.'
  },
  'insights-neurosciences-hospital-marketing-india': {
    path: 'insights/neurosciences-hospital-marketing-india',
    title: 'Neurosciences Hospital Marketing | Qlarify',
    desc: 'How to grow neurology and neurosurgery OPD volume in Indian hospitals — referral networks, headache and stroke awareness content, robotic neurosurgery positioning, and the metrics that matter.'
  },
  'insights-gastroenterology-hospital-marketing-india': {
    path: 'insights/gastroenterology-hospital-marketing-india',
    title: 'Gastroenterology Service Line Marketing | Qlarify',
    desc: 'How to grow GI and hepatology OPD volume in India — colonoscopy screening campaigns, liver disease awareness, bariatric positioning, and the channel mix for a competitive GI market.'
  },
  'insights-womens-health-hospital-marketing-india': {
    path: 'insights/womens-health-hospital-marketing-india',
    title: "Women's Health & Gynaecology Marketing | Qlarify",
    desc: "How to grow OBG and women's health OPD volume in India — maternity packages, gynae-oncology, screening campaigns, and community-trust marketing that converts."
  },
  'insights-paediatrics-hospital-marketing-india': {
    path: 'insights/paediatrics-hospital-marketing-india',
    title: "Paediatrics & Children's Hospital Marketing | Qlarify",
    desc: "How to grow paediatric OPD volume in India — vaccination clinics, child speciality positioning, parent-trust signals, and dedicated children's hospitals vs multi-specialty paed units."
  },
  'insights-robotic-surgery-marketing-positioning': {
    path: 'insights/robotic-surgery-marketing-positioning',
    title: 'Robotic Surgery Marketing & Positioning | Qlarify',
    desc: 'How Indian hospitals should market robotic surgery — da Vinci positioning, when to lead with the technology vs the surgeon, ASCI compliance, and the questions patients actually ask.'
  },
  'insights-google-business-profile-optimisation-hospitals': {
    path: 'insights/google-business-profile-optimisation-hospitals',
    title: 'Google Business Profile Optimisation for Hospitals | Qlarify',
    desc: 'The single highest-leverage local SEO asset for hospitals in India. Categories, photos, services, posts, reviews, Q&A, and the optimisation checklist that wins map-pack rankings.'
  },
  'insights-retargeting-programmatic-hospital-marketing': {
    path: 'insights/retargeting-programmatic-hospital-marketing',
    title: 'Retargeting & Programmatic for Hospital Marketing | Qlarify',
    desc: "Hospital retargeting that respects DPDP, captures the 95% of website visitors who don't enquire, and turns research-stage browsers into OPD appointments — without creeping out the patient."
  },
  'insights-linkedin-for-hospital-specialists': {
    path: 'insights/linkedin-for-hospital-specialists',
    title: 'LinkedIn for Hospital Specialists | Qlarify',
    desc: 'Why LinkedIn is the most under-used trust channel for Indian hospital specialists, how to build a publishing cadence, and what content earns referrals from GPs and corporate buyers.'
  },
  'insights-patient-referral-programmes-hospitals-india': {
    path: 'insights/patient-referral-programmes-hospitals-india',
    title: 'Patient Referral Programmes for Hospitals | Qlarify',
    desc: 'Word-of-mouth is the highest-converting channel in hospital marketing. How to systematise patient referrals in India — ethically, NMC-compliant, with measurable impact on OPD volume.'
  },
  'insights-hospital-website-conversion-rate-optimisation': {
    path: 'insights/hospital-website-conversion-rate-optimisation',
    title: 'Hospital Website Conversion Rate Optimisation | Qlarify',
    desc: 'Most hospital websites convert at under 1%. The CRO playbook for Indian hospitals — appointment forms, doctor profiles, page speed, mobile UX, and the friction points that quietly leak patients every day.'
  },
  'insights-hospital-marketing-team-structure-hiring': {
    path: 'insights/hospital-marketing-team-structure-hiring',
    title: 'Hospital Marketing Team Structure & Hiring | Qlarify',
    desc: 'How Indian hospital chains and 100–500 bed single units should structure their marketing team — roles, reporting lines, in-house vs outsourced, and the hiring sequence that builds a self-sustaining function.'
  },
  'insights-hospital-marketing-compliance-nmc-asci-dpdp': {
    path: 'insights/hospital-marketing-compliance-nmc-asci-dpdp',
    title: 'Hospital Marketing Compliance: NMC, ASCI, DPDP | Qlarify',
    desc: 'A practical compliance checklist for Indian hospital marketers — NMC professional conduct rules, ASCI advertising code, DPDP Act 2023 consent, and the documentation patterns that keep you out of trouble.'
  },
  'insights-aeo-geo-ai-search-hospitals-2026': {
    path: 'insights/aeo-geo-ai-search-hospitals-2026',
    title: 'AEO/GEO: AI Search for Hospitals in 2026 | Qlarify',
    desc: 'How Indian hospitals should optimise content for AI search engines — ChatGPT, Perplexity, Google AI Overviews. The structured-data, FAQPage, citation-target playbook for the post-blue-link era.'
  },
  'insights-hospital-call-centre-conversion-playbook': {
    path: 'insights/hospital-call-centre-conversion-playbook',
    title: 'Hospital Call Centre Conversion Playbook | Qlarify',
    desc: 'Most Indian hospitals lose 30–50% of qualified inbound enquiries at the call centre. The training, scripting, technology and process playbook that doubles call-to-appointment conversion.'
  },
  'insights-international-patient-acquisition-indian-hospitals': {
    path: 'insights/international-patient-acquisition-indian-hospitals',
    title: 'International Patient Acquisition for Indian Hospitals | Qlarify',
    desc: 'India is a major destination for medical tourism. The country-specific, channel-specific, ethics-compliant playbook for serious international patient growth.'
  },
  'insights-single-specialty-hospital-marketing-vs-multi': {
    path: 'insights/single-specialty-hospital-marketing-vs-multi',
    title: 'Single-Specialty Hospital Marketing | Qlarify',
    desc: "Eye hospitals, dental chains, fertility centres, cardiac specialists, ortho hospitals — single-specialty hospitals can't use the multi-specialty playbook. The focused-positioning approach that compounds."
  },
  calculator: {
    path: 'calculator',
    title: 'Cost per OPD Calculator | Qlarify Health',
    desc: 'Free interactive calculator for Indian hospital CMOs. Enter your marketing spend and OPD numbers — get your current cost per OPD compared against Indian benchmarks, plus tailored recommendations.'
  },
  '404': {
    path: '404',
    title: 'Page Not Found | Qlarify Health',
    desc: 'The page you are looking for does not exist.',
    noindex: true
  }
};

// ── Helpers ────────────────────────────────────────────────────────────────

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// ── Critical CSS extraction ────────────────────────────────────────────────
// Read source style.css and take the first 200 lines as critical above-the-fold
// CSS (:root vars, body, nav, hero, buttons, anim initial states). This is
// inlined into every page <head> so first paint is styled without waiting for
// the full stylesheet network request.
const _sourceCss = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const _cssLines = _sourceCss.split('\n');
let CRITICAL_CSS = minifyCSS(_cssLines.slice(0, 200).join('\n'));
// @keyframes pageIn is defined on line ~1568, outside the critical slice.
// With animation-fill-mode:both the browser holds the element at opacity:0
// the moment the deferred stylesheet defines the keyframe, then re-animates.
// Lighthouse records that late repaint as LCP. Strip the animation reference
// from the critical rule so the page is visible at full opacity from first paint.
// The full stylesheet still carries the subtle fade-in for SPA page transitions.
CRITICAL_CSS = CRITICAL_CSS.replace(
  '.page.active{display:block;animation:pageIn .18s ease both}',
  '.page.active{display:block}'
);
console.log(`  ✓ Critical CSS: ${Math.round(CRITICAL_CSS.length / 1024 * 10) / 10}KB inlined`);

// ── Build ──────────────────────────────────────────────────────────────────

const DIST = path.join(__dirname, 'dist');
let template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Refresh every Article schema's `dateModified` to today's build date so
// crawlers see freshness signal without manual upkeep.
const __today = new Date().toISOString().slice(0, 10);
template = template.replace(/"dateModified":"\d{4}-\d{2}-\d{2}"/g, `"dateModified":"${__today}"`);

// ── Per-page extraction: split template into prefix + page blocks + suffix ──
//
// Each route's HTML keeps only its own <div id="page-X" class="page">…</div>
// section, dropping the other 18. The shared <head>, <nav>, and <footer>
// stay intact.
const PAGE_OPEN_RE = /<div id="page-([a-z0-9-]+)" class="page[^"]*">/g;
const __pageBlocks = [];
let __m;
while ((__m = PAGE_OPEN_RE.exec(template)) !== null) {
  __pageBlocks.push({ id: __m[1], openIdx: __m.index });
}
if (__pageBlocks.length === 0) {
  throw new Error('No <div id="page-X"> sections found in template');
}
const __prefixEnd = __pageBlocks[0].openIdx;
const __suffixStart = template.indexOf('<footer>', __pageBlocks[__pageBlocks.length - 1].openIdx);
if (__suffixStart === -1) {
  throw new Error('Could not locate <footer> after last page section');
}
for (let i = 0; i < __pageBlocks.length; i++) {
  const endIdx = (i + 1 < __pageBlocks.length) ? __pageBlocks[i + 1].openIdx : __suffixStart;
  __pageBlocks[i].html = template.slice(__pageBlocks[i].openIdx, endIdx);
}
const PREFIX = template.slice(0, __prefixEnd);
const SUFFIX = template.slice(__suffixStart);
const __blockById = Object.fromEntries(__pageBlocks.map(b => [b.id, b.html]));

function buildHtmlForPage(id) {
  const block = __blockById[id];
  if (!block) {
    throw new Error(`No page section found for id "${id}"`);
  }
  // Force the kept block to be the active page (regardless of how it was
  // marked in the template — only "home" carries class="page active" there).
  const activeBlock = block.replace(
    /(<div id="page-[a-z0-9-]+" class="page)( active)?(">)/,
    '$1 active$3'
  );
  return PREFIX + activeBlock + SUFFIX;
}

// Clean dist/
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true });
}
fs.mkdirSync(DIST, { recursive: true });

let generated = 0;

for (const [id, meta] of Object.entries(pages)) {
  let html = buildHtmlForPage(id);
  const canonicalUrl = `https://qlarify.health/${meta.path}`;
  const safeTitle = escapeHtml(meta.title);
  const safeDesc = escapeHtml(meta.desc);

  // 1. Replace <title>
  html = html.replace(/<title>[^<]+<\/title>/, `<title>${safeTitle}</title>`);

  // 2. Replace meta description
  html = html.replace(
    /(<meta name="description" content=")[^"]*/,
    `$1${safeDesc}`
  );

  // 3. Replace canonical URL
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*/,
    `$1${canonicalUrl}`
  );

  // 4. Replace Open Graph tags (incl. per-route og:image)
  // Fall back to generic og-image.png if the per-route asset doesn't exist
  // (so new pages don't ship broken social cards).
  const perRouteOgPath = path.join(__dirname, 'og-images', `${id}.png`);
  const ogImageUrl = (id !== '404' && fs.existsSync(perRouteOgPath))
    ? `https://qlarify.health/og-images/${id}.png`
    : 'https://qlarify.health/og-image.png';
  html = html.replace(
    /(<meta property="og:url" content=")[^"]*/,
    `$1${canonicalUrl}`
  );
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*/,
    `$1${safeTitle}`
  );
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*/,
    `$1${safeDesc}`
  );
  html = html.replace(
    /(<meta property="og:image" content=")[^"]*/,
    `$1${ogImageUrl}`
  );

  // 5. Replace Twitter Card tags (incl. per-route twitter:image)
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*/,
    `$1${safeTitle}`
  );
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*/,
    `$1${safeDesc}`
  );
  html = html.replace(
    /(<meta name="twitter:image" content=")[^"]*/,
    `$1${ogImageUrl}`
  );

  // 6. Handle noindex for 404
  if (meta.noindex) {
    html = html.replace(
      /(<meta name="robots" content=")[^"]*/,
      '$1noindex, nofollow'
    );
  }

  // 7. Bake per-route BreadcrumbList into the prerendered HTML so
  //    crawlers that don't execute JS still see the correct chain.
  //    Mirror of `breadcrumbNames` in index.html (kept in sync manually).
  const breadcrumbNames = {
    home: 'Home',
    video: 'Video as Infrastructure',
    seo: 'Hospital SEO',
    paid: 'Paid Media',
    social: 'Social Media',
    email: 'Email & WhatsApp',
    opd: 'OPD Growth',
    campaigns: 'Campaign Planning',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms',
    blog: 'Blog',
    'blog-hospital-marketing': 'What is Hospital Marketing?',
    'blog-opd-footfall': 'How to Increase OPD Footfall',
    'blog-video-marketing': 'Video Marketing for Hospitals',
    'blog-hospital-seo': 'Hospital SEO Guide',
    'blog-healthcare-agency': 'Healthcare vs General Agency',
    'blog-social-media-hospitals': 'Social Media for Hospitals',
    'blog-vs-generic-agencies': 'Qlarify vs Generic Agencies',
    'blog-in-house-vs-agency': 'In-House vs Healthcare Agency',
    'blog-hospital-content-marketing': 'Hospital Content Marketing Strategy',
    'blog-hospital-video-production-india': 'Hospital Video Production in India',
    'blog-whatsapp-marketing-hospitals': 'WhatsApp Marketing for Hospitals',
    'blog-google-ads-hospitals': 'Google Ads for Hospitals India',
    'blog-local-seo-hospitals': 'Local SEO for Hospitals India',
    'blog-doctor-youtube-channel': 'Doctor YouTube Channel Guide',
    'blog-hospital-marketing-budget': 'Hospital Marketing Budget 2026',
    glossary: 'Glossary',
    calculator: 'Cost per OPD Calculator'
  };
  // 7a. Inject per-route Service JSON-LD for the 6 service pages.
  //     Helps AI engines map service-intent queries to the specific page
  //     instead of just the home/org node.
  const serviceDefs = {
    video: {
      name: 'Hospital Video Production & Strategy',
      serviceType: 'Healthcare Video Marketing',
      description: 'Structured hospital video production mapped to the patient decision journey — symptom explainers, doctor profiles, procedure walkthroughs, and 3D medical animations.'
    },
    seo: {
      name: 'Hospital SEO & Content Marketing',
      serviceType: 'Healthcare Search Engine Optimization',
      description: 'SEO and content marketing built exclusively for hospitals — ranks your specialists for the condition, symptom, and treatment searches your patients actually make.'
    },
    paid: {
      name: 'Hospital Paid Media (Google Ads + Meta)',
      serviceType: 'Healthcare Paid Advertising',
      description: 'Google Ads and Meta campaigns engineered for patient enquiries — every rupee tracked from ad click through call centre to confirmed OPD appointment.'
    },
    social: {
      name: 'Social Media Marketing for Hospitals',
      serviceType: 'Healthcare Social Media Marketing',
      description: 'Platform strategy that positions your specialists as trusted voices on Instagram, Facebook, and LinkedIn — driving patient familiarity, recall, and referrals.'
    },
    email: {
      name: 'Hospital Email & WhatsApp Campaigns',
      serviceType: 'Healthcare CRM Marketing',
      description: 'Reactivate your existing patient database with structured email and WhatsApp — appointment reminders, health tips, and follow-ups that drive repeat visits.'
    },
    opd: {
      name: 'OPD Growth Marketing for Hospitals',
      serviceType: 'Healthcare Patient Acquisition',
      description: 'End-to-end OPD growth combining digital marketing, call centre training, and front desk alignment — for single-location hospitals and multi-specialty clinics.'
    }
  };
  // 7b. Inject per-route FAQPage schema with page-specific Q&As.
  //     Long-tail "People Also Ask" capture — AI Overviews lift these directly.
  const pageFaqs = {
    video: [
      ['How much does hospital video production cost in India?',
       'Hospital video production typically ranges from ₹50,000 for a single doctor profile to ₹3–5 lakh for a structured 10–15 video patient-journey system. Pricing depends on shoot complexity, 3D animation needs, and post-production scope.'],
      ['What is a video-as-infrastructure approach for hospitals?',
       'Instead of one-off content, we build a permanent video library mapped to the patient decision journey — condition explainers, treatment walkthroughs, doctor introductions, and post-procedure care. Each asset compounds enquiries over years rather than spiking once and decaying.'],
      ['How long does a hospital video shoot take?',
       'A single doctor profile shoot wraps in 2–3 hours on hospital premises. Full video systems with 10+ assets are produced across 2–3 shoot days plus 4–6 weeks of edit, animation, and post-production work.']
    ],
    seo: [
      ['How long does hospital SEO take to show results?',
       'Most hospitals see meaningful organic enquiry growth within 3–6 months. Competitive specialty terms can take 6–12 months. SEO compounds — month-12 enquiries are typically 4–6x month-3, with the lowest cost per acquisition of any channel.'],
      ['Do you handle Google Business Profile for hospitals?',
       'Yes — Google Business Profile optimisation is part of every hospital SEO engagement. Local pack rankings drive 30–40% of new patient enquiries for single-location hospitals, so we treat GBP as core infrastructure rather than an add-on.'],
      ['What is local SEO for hospitals and why does it matter?',
       'Local SEO ranks your hospital for "near me" and city-specific specialty searches (e.g. cardiologist Bangalore). It combines GBP optimisation, location landing pages, citation cleanup, and review management — driving in-catchment patients with the highest conversion intent.']
    ],
    paid: [
      ['What is a typical hospital Google Ads budget in India?',
       'Most hospitals see meaningful results starting at ₹50,000–₹1,50,000 per specialty per month. Larger multi-specialty hospitals run ₹5–10 lakh monthly across paid channels. We measure cost per appointment, not cost per click.'],
      ['Is Meta Ads effective for hospital marketing?',
       'Yes — Meta Ads work best for awareness-driven specialties (cosmetic surgery, fertility, orthopaedics, paediatrics) where patients actively share recommendations. We do not recommend Meta-only for emergency or oncology specialties where intent is search-driven.'],
      ['How do you measure ROI on hospital paid media?',
       'Every rupee is tracked from ad click through call centre to confirmed OPD appointment via UTM-tagged tel links and call recording integration. We report cost per qualified enquiry and cost per booked appointment monthly — not vanity click metrics.']
    ],
    social: [
      ['Which social media platform works best for which hospital specialty?',
       'Instagram works best for awareness specialties (cosmetic, fertility, paediatrics). LinkedIn for referral-driven specialties (cardiology, oncology, transplant). Facebook for community building in tier-2 cities. WhatsApp for direct patient engagement.'],
      ['Should hospital doctors post their own social media content?',
       'Yes — doctor-led content outperforms brand-led posts by 3–4x on engagement. We coach specialists, ghostwrite captions, and handle production so doctors only need to commit 30 minutes per week to recording or reviewing posts.'],
      ['How should hospitals handle negative comments on social media?',
       'We follow a clinical-sensitivity protocol — never engage publicly on medical complaints, redirect to private channels within 2 hours, document all interactions for compliance, and never delete legitimate criticism.']
    ],
    email: [
      ['Is WhatsApp marketing legal for hospitals in India?',
       'Yes, with documented patient consent. WhatsApp Business API allows compliant marketing messages once a patient opts in. We help hospitals build consent flows during patient registration so all subsequent campaigns are compliant by default.'],
      ['What email open rates should hospitals expect?',
       'Hospital email campaigns typically see 25–35% open rates and 4–6% click rates — significantly higher than the cross-industry average. Health-tip newsletters and appointment reminders consistently perform best.'],
      ['How often should a hospital email its patient database?',
       'We recommend 2–4 touches per month: one health-tip newsletter, one specialist spotlight, occasional appointment reminders, and quarterly check-up nudges. Over-emailing is the fastest way to destroy database value.']
    ],
    opd: [
      ['How can a single-location hospital grow OPD footfall?',
       'Single-location growth combines hyperlocal SEO (Google Business Profile, location pages), trained call centre conversion, and structured patient retention via WhatsApp. Most clients see 20–40% OPD growth in 6–9 months.'],
      ['Why does call centre training matter for OPD growth?',
       '60–70% of paid-media enquiries are lost at the call centre stage due to untrained handlers, missed calls, or poor follow-up. Call centre training routinely doubles enquiry-to-appointment conversion — often the highest-leverage intervention in OPD growth.'],
      ['What is the typical OPD growth timeline?',
       'Months 1–3: foundation work (SEO, GBP, call centre training). Months 3–6: enquiry growth becomes visible in analytics. Months 6–12: compounded OPD footfall growth as retention and referrals stack on top of acquisition.']
    ],
    'blog-hospital-marketing': [
      ['What is hospital marketing?',
       'Hospital marketing is the practice of attracting and retaining patients using clinically accurate, ethically governed communication across digital and offline channels. Unlike consumer marketing, it must respect medical ethics codes (NMC in India) and prioritise patient wellbeing over conversion rates.'],
      ['Why is hospital marketing different from consumer marketing?',
       'Patients make healthcare decisions under anxiety and uncertainty — not casual browsing. The audience is not comparing products; they are placing trust in an institution at a vulnerable moment. Hospital marketing must lead with clinical depth, named specialists, and verified outcomes rather than promotional offers.'],
      ['What channels work best for hospital marketing in India?',
       'The highest-ROI combination in India is: hospital SEO for organic enquiries, Google Ads for specialty-level demand capture, YouTube for doctor-led trust content, WhatsApp for patient retention and reactivation, and Google Business Profile for local pack visibility. Social media (Instagram, Facebook) builds awareness and familiarity before the need arises.']
    ],
    'blog-opd-footfall': [
      ['How can a hospital increase OPD footfall?',
       'OPD footfall increases when four layers work together: digital channels generate qualified enquiries (SEO, Ads, video), the call centre converts them with structured scripts, the front desk delivers a consistent first-visit experience, and lifecycle communication (WhatsApp, email) brings patients back. Most hospitals invest only in the first layer and lose the rest.'],
      ['What is a good OPD enquiry-to-appointment conversion rate?',
       'Untrained hospital call centres typically convert 25–35% of inbound enquiries into confirmed appointments. With structured scripts and follow-up protocols, conversion reaches 55–70%. The gap between these numbers is often larger than the impact of doubling the ad budget.'],
      ['How long does it take to see OPD growth from digital marketing?',
       'Paid media (Google Ads) generates enquiry volume within 2–4 weeks of launch. SEO compounds over 3–9 months. Video marketing shows influence on OPD enquiries at 90–120 days. The full compounding effect — where all channels reinforce each other — arrives at month nine to twelve.']
    ],
    'blog-video-marketing': [
      ['How does video marketing increase hospital appointments?',
       'Video builds the trust that converts anonymous search traffic into phone calls. A patient who watches a 90-second doctor introduction before calling already trusts the specialist — which shortens the call, raises conversion, and reduces drop-off. Pages with doctor-led video consistently outperform text-only equivalents on enquiry conversion.'],
      ['What types of videos work best for hospitals?',
       'The five highest-performing hospital video types are: doctor introduction videos (highest conversion per view), symptom explainers (highest reach), procedure walkthroughs (highest trust for elective procedures), 3D medical animations (highest share rate), and patient testimonials with consent (highest credibility). Prioritise in that order.'],
      ['How long does hospital video marketing take to show results in OPD?',
       'YouTube channel rankings appear within 30–60 days. Measurable OPD enquiry influence from video typically emerges at 90–120 days. A structured video library of 20–30 assets compounds significantly by months 9–12, with returning-patient rates rising alongside new enquiries.']
    ],
    'blog-hospital-seo': [
      ['How long does hospital SEO take to show results in India?',
       'Most hospitals see first meaningful organic enquiry growth within 3–6 months of a structured programme. Competitive specialty terms (cardiac, oncology) take 6–9 months. The compound effect — where the content library ranks across hundreds of procedure-level queries — arrives between months 9 and 12.'],
      ['What keywords should hospitals target for SEO?',
       'Hospitals should target intent-driven keywords across four types: condition keywords ("knee replacement recovery"), specialist keywords ("cardiologist near me Bengaluru"), procedure keywords ("laparoscopic surgery cost India"), and location keywords ("multi-specialty hospital in Pune"). Avoid vanity terms like "best hospital in India" — high volume, near-zero conversion.'],
      ['Why is healthcare SEO different from regular SEO?',
       'Healthcare content must be clinically accurate, specialty-specific, and written with authority that anxious patients trust. Generic SEO agencies repurpose wellness blog templates. Hospital content must be reviewed by the relevant specialist before publication — the bar is regulatory, not just editorial. Google\'s E-E-A-T guidelines apply most strictly to YMYL (healthcare) content.'],
      ['Should hospital websites use schema markup?',
       'Yes — schema markup is among the most under-used technical levers in Indian hospital SEO. Implement: MedicalOrganization, Physician, MedicalProcedure, MedicalCondition, FAQPage, and LocalBusiness. Most Indian hospital sites use only basic schema or none, leaving rich-result eligibility entirely unused.']
    ],
    'blog-healthcare-agency': [
      ['What is the difference between a healthcare agency and a general marketing agency?',
       'A healthcare agency is built around clinical sensitivity, patient psychology, medical ethics compliance (NMC), and the patient decision journey. A general agency applies consumer marketing playbooks that were never built for how patients decide. The gap shows in content accuracy, channel selection, and the ability to brief doctors without a medical glossary.'],
      ['Why do hospitals need a specialist healthcare marketing agency?',
       'Healthcare decisions involve anxiety, trust, and clinical complexity that consumer marketing frameworks ignore. A specialist agency knows that a cardiac patient searching "heart attack symptoms" needs reassurance, not a sales pitch — and structures content, CTAs, and ad targeting accordingly. Generic agencies optimise for clicks; specialist agencies optimise for confirmed OPD appointments.'],
      ['What should a hospital look for when choosing a marketing agency?',
       'Three non-negotiables: healthcare-only or healthcare-primary portfolio (not a line item in a generalist agency), demonstrable clinical review process for content, and reporting on cost per qualified inbound lead — not impressions. Ask for case studies from comparable hospital types. Ask who reviews content for clinical accuracy. If they cannot answer both clearly, walk away.']
    ],
    'blog-social-media-hospitals': [
      ['Which social media platform works best for hospital marketing in India?',
       'Instagram for patient-facing awareness (doctor reels, symptom content, patient stories). YouTube for long-form trust building (doctor explanations, procedure walkthroughs). WhatsApp for direct patient engagement and retention. LinkedIn for referral networks and specialist positioning. Most hospitals need two or three platforms, not all five — depth beats spread.'],
      ['How often should a hospital post on social media?',
       'Four to five posts per week consistently outperforms sporadic bursts. The algorithm rewards consistency, and patients who follow a hospital expect a continuous relationship. A calendar structured around your specialty areas, seasonal health moments, and specialist availability outperforms reactive posting every time.'],
      ['Can social media directly generate hospital appointments?',
       'Directly, rarely — and that is not its job. Social builds familiarity and trust over time so that when a patient has a health need, your hospital is already in their consideration set. The patient who calls after watching three Instagram reels by your cardiologist did not "come from social" in a last-click sense, but the trust that converted them was built there.']
    ],
    'blog-vs-generic-agencies': [
      ['Why do generic agencies fail at hospital marketing?',
       'Generic agencies apply consumer playbooks to a context those playbooks were never designed for. They optimise for reach and engagement on content that cannot be clinically verified, run ads without understanding patient intent stages, and report on vanity metrics because that is what their dashboards measure. The result is activity without OPD outcomes.'],
      ['What does a specialist healthcare agency do that a generalist cannot?',
       'A specialist healthcare agency briefs doctors without a medical translator, writes content that passes clinical review, structures ad campaigns around patient decision stages (not purchase funnels), understands NMC compliance constraints, and reports on cost per qualified inbound lead. These are capabilities that take years of healthcare-specific practice to build.'],
      ['How do I evaluate a healthcare marketing agency as a hospital CMO?',
       'Ask three questions: Who reviews your content for clinical accuracy before publication? Can you show me cost-per-qualified-lead data from a hospital similar to ours? Who on your team has worked inside a hospital system, not just marketed to one? The answers reveal whether healthcare is their discipline or their vertical.']
    ],
    'blog-in-house-vs-agency': [
      ['Should a hospital hire an in-house marketing team or use an agency?',
       'Most hospitals get the best result from a hybrid: a small in-house team for brand consistency, hospital context, and internal coordination, paired with a specialist healthcare agency for SEO, paid media, video production, and analytics depth. Pure in-house teams rarely maintain the specialist depth. Pure agency relationships lack daily institutional context.'],
      ['What does an in-house hospital marketing team typically lack?',
       'In-house hospital marketing teams typically lack: clinical content writing expertise, healthcare SEO depth, performance media optimisation at scale, video production capability, and the benchmarking data that comes from working across multiple hospital systems simultaneously. These gaps are expensive to hire for and slow to build internally.'],
      ['What is the right trigger for building a full in-house hospital marketing team?',
       'When your hospital group exceeds five locations or runs more than ₹3–5 crore annually in marketing spend, the coordination cost of a pure agency model begins to exceed the savings. At that point, a hybrid model with two to three senior in-house leads coordinating two or three specialist agencies becomes the most efficient structure.']
    ],
    'blog-hospital-content-marketing': [
      ['Why does most hospital content fail to attract patients?',
       'Most hospital content is produced for approvals, not for patients. It answers the questions the hospital wants to answer (awards, infrastructure, milestones) rather than the questions patients actually ask (symptoms, costs, recovery timelines, doctor credentials). Less than one in five hospital YouTube videos answers a real patient question — the rest are brand content that serves no search intent.'],
      ['What type of content actually drives hospital OPD enquiries?',
       'Content mapped to patient search intent at each journey stage: symptom explainers at awareness, doctor and treatment explainers at trust-building, cost and procedure pages at decision, and recovery/follow-up content at post-visit. The highest-converting content is doctor-led, specialty-specific, and answers one patient question completely — not a broad overview that answers nothing fully.'],
      ['How should a hospital audit its existing content for patient relevance?',
       'Run every existing content piece through three questions: Does this answer a question a patient actually searched? Does it appear in search results for that query? Does it have a clear path to booking a consultation? Content that fails all three should be retired or rebuilt. Most hospital content libraries have 60–80% of pages earning no organic traffic and serving no patient need.']
    ],
    'blog-hospital-video-production-india': [
      ['How much does hospital video production cost in India?',
       'A single clinically reviewed doctor profile video costs ₹40,000–₹80,000 with professional production. A structured 10–15 video specialty system (symptom explainers, doctor introductions, procedure walkthroughs) runs ₹3–6 lakh. 3D medical animations add ₹80,000–₹2 lakh per animation depending on complexity. Multi-specialty libraries of 40–60 assets typically run ₹12–25 lakh over 12 months.'],
      ['What is the difference between vendor-led and strategy-led hospital video production?',
       'Vendor-led production delivers what the hospital briefs: a doctor sitting in front of a camera answering questions the marketing team wrote. Strategy-led production maps each video to a specific patient query, optimises it for YouTube and website placement, adds clinical review before shooting, and integrates it into a measurement framework. One produces content; the other produces patient enquiries.'],
      ['What hospital videos should be produced first?',
       'Prioritise in this order: (1) Doctor profile videos for the top three OPD specialties — highest conversion per view on any platform. (2) Symptom explainers for the top five conditions each specialty treats — highest search volume. (3) Procedure walkthroughs for elective procedures where patient hesitation is the biggest conversion barrier. Build in that sequence; resist the urge to start with 3D animation.']
    ],
    'blog-whatsapp-marketing-hospitals': [
      ['Is WhatsApp marketing legal for hospitals in India?',
       'Yes, with documented patient consent. The WhatsApp Business API (official Meta channel) allows compliant marketing messages to opted-in patients. India\'s Digital Personal Data Protection Act (DPDP, 2023) requires explicit consent with purpose specification. Hospitals should build consent into patient registration forms so all subsequent WhatsApp communication is compliant by default — not retrofitted.'],
      ['How do hospitals use WhatsApp Business API for patient retention?',
       'The highest-ROI WhatsApp flows for hospitals are: appointment reminders (48-hour and 2-hour, reduces no-shows by 30–40%), post-discharge follow-up sequences (Day 3, Day 7, Day 30), six-month preventive care nudges for chronic condition patients, and specialist availability alerts for patients on waiting lists. Each flow requires a template approved by Meta before sending.'],
      ['What WhatsApp open rates should hospitals expect?',
       'WhatsApp Business API messages to opted-in patients consistently achieve 85–95% read rates in India — versus 25–35% for hospital email. Appointment reminder messages see the highest read rates. Re-engagement flows for inactive patients (12+ months since last visit) typically see 40–60% read rates, with 8–15% converting to a new OPD appointment within 30 days.']
    ],
    'blog-google-ads-hospitals': [
      ['How much should a hospital spend on Google Ads in India?',
       'Most hospitals see meaningful qualified-lead volume starting at ₹1.5–3 lakh per specialty per month in competitive cities. Specialties like cardiac surgery and oncology justify higher budgets because patient lifetime value is high. We scope budgets against specialty mix, catchment competition, and target cost-per-appointment — not a generic monthly figure.'],
      ['What is a good cost per qualified lead for hospital Google Ads?',
       'Benchmarks by specialty: Orthopaedics and cardiology — ₹300–₹800 per qualified inbound call. Fertility and oncology — ₹800–₹2,000 because the patient journey is longer and more considered. Paediatrics and general medicine — ₹150–₹400. The metric that matters is cost per qualified lead, not cost per click. A ₹20 click that never calls is worthless; a ₹600 click that books is excellent.'],
      ['What Google Ads campaign types work best for hospitals?',
       'Search campaigns are non-negotiable — they capture patients with active treatment intent. Call-only campaigns work well for hospitals with strong call centres. Performance Max requires careful exclusion lists to avoid irrelevant placements (healthcare ads alongside unrelated content erodes trust). Display and YouTube campaigns work for awareness-stage specialties (fertility, cosmetic, paediatrics) — not for emergency or urgent-care capture.']
    ],
    'blog-local-seo-hospitals': [
      ['How does local SEO help hospitals get more patients?',
       'Local SEO places your hospital in the Google Maps pack and local search results when patients nearby search for care — "cardiologist near me", "hospital in Jayanagar", "orthopaedic surgeon Bengaluru". These searches convert at 3–5x the rate of national queries because the patient is already in your catchment, already looking for care, and already narrowing to a location.'],
      ['How important are Google reviews for hospital local SEO?',
       'Google reviews are the single most powerful local ranking factor after proximity and relevance. A hospital with 400 reviews at 4.6★ will almost always outrank one with 80 reviews at 4.2★ in the local pack. Every review generation system — post-discharge WhatsApp, OPD coordinator verbal ask, follow-up SMS — compounds the advantage over competitors who do not have one.'],
      ['How long does local SEO take to show results for a hospital?',
       'Google Business Profile optimisation produces ranking movement within 2–4 weeks. Review volume improvements show local pack impact within 30–60 days. Specialty local landing pages drive meaningful movement on competitive queries within 60–90 days. The full infrastructure takes 90 days to build; the competitive advantage compounds for years.']
    ],
    'blog-doctor-youtube-channel': [
      ['How do Indian doctors build a YouTube channel that generates patients?',
       'Structure the channel around patient questions, not hospital announcements. Map content to the four patient journey stages: symptom awareness videos (highest reach), condition education (trust-building), doctor introduction and credentials (evaluation), and booking/next-steps content (conversion). Upload two videos per week consistently — consistency beats production quality on YouTube\'s algorithm.'],
      ['What types of videos work best for a doctor\'s YouTube channel in India?',
       'The five highest-performing video types for Indian hospital YouTube channels: (1) Symptom explainers — "When should you worry about chest pain?" (2) Myth-busting videos — "5 myths about knee replacement." (3) Doctor introduction — credentials, approach, philosophy. (4) Procedure explainers — "What happens during a laparoscopic cholecystectomy?" (5) Patient Q&A — real questions, answered on camera. Avoid brand videos, award announcements, and hospital infrastructure tours — these serve internal audiences, not patients.'],
      ['How long does it take for a doctor\'s YouTube channel to influence OPD enquiries?',
       'First channel rankings appear within 30–60 days for low-competition symptom queries. Measurable OPD enquiry influence — patients citing YouTube as a factor in choosing the hospital — typically emerges at 90–120 days. A structured library of 40–50 videos compounds significantly by months 9–12, with branded searches ("Dr Sharma cardiologist") rising alongside OPD volume.']
    ],
    'blog-hospital-marketing-budget': [
      ['How much should a hospital spend on marketing in India?',
       'Indian hospital groups typically allocate 2–4% of gross revenue to marketing. A 200-bed multi-specialty hospital with ₹60 crore annual revenue should plan ₹1.2–2.4 crore in marketing investment. Single-specialty centres and growth-stage hospitals often run higher — 5–7% — because the brand is being built, not maintained. Benchmarking spend as a percentage of revenue is more useful than absolute figures.'],
      ['How should a hospital allocate its marketing budget across channels?',
       'A recommended allocation for a growth-stage multi-specialty hospital: 35–40% performance media (Google Ads, Meta), 20–25% video production and YouTube, 15–20% SEO and content, 10–15% WhatsApp and CRM, 5–10% social media management. Adjust by specialty mix — elective specialties (fertility, ortho, cosmetic) skew toward paid media; chronic disease specialties (cardiology, diabetology) skew toward SEO and retention.'],
      ['What is the ROI of hospital marketing spend in India?',
       'Well-structured hospital marketing programmes achieve cost per acquired patient of ₹400–₹1,500 for OPD across all channels blended. The highest ROI comes from patient retention (WhatsApp/email re-engagement at ₹100–₹300 per returning visit) and organic SEO (₹100–₹250 per organic enquiry at month 12). Paid media runs ₹300–₹1,200 per qualified lead depending on specialty and city.']
    ],
    'blog-hospital-video-appointments': [
      ['Which video types drive the most hospital appointment bookings?',
       'Doctor introduction videos generate the highest appointment bookings per view — a patient who watches a 90-second specialist introduction is already building trust before the call. Procedure explainers convert well for elective specialties where hesitation is the barrier (knee replacement, IVF, cosmetic). Symptom explainers drive volume but require a strong CTA to convert awareness into action.'],
      ['Where should hospitals distribute videos for maximum reach in India?',
       'Primary: YouTube (search-optimised titles, descriptions, tags) and your hospital website (embedded on specialist and department pages). Secondary: Instagram Reels (cropped for vertical, 60–90 seconds), Facebook (for 35+ demographic), and WhatsApp (shared by call centre staff during enquiry calls). Do not publish to all channels first — build YouTube and website first, then distribute.'],
      ['How do you measure video marketing ROI for a hospital?',
       'Track three layers: (1) Content performance — YouTube views, watch time, click-through to website. (2) Enquiry influence — UTM-tagged links from video descriptions; call centre scripts that ask "Did you watch any of our videos?" (3) OPD attribution — monthly comparison of enquiry volume in specialties with active video programmes versus those without. True video ROI lives in layer three, not layer one.']
    ],
    'blog-why-hospital-videos-dont-convert': [
      ['Why do hospital videos get views but not appointments?',
       'The most common reasons: the video answers a question the hospital wants to answer, not one the patient is searching. There is no clear next step (CTA) — the video ends and the patient has nowhere to go. The video was distributed on social media where intent is passive, not on YouTube and website where patients are actively researching. And the video features the hospital brand, not the specialist — patients choose doctors, not buildings.'],
      ['What is a video-as-infrastructure approach for hospitals?',
       'Video-as-infrastructure treats each video as a permanent, patient-facing asset mapped to a specific query at a specific stage of the patient journey — not a piece of campaign content. A symptom explainer built in 2024 keeps generating enquiries in 2028 if it ranks for the right query. Infrastructure compounds; campaigns expire. The shift is from producing content to building a library.'],
      ['How can a hospital fix a video marketing strategy that is not converting?',
       'Three diagnostic questions: Are your videos answering questions patients actually search? (Check YouTube and Google Search Console for organic impressions.) Is there a clear, frictionless CTA in every video — a phone number, a booking link, a WhatsApp shortcut? Are your videos on the pages patients land on during their research — specialty pages, doctor profiles, condition articles? Fix the weakest of these three first.']
    ],
    'blog-patient-decision-videos': [
      ['What are patient decision support videos?',
       'Patient decision support videos are short, clinically reviewed videos that help patients understand their condition, the treatment options available, and what to expect before, during, and after a procedure. Unlike marketing videos, they are designed to inform the treatment decision itself — increasing informed consent quality, reducing pre-procedure anxiety, and improving post-procedure adherence.'],
      ['How do patient education videos reduce hospital readmissions?',
       'Patients who understand their post-discharge instructions are significantly more likely to follow them correctly. Video-based post-discharge education improves medication adherence, follow-up appointment attendance, and recognition of warning signs — all of which reduce emergency readmission. Published research consistently shows 20–30% readmission reduction in programmes with structured video-based patient education.'],
      ['How should hospitals deploy decision support videos in their workflow?',
       'The most effective deployment points: pre-consultation (sent via WhatsApp after appointment booking — arrives informed), pre-procedure (sent 48 hours before — reduces no-show and anxiety), at discharge (sent same day — improves adherence), and at six-month follow-up (reactivation trigger). Each video should be under four minutes, feature the treating specialist, and end with a single clear action.']
    ]
  };
  if (pageFaqs[id]) {
    const faqJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#page-faq`,
      mainEntity: pageFaqs[id].map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    });
    const faqTag = `<script type="application/ld+json" id="ld-page-faq">\n${faqJson}\n</script>\n</head>`;
    html = html.replace('</head>', faqTag);
  }

  // 7c. Inject DefinedTermSet JSON-LD for the glossary page so AI engines
  //     can extract definitions directly into answer surfaces.
  if (id === 'glossary') {
    const terms = [
      ['hospital-marketing', 'Hospital marketing', "The practice of attracting and retaining patients for hospitals using clinically accurate, ethically governed communication across digital and offline channels."],
      ['opd', 'OPD (Out-Patient Department)', "The hospital department where patients are diagnosed, treated, and consulted without admission. Typically 40–60% of an Indian hospital's revenue."],
      ['opd-footfall', 'OPD footfall', 'The number of unique patient visits to a hospital out-patient department in a given period. The single most-watched growth metric in Indian hospital marketing.'],
      ['patient-acquisition-cost', 'Patient acquisition cost (PAC)', 'Total marketing and sales spend divided by the number of new patients acquired. Healthy Indian hospital PAC ranges ₹400–₹1,500 per OPD patient.'],
      ['cost-per-appointment', 'Cost per appointment', 'The marketing spend required to generate one confirmed OPD appointment. Should be the primary KPI for hospital paid media, not cost per click.'],
      ['hospital-seo', 'Hospital SEO', 'Search engine optimisation tailored for hospitals — ranking specialist, condition, and treatment pages for the queries patients actually type.'],
      ['local-seo', 'Local SEO for hospitals', 'Optimising for "near me" and city-level searches. Combines Google Business Profile, location pages, citations, and reviews. Drives 30–40% of single-location enquiries.'],
      ['google-business-profile', 'Google Business Profile (GBP)', 'The free Google listing that surfaces a hospital in local search and Maps. The highest-leverage and most under-optimised local SEO asset in Indian healthcare.'],
      ['video-as-infrastructure', 'Video as infrastructure', 'Treating hospital video as a permanent structured library mapped to the patient decision journey, rather than one-off campaign content.'],
      ['patient-decision-journey', 'Patient decision journey', 'The sequence of questions and information gathering a patient moves through before booking — from symptom recognition to post-visit follow-up.'],
      ['symptom-explainer', 'Symptom explainer video', 'A short doctor-led video that explains a common symptom — when to worry, what to expect, which specialist to consult.'],
      ['doctor-profile', 'Doctor profile video', 'A 60–90 second video introducing a specialist. The single highest-converting asset on hospital websites — pages with one convert at 3–4x text-only profiles.'],
      ['medical-animation', '3D medical animation', 'Computer-generated visualisation of internal procedures or conditions. Useful for explaining what a patient cannot see — anatomy, surgical steps, recovery.'],
      ['ymyl', 'YMYL (Your Money or Your Life)', "Google's classification for content that affects a reader's health, safety, or financial wellbeing. Healthcare sits squarely in YMYL."],
      ['eeat', 'E-E-A-T', "Experience, Expertise, Authoritativeness, Trustworthiness — Google's framework for evaluating content quality, especially for YMYL topics."],
      ['schema-markup', 'Schema markup', 'Machine-readable structured data using the Schema.org vocabulary, embedded in a web page so search engines and AI systems can understand its content.'],
      ['faqpage-schema', 'FAQPage schema', 'Structured data that flags question-and-answer content. Lifted directly into Google AI Overviews and ChatGPT/Perplexity answers — high leverage for healthcare SEO.'],
      ['performance-marketing', 'Performance marketing for hospitals', 'Paid media measured against patient acquisition KPIs rather than vanity metrics — every rupee tracked through to confirmed OPD appointment.'],
      ['crm-marketing', 'CRM marketing for hospitals', 'Reactivating an existing patient database through structured email, WhatsApp, and SMS. Typically 4–6x the ROI of new-patient acquisition.'],
      ['whatsapp-business-api', 'WhatsApp Business API', 'The official Meta-approved WhatsApp channel for businesses. Compliant with Indian data norms when consent is captured. Open rates routinely exceed 95%.'],
      ['specialist-positioning', 'Specialist positioning', 'Marketing strategy that promotes individual doctors as the authoritative face of a hospital. Outperforms brand-led content by 3–4x on engagement and conversion.'],
      ['call-centre-conversion', 'Call centre conversion rate', 'The percentage of inbound enquiry calls that convert into confirmed OPD appointments. Untrained centres convert 25–35%; trained ones convert 55–70%.'],
      ['patient-retention-rate', 'Patient retention rate', 'The percentage of patients who return to the same hospital within 12 months. The foundation of long-term hospital growth.'],
      ['multi-specialty-hospital', 'Multi-specialty hospital', 'A hospital that offers consultations and treatment across multiple medical specialties under one roof. Marketing requires per-specialty positioning and dedicated landing pages.']
    ];
    const dtsJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': `${canonicalUrl}#glossary`,
      name: 'Hospital Marketing Glossary',
      url: canonicalUrl,
      hasDefinedTerm: terms.map(([slug, name, desc]) => ({
        '@type': 'DefinedTerm',
        '@id': `${canonicalUrl}#${slug}`,
        name: name,
        description: desc,
        inDefinedTermSet: `${canonicalUrl}#glossary`,
        url: `${canonicalUrl}#${slug}`
      }))
    });
    const dtsTag = `<script type="application/ld+json" id="ld-glossary">\n${dtsJson}\n</script>\n</head>`;
    html = html.replace('</head>', dtsTag);
  }

  // 7d. Inject visible FAQ <dl> block into blog pages that have pageFaqs entries.
  //     Inserted immediately before the "Related Articles" footer so crawlers
  //     and AI extractors see the Q&A in rendered HTML, not only in JSON-LD.
  if (pageFaqs[id] && id.startsWith('blog-')) {
    const faqItems = pageFaqs[id].map(([q, a]) =>
      `<dt style="font-weight:700;color:#1a4a6b;margin:16px 0 6px;">${q}</dt>` +
      `<dd style="color:#2c5f84;line-height:1.7;margin:0 0 12px;">${a}</dd>`
    ).join('\n');
    const faqBlock =
      `<div class="faq-list" style="margin-top:40px;padding-top:28px;border-top:1px solid #c8d8e4;">` +
      `<h2 style="font-family:'Playfair Display',serif;font-size:1.35rem;color:#1a4a6b;margin-bottom:20px;">Frequently Asked Questions</h2>` +
      `<dl>${faqItems}\n</dl></div>\n`;
    const relatedMarker = `<div style="margin-top:40px;padding-top:28px;border-top:1px solid #c8d8e4;">` +
      `<p style="color:#1a4a6b;font-weight:600;margin-bottom:16px;">Related Articles</p>`;
    html = html.replace(relatedMarker, faqBlock + relatedMarker);
  }

  if (serviceDefs[id]) {
    const sd = serviceDefs[id];
    const serviceJson = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: sd.name,
      serviceType: sd.serviceType,
      description: sd.description,
      provider: { '@id': 'https://qlarify.health/#org' },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'City', name: 'Bengaluru' },
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Delhi NCR' },
        { '@type': 'City', name: 'Chennai' },
        { '@type': 'City', name: 'Hyderabad' }
      ],
      url: canonicalUrl
    });
    const serviceTag = `<script type="application/ld+json" id="ld-service">\n${serviceJson}\n</script>\n</head>`;
    html = html.replace('</head>', serviceTag);
  }

  if (id !== '404' && breadcrumbNames[id]) {
    const items = [{ '@type':'ListItem', position:1, name:'Home', item:'https://qlarify.health/' }];
    if (id !== 'home') {
      const isBlog = id.indexOf('blog-') === 0;
      if (isBlog) {
        items.push({ '@type':'ListItem', position:2, name:'Blog', item:'https://qlarify.health/blog' });
        items.push({ '@type':'ListItem', position:3, name: breadcrumbNames[id], item: canonicalUrl });
      } else {
        items.push({ '@type':'ListItem', position:2, name: breadcrumbNames[id], item: canonicalUrl });
      }
    }
    const newBcJson = JSON.stringify({
      '@context':'https://schema.org',
      '@type':'BreadcrumbList',
      itemListElement: items
    });
    html = html.replace(
      /(<script type="application\/ld\+json" id="ld-breadcrumb">)[\s\S]*?(<\/script>)/,
      `$1\n${newBcJson}\n$2`
    );
  }

  // 8. Inline critical CSS + make full stylesheet non-blocking.
  //    This breaks the HTML → style.css render-blocking chain: the critical
  //    rules cover the entire above-the-fold first paint; the full sheet is
  //    loaded asynchronously via the print-media trick so it never blocks render.
  const _criticalTag = `<style id="critical-css">${CRITICAL_CSS}</style>`;
  const _deferredLink =
    `<link rel="preload" href="/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">` +
    `<noscript><link rel="stylesheet" href="/style.css"></noscript>`;
  html = html.replace(
    '<link rel="stylesheet" href="/style.css">',
    _criticalTag + '\n' + _deferredLink
  );

  // 9. Write output file
  let outFile;
  if (id === '404') {
    outFile = path.join(DIST, '404.html');
  } else {
    const outDir = path.join(DIST, meta.path || '');
    fs.mkdirSync(outDir, { recursive: true });
    outFile = path.join(outDir, 'index.html');
  }

  fs.writeFileSync(outFile, html);
  generated++;
  console.log(`  ✓ /${meta.path || ''} → ${path.relative(DIST, outFile)}`);
}

// ── Copy static assets ─────────────────────────────────────────────────────

const assetDirs = ['logos', 'og-images'];
// Add 'videos' if the directory exists
if (fs.existsSync(path.join(__dirname, 'videos'))) {
  assetDirs.push('videos');
}
// Add 'images' (self-hosted hero photos) if it exists
if (fs.existsSync(path.join(__dirname, 'images'))) {
  assetDirs.push('images');
}

for (const dir of assetDirs) {
  copyDirSync(path.join(__dirname, dir), path.join(DIST, dir));
  console.log(`  ✓ ${dir}/ copied`);
}

// Copy any root-level static files (og-image, favicon, etc.)
const rootFiles = [
  'style.css',
  'main.js',
  'og-image.png',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'manifest.json',
  '_headers',
];
for (const file of rootFiles) {
  const src = path.join(__dirname, file);
  if (!fs.existsSync(src)) continue;
  if (file === 'style.css') {
    const minified = minifyCSS(fs.readFileSync(src, 'utf8'));
    fs.writeFileSync(path.join(DIST, file), minified);
    const orig = fs.statSync(src).size;
    console.log(`  ✓ ${file} minified (${Math.round(orig/1024)}KB → ${Math.round(minified.length/1024)}KB)`);
  } else if (file === 'main.js') {
    const minified = minifyJS(fs.readFileSync(src, 'utf8'));
    fs.writeFileSync(path.join(DIST, file), minified);
    const orig = fs.statSync(src).size;
    console.log(`  ✓ ${file} minified (${Math.round(orig/1024)}KB → ${Math.round(minified.length/1024)}KB)`);
  } else {
    fs.copyFileSync(src, path.join(DIST, file));
    console.log(`  ✓ ${file} copied`);
  }
}

// ── Build standalone subdomain pages ──────────────────────────────────────
// Each entry: { src: relative path to source HTML, dest: dist output path }
const subdomainPages = [
  { src: '180days/index.html', dest: '180days/index.html' },
];
for (const { src, dest } of subdomainPages) {
  const srcPath = path.join(__dirname, src);
  if (!fs.existsSync(srcPath)) continue;
  const destPath = path.join(DIST, dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  console.log(`  ✓ ${src} → dist/${dest}`);
}

console.log(`\n✅ Built ${generated} pages into dist/`);
