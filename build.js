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

// ── Page definitions (mirrors pageMeta in index.html) ──────────────────────

const pages = {
  home: {
    path: '',
    title: 'Healthcare Marketing Agency India | Qlarify Health',
    desc: "India's specialist hospital marketing agency. Video, SEO, and paid media engineered to turn patient intent into measurable OPD growth across India."
  },
  video: {
    path: 'video',
    title: 'Healthcare Video Marketing Agency for Multi-Specialty Hospitals in India | Qlarify Health',
    desc: 'Specialist video production for multi-specialty hospitals in India. Permanent patient-education libraries across every department, built in 180 days. Four-stage patient journey framework.'
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
    desc: 'Book a free 30-minute Hospital Video ROI Audit. We map your patient acquisition system and identify the highest-leverage gap. No pitch, no obligation.'
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
    title: 'Hospital SEO: The Ultimate Guide for 2025 | Qlarify',
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
  'blog-hospital-video-production-india': {
    path: 'blog/hospital-video-production-india',
    title: 'Hospital Video Production in India: Strategic Guide | Qlarify',
    desc: 'How hospitals in India should approach video production — vendor-led vs strategy-led, the five asset categories that compound enquiries, and how to choose the right production partner.'
  },
  glossary: {
    path: 'glossary',
    title: 'Hospital Marketing Glossary | Qlarify Health',
    desc: 'Definitions for the terms hospital marketing teams encounter — OPD footfall, hospital SEO, patient acquisition cost, video as infrastructure, and 20+ more.'
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
// Prefer ending the last page block at `</main>` when the template uses a
// <main> landmark wrapping all page divs — that way SUFFIX includes the
// closing </main> and every extracted route has a balanced wrapper. Fall
// back to <footer> for templates without <main>.
const __mainCloseIdx = template.indexOf('</main>', __pageBlocks[__pageBlocks.length - 1].openIdx);
const __footerIdx = template.indexOf('<footer>', __pageBlocks[__pageBlocks.length - 1].openIdx);
const __suffixStart = (__mainCloseIdx !== -1 && __mainCloseIdx < __footerIdx) ? __mainCloseIdx : __footerIdx;
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
  const ogImageUrl = (id !== '404')
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
    'blog-hospital-video-production-india': 'Hospital Video Production in India',
    glossary: 'Glossary'
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

  // 8. Write output file
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

const assetDirs = ['logos', 'og-images', 'slides'];
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
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DIST, file));
    console.log(`  ✓ ${file} copied`);
  }
}

// ── Specialty sub-pages (standalone HTML served at /<slug>/) ──────────
// Source: ./specialty-pages/<slug>.html. Each source is a full standalone
// page (its own <head>, meta, schemas, body content). We inject the shared
// site <nav> right after <body>, and the shared <footer> right before
// </body>, so every specialty inherits the live site's chrome without
// duplicating markup in source.
const specialtyDir = path.join(__dirname, 'specialty-pages');
if (fs.existsSync(specialtyDir)) {
  // Extract shared nav + footer from the main index.html template once.
  const navMatch = template.match(/<nav\b[\s\S]*?<\/nav>/);
  const footerMatch = template.match(/<footer\b[\s\S]*?<\/footer>/);
  // Also grab the Google Tag Manager noscript iframe + the mob-overlay that
  // sit immediately before <nav>, so specialty pages keep analytics + the
  // mobile menu overlay wired up.
  const preNavMatch = template.match(/<!-- Google Tag Manager \(noscript\) -->[\s\S]*?<div id="mob-overlay"[\s\S]*?<\/div>/);
  const sharedNav = (preNavMatch ? preNavMatch[0] + '\n' : '') + (navMatch ? navMatch[0] : '');
  const sharedFooter = footerMatch ? footerMatch[0] : '';

  for (const filename of fs.readdirSync(specialtyDir)) {
    if (!filename.endsWith('.html')) continue;
    const slug = filename.replace(/\.html$/, '');
    const src = path.join(specialtyDir, filename);
    let html = fs.readFileSync(src, 'utf8');

    // Inject shared nav immediately after <body ...>
    if (sharedNav) {
      html = html.replace(/(<body[^>]*>)/, `$1\n${sharedNav}\n<main id="main-content">`);
    }
    // Inject shared footer + close <main> right before </body>
    if (sharedFooter) {
      html = html.replace(/<\/body>/, `</main>\n${sharedFooter}\n</body>`);
    }

    const destDir = path.join(DIST, slug);
    fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(path.join(destDir, 'index.html'), html);
    console.log(`  ✓ /${slug} → ${slug}/index.html (specialty page, ${html.length} bytes)`);
  }
}

// ── Minify style.css + main.js in place inside dist/ ──────────────────
// Lighthouse flagged ~3 KiB savings on style.css, ~4 KiB on main.js.
// clean-css (CSS) + esbuild (JS) both run synchronously in <200 ms total.
try {
  const CleanCSS = require('clean-css');
  const cssPath = path.join(DIST, 'style.css');
  if (fs.existsSync(cssPath)) {
    const input = fs.readFileSync(cssPath, 'utf8');
    const { styles, errors } = new CleanCSS({ level: 2 }).minify(input);
    if (errors && errors.length) throw new Error(errors.join('; '));
    fs.writeFileSync(cssPath, styles);
    console.log(`  ✓ style.css minified (${input.length} → ${styles.length} bytes)`);
  }
} catch (err) {
  console.warn(`  ⚠ style.css minify skipped: ${err.message}`);
}

try {
  const esbuild = require('esbuild');
  const jsPath = path.join(DIST, 'main.js');
  if (fs.existsSync(jsPath)) {
    const input = fs.readFileSync(jsPath, 'utf8');
    const result = esbuild.transformSync(input, { minify: true, loader: 'js', target: 'es2018' });
    fs.writeFileSync(jsPath, result.code);
    console.log(`  ✓ main.js minified (${input.length} → ${result.code.length} bytes)`);
  }
} catch (err) {
  console.warn(`  ⚠ main.js minify skipped: ${err.message}`);
}

console.log(`\n✅ Built ${generated} pages into dist/`);
