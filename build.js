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
    desc: "India's specialist hospital marketing agency. We build video systems, SEO strategies, and paid media campaigns that turn patient intent into measurable OPD growth and enquiry volume."
  },
  video: {
    path: 'video',
    title: 'Video as Infrastructure for Hospitals | Qlarify Health',
    desc: 'Structured healthcare video production mapped to the patient decision journey. From symptom explainers to 3D animations — build trust and drive 4x more appointment conversions.'
  },
  seo: {
    path: 'seo',
    title: 'Hospital SEO & Medical Content Strategy | Qlarify Health',
    desc: 'Rank on Google for the condition, symptom, and specialist searches your patients actually make. SEO and content marketing built exclusively for hospitals across India.'
  },
  paid: {
    path: 'paid',
    title: 'Hospital Paid Media & Performance Ads | Qlarify Health',
    desc: 'Google Ads and Meta campaigns engineered for patient enquiries, not vanity metrics. Every rupee tracked from ad click to confirmed OPD appointment across your hospital network.'
  },
  social: {
    path: 'social',
    title: 'Social Media Marketing for Hospitals | Qlarify Health',
    desc: 'Platform strategy that positions your specialists as trusted voices and builds patient familiarity on Instagram, Facebook, and LinkedIn — driving brand recall and referral growth.'
  },
  email: {
    path: 'email',
    title: 'Hospital Email & WhatsApp Campaigns | Qlarify Health',
    desc: 'Reactivate your existing patient database with structured email and WhatsApp campaigns. Appointment reminders, health tips, and follow-ups that drive repeat visits at 5x lower cost.'
  },
  opd: {
    path: 'opd',
    title: 'OPD Growth Marketing for Hospitals | Qlarify Health',
    desc: 'End-to-end OPD growth combining digital marketing, call centre training, and front desk alignment. Built for single-location hospitals and multi-specialty clinics across India.'
  },
  about: {
    path: 'about',
    title: 'About Qlarify Health — Our Story & Team',
    desc: "Built from inside India's leading hospital systems. Meet the healthcare marketing team that has produced 1000+ medical videos and grown OPD footfall for top hospital brands."
  },
  contact: {
    path: 'contact',
    title: 'Schedule a Strategy Conversation | Qlarify Health',
    desc: "Let's talk about your hospital's marketing challenges. Book a free 30-minute strategy conversation with our healthcare marketing specialists — no obligations, just clarity."
  },
  privacy: {
    path: 'privacy',
    title: 'Privacy Policy | Qlarify Health',
    desc: 'How Qlarify Health collects, uses, and protects your personal information. Read our full privacy policy covering data handling, cookies, and third-party services.'
  },
  terms: {
    path: 'terms',
    title: 'Terms & Conditions | Qlarify Health',
    desc: 'Terms and conditions governing your use of the Qlarify Health website. Covers intellectual property, limitations of liability, and acceptable use policies.'
  },
  blog: {
    path: 'blog',
    title: 'Hospital Marketing Insights & Guides | Qlarify Health',
    desc: 'Expert strategies for hospital marketing — SEO, video systems, paid media, OPD growth, and patient acquisition. Actionable guides written by healthcare marketing specialists.'
  },
  'blog-hospital-marketing': {
    path: 'blog/what-is-hospital-marketing',
    title: 'What is Hospital Marketing? Complete Guide | Qlarify',
    desc: 'Hospital marketing explained — why clinical sensitivity, patient psychology, and systems thinking matter more than ad spend. A comprehensive guide for healthcare leaders in India.'
  },
  'blog-opd-footfall': {
    path: 'blog/increase-opd-footfall',
    title: 'How to Increase OPD Footfall: 10 Strategies | Qlarify',
    desc: '10 proven strategies to increase OPD footfall — covering hospital SEO, Google Ads, video marketing, call centre training, and structured patient retention campaigns.'
  },
  'blog-video-marketing': {
    path: 'blog/video-marketing-hospitals',
    title: 'Video Marketing for Hospitals: Why It Works | Qlarify',
    desc: 'Why structured video systems outperform random content in healthcare. Map video to the patient decision journey and drive 4x more appointment conversions for your hospital.'
  },
  'blog-hospital-seo': {
    path: 'blog/hospital-seo-guide',
    title: 'Hospital SEO: The Ultimate Guide for 2025 | Qlarify',
    desc: 'How to rank your hospital on Google for searches that actually bring patients. Covers keyword strategy, technical SEO, content planning, and measurement for healthcare organisations.'
  },
  'blog-healthcare-agency': {
    path: 'blog/healthcare-vs-general-agency',
    title: 'Healthcare Agency vs General Agency | Qlarify Health',
    desc: 'Why generic marketing agencies fail at hospital marketing. Learn what to look for in a specialised healthcare partner — from clinical sensitivity to patient journey mapping.'
  },
  'blog-social-media-hospitals': {
    path: 'blog/social-media-strategy-hospitals',
    title: 'Social Media Strategy for Hospitals | Qlarify Health',
    desc: 'A practical social media framework for hospitals — what to post on each platform, how to feature specialists, and how to measure engagement that drives patient appointments.'
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
const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

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

  // 4. Replace Open Graph tags
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

  // 5. Replace Twitter Card tags
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*/,
    `$1${safeTitle}`
  );
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*/,
    `$1${safeDesc}`
  );

  // 6. Handle noindex for 404
  if (meta.noindex) {
    html = html.replace(
      /(<meta name="robots" content=")[^"]*/,
      '$1noindex, nofollow'
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

const assetDirs = ['logos'];
// Add 'videos' if the directory exists
if (fs.existsSync(path.join(__dirname, 'videos'))) {
  assetDirs.push('videos');
}

for (const dir of assetDirs) {
  copyDirSync(path.join(__dirname, dir), path.join(DIST, dir));
  console.log(`  ✓ ${dir}/ copied`);
}

// Copy any root-level static files (og-image, favicon, etc.)
const rootFiles = [
  'og-image.png',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'manifest.json',
];
for (const file of rootFiles) {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DIST, file));
    console.log(`  ✓ ${file} copied`);
  }
}

console.log(`\n✅ Built ${generated} pages into dist/`);
