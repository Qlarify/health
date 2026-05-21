/**
 * lib/sanity-build.js
 *
 * CommonJS module used by build.js at build time to:
 *  1. Fetch published insight articles from Sanity
 *  2. Convert Portable Text body + FAQs to the site's existing styled HTML
 *
 * Environment variables required (set in Vercel and locally in .env.local):
 *   SANITY_PROJECT_ID  = qdu0z4t2
 *   SANITY_DATASET     = production
 *   SANITY_API_TOKEN   = sk...  (viewer token is enough for read-only)
 *
 * Usage in build.js:
 *   const { fetchSanityInsights } = require('./lib/sanity-build');
 *   const sanityArticles = await fetchSanityInsights();
 *   // returns [{ id, slug, title, desc, breadcrumbLabel, html }, ...]
 */

'use strict';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Format ISO date "2026-06-01" → "JUN 2026" */
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00Z');
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Portable Text → Site-styled HTML ──────────────────────────────────────
//
// The site uses inline styles everywhere (no CSS classes inside articles).
// This renderer mirrors the existing article HTML patterns exactly.

function ptBlockToHtml(block) {
  if (block._type !== 'block') return '';

  const style = block.style || 'normal';
  const children = (block.children || []).map(child => {
    let text = escHtml(child.text || '');

    // Apply marks (decorators + annotations) from inside out
    const marks = child.marks || [];
    for (const mark of marks) {
      if (mark === 'strong') {
        text = `<strong style="color:#1a4a6b;">${text}</strong>`;
      } else if (mark === 'em') {
        text = `<em>${text}</em>`;
      } else {
        // Could be an annotation key (link)
        const annotation = (block.markDefs || []).find(d => d._key === mark);
        if (annotation && annotation._type === 'link') {
          const href = escHtml(annotation.href || '#');
          const isInternal = href.startsWith('/') && annotation.pageId;
          if (isInternal) {
            text = `<a href="${href}" onclick="navTo(event,'${escHtml(annotation.pageId)}')" style="color:#E8835F;">${text}</a>`;
          } else if (href.startsWith('/')) {
            text = `<a href="${href}" style="color:#E8835F;">${text}</a>`;
          } else {
            text = `<a href="${href}" target="_blank" rel="noopener" style="color:#E8835F;">${text}</a>`;
          }
        }
      }
    }
    return text;
  }).join('');

  switch (style) {
    case 'h2':
      return `<h2 style="font-family:'Playfair Display',serif;font-size:1.5rem;color:#1a4a6b;margin:32px 0 14px;">${children}</h2>`;
    case 'h3':
      return `<h3 style="font-family:'Playfair Display',serif;font-size:1.2rem;color:#1a4a6b;margin:24px 0 10px;">${children}</h3>`;
    case 'blockquote':
      return `<blockquote style="border-left:3px solid #E8835F;margin:24px 0;padding:12px 20px;color:#1a4a6b;font-style:italic;background:#FAF7F2;border-radius:0 8px 8px 0;">${children}</blockquote>`;
    case 'normal':
    default:
      return children ? `<p>${children}</p>` : '';
  }
}

/** Convert a Portable Text array to the article's inner HTML */
function portableTextToHtml(blocks) {
  if (!Array.isArray(blocks)) return '';
  return blocks.map(ptBlockToHtml).filter(Boolean).join('\n');
}

// ── FAQ renderer ──────────────────────────────────────────────────────────

function renderFaqs(faqs) {
  if (!faqs || faqs.length === 0) return '';
  const items = faqs.map(faq => `
<details style="border:1px solid #D8D1C2;border-radius:12px;padding:18px 20px;margin-bottom:12px;">
<summary style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;color:#1a4a6b;cursor:pointer;font-size:1rem;">${escHtml(faq.question)}</summary>
<p style="color:#5C6677;margin-top:12px;line-height:1.75;">${escHtml(faq.answer)}</p>
</details>`).join('\n');
  return `<div style="margin:36px 0;">\n${items}\n</div>`;
}

// ── Full article HTML builder ─────────────────────────────────────────────

function buildArticlePageHtml(doc) {
  const slug = doc.slug?.current || doc.slug;
  const category = (doc.category || 'Editorial').toUpperCase();
  const dateStr = formatDate(doc.date);
  const datePill = dateStr ? `${category} · ${dateStr}` : category;
  const author = doc.author || 'Qlarify Health Team';
  const readTime = doc.readTime || '8 min';
  const tldr = doc.tldr || '';
  const ctaHeading = doc.ctaHeading || 'Ready to grow your hospital\'s patient volume?';
  const ctaBody = doc.ctaBody || 'We build hospital marketing systems that convert — from search to OPD appointment.';
  const ctaButton = doc.ctaButton || 'Book a discovery call';

  const breadcrumbLabel = doc.breadcrumbLabel || doc.title.split(':')[0].trim();

  const bodyHtml = portableTextToHtml(doc.body || []);
  const faqsHtml = renderFaqs(doc.faqs || []);

  return `<div id="page-insights-${slug}" class="page">
<div class="breadcrumb"><a href="/" onclick="navTo(event,'home')">Home</a><span style="opacity:.25;margin:0 4px;">›</span><a href="/insights" onclick="navTo(event,'insights')">Insights</a><span style="opacity:.25;margin:0 4px;">›</span><span class="cur">${escHtml(breadcrumbLabel)}</span></div>
<article style="padding:40px 24px 60px;max-width:780px;margin:0 auto;">
<p class="tldr" style="background:#FAF7F2;border-left:4px solid #E8835F;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:28px;font-size:0.95rem;color:#1a4a6b;line-height:1.7;"><strong>TL;DR:</strong> ${escHtml(tldr)}</p>
<p style="color:#E8835F;font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:12px;">${escHtml(datePill)}</p>
<h1 style="font-family:'Playfair Display',serif;font-size:2.2rem;color:#1a4a6b;margin-bottom:16px;line-height:1.25;">${escHtml(doc.title)}</h1>
<p style="color:#5C6677;font-size:0.9rem;margin-bottom:32px;">By <strong>${escHtml(author)}</strong> · ${escHtml(readTime)} read</p>
<div style="color:#5C6677;line-height:1.85;font-size:1.02rem;">
${bodyHtml}
</div>
${faqsHtml}
<div style="background:#FAF7F2;border-radius:12px;padding:24px;margin:36px 0;">
<p style="font-family:'Playfair Display',serif;font-size:1.1rem;color:#1a4a6b;font-weight:700;margin-bottom:8px;">${escHtml(ctaHeading)}</p>
<p style="color:#5C6677;font-size:0.95rem;margin-bottom:16px;">${escHtml(ctaBody)}</p>
<button onclick="navTo(event,'contact')" style="background:#E8835F;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;cursor:pointer;font-size:0.95rem;">${escHtml(ctaButton)}</button>
</div>
</article>
</div>`;
}

// ── Sanity fetch ──────────────────────────────────────────────────────────

/**
 * Fetch all published (draft != true) insight articles from Sanity.
 *
 * Returns an array of objects consumed by build.js:
 * {
 *   id:              string  — page ID used in build.js `pages` object, e.g. "insights-my-slug"
 *   slug:            string  — URL slug, e.g. "my-slug"
 *   title:           string  — full page title for <title> and OG
 *   desc:            string  — meta description
 *   breadcrumbLabel: string  — short label for breadcrumb nav
 *   html:            string  — complete <div id="page-insights-..."> HTML block
 * }
 */
async function fetchSanityInsights() {
  const projectId = process.env.SANITY_PROJECT_ID || 'qdu0z4t2';
  const dataset   = process.env.SANITY_DATASET    || 'production';
  const token     = process.env.SANITY_API_TOKEN;

  if (!token) {
    console.warn('  ⚠️  SANITY_API_TOKEN not set — skipping Sanity fetch.');
    return [];
  }

  let createClient;
  try {
    ({ createClient } = require('@sanity/client'));
  } catch (e) {
    console.warn('  ⚠️  @sanity/client not installed — run npm install. Skipping Sanity fetch.');
    return [];
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
  });

  const query = `*[_type == "insight" && draft != true] | order(date desc) {
    title,
    "slug": slug.current,
    description,
    category,
    date,
    author,
    authorRole,
    authorInitials,
    readTime,
    featured,
    keywords,
    tldr,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href,
          pageId
        }
      }
    },
    faqs,
    ctaHeading,
    ctaBody,
    ctaButton
  }`;

  let docs;
  try {
    docs = await client.fetch(query);
  } catch (err) {
    console.error('  ✗ Sanity fetch failed:', err.message);
    return [];
  }

  if (!docs || docs.length === 0) {
    console.log('  ℹ️  No published Sanity insights found.');
    return [];
  }

  console.log(`  ✓ Sanity: fetched ${docs.length} published insight(s)`);

  return docs.map(doc => {
    const slug = doc.slug;
    const id   = `insights-${slug}`;
    const breadcrumbLabel = doc.title.includes(':')
      ? doc.title.split(':')[0].trim()
      : doc.title.length > 40
        ? doc.title.substring(0, 37) + '...'
        : doc.title;

    return {
      id,
      slug,
      title: doc.title,
      desc: doc.description,
      breadcrumbLabel,
      html: buildArticlePageHtml({ ...doc, breadcrumbLabel }),
    };
  });
}

module.exports = { fetchSanityInsights, buildArticlePageHtml, portableTextToHtml };
