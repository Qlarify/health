// Vercel serverless function — hospital website quick-audit backend.
// GET /api/tools/website-audit?q=<https://site>  or  ?demo=1
//
// Fetches ONE public page (the homepage) with strict guards, reads it the way
// a first-visit patient and a search engine do, and returns raw numbers.
// The client computes the score and the fixes. No key needed — this is a
// plain public fetch; without ?q it returns a clearly-labelled sample result.

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://qlarify.health');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'method-not-allowed' });

  const q = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 300) : '';
  const wantDemo = req.query.demo === '1' || q === '' || q.toLowerCase() === 'demo';
  if (wantDemo) return res.json(demoPayload());

  let target;
  try {
    target = new URL(/^https?:\/\//i.test(q) ? q : 'https://' + q);
  } catch (_) {
    return res.json({ ok: false, error: 'That does not look like a website address. Try https://yourhospital.com' });
  }
  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return res.json({ ok: false, error: 'Only http and https addresses can be audited.' });
  }
  if (!isPublicHost(target.hostname)) {
    return res.json({ ok: false, error: 'That address is not a public website.' });
  }

  let finalUrl = target, redirects = 0, html = '', status = 0;
  try {
    for (let i = 0; i <= 4; i++) {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 9000);
      let r;
      try {
        r = await fetch(finalUrl, {
          redirect: 'manual',
          signal: ctrl.signal,
          headers: {
            'user-agent': 'QlarifyHealthAudit/1.0 (public homepage health check)',
            'accept': 'text/html,application/xhtml+xml',
          },
        });
      } finally {
        clearTimeout(t);
      }
      status = r.status;
      if (r.status >= 300 && r.status < 400 && r.headers.get('location')) {
        if (redirects >= 4) break;
        const next = new URL(r.headers.get('location'), finalUrl);
        if (next.protocol !== 'http:' && next.protocol !== 'https:') break;
        if (!isPublicHost(next.hostname)) break;
        finalUrl = next;
        redirects++;
        continue;
      }
      if (!r.ok) {
        return res.json({ ok: false, error: 'The site answered with error ' + r.status + '. Check the URL, or try the homepage directly.' });
      }
      const reader = r.body && r.body.getReader ? r.body.getReader() : null;
      if (reader) {
        let received = 0; const chunks = []; const CAP = 3 * 1024 * 1024;
        while (received < CAP) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(Buffer.from(value));
          received += value.length;
        }
        if (r.body.getReader) { try { await reader.cancel(); } catch (_) {} }
        html = Buffer.concat(chunks).toString('utf8');
      } else {
        html = await r.text();
      }
      break;
    }
  } catch (_) {
    return res.json({ ok: false, error: 'Could not reach that site (timeout or connection refused). Check the URL and try again.' });
  }
  if (status === 0 || !html) {
    return res.json({ ok: false, error: 'Could not read that page (too many redirects or an empty response).' });
  }

  return res.json(analyse(finalUrl.hostname.replace(/^www\./, ''), finalUrl.protocol === 'https:', redirects, html));
};

// ── guards ──────────────────────────────────────────────────────────────────

function isPublicHost(host) {
  const h = String(host || '').toLowerCase();
  if (!h) return false;
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal') || h.endsWith('.lan')) return false;
  if (h === '0.0.0.0' || h === '::1' || h === '[::1]') return false;
  const v4 = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const a = +v4[1], b = +v4[2];
    if (a === 0 || a === 10 || a === 127) return false;
    if (a === 100 && b >= 64 && b <= 127) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
    if (a >= 224) return false;
  }
  return true;
}

// ── analysis ────────────────────────────────────────────────────────────────

function analyse(site, https, redirects, html) {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch ? headMatch[1] : '';

  const title = decodeEnt((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
  const metaDesc = (html.match(/<meta[^>]+name=["']description["'][^>]*>/i) || [])[0] || '';
  const metaDescContent = (metaDesc.match(/content=["']([^"']*)["']/i) || [])[1] || '';
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const canonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const lang = (html.match(/<html[^>]*\blang=["']([a-z-]+)["']/i) || [])[1] || '';

  const scriptsAll = (html.match(/<script\b[^>]*\bsrc=/gi) || []).length;
  const headScripts = head.match(/<script\b[^>]*>/gi) || [];
  let blockingScripts = 0;
  headScripts.forEach((tag) => { if (/\bsrc=/i.test(tag) && !/\b(defer|async)\b/i.test(tag)) blockingScripts++; });
  const stylesheets = (html.match(/<link\b[^>]+rel=["']?stylesheet/gi) || []).length;

  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  let imagesNoDims = 0;
  imgTags.forEach((tag) => { if (!/\bwidth\s*=/i.test(tag) || !/\bheight\s*=/i.test(tag)) imagesNoDims++; });

  const h1Count = (html.match(/<h1\b/gi) || []).length;

  // JSON-LD schema blocks
  const ldRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = []; let hasOrg = false, hasHospital = false, hasPhysician = false, hasFAQ = false;
  let aggregateRating = null;
  let m;
  while ((m = ldRe.exec(html)) !== null) {
    let parsed;
    try { parsed = JSON.parse(m[1]); } catch (_) { continue; }
    const types = [];
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(walk); return; }
      const t = node['@type'];
      if (typeof t === 'string') types.push(t);
      if (Array.isArray(t)) types.push(...t);
      if (node.aggregateRating && node.aggregateRating.ratingValue) {
        aggregateRating = {
          ratingValue: String(node.aggregateRating.ratingValue),
          reviewCount: Number(node.aggregateRating.reviewCount || node.aggregateRating.ratingCount || 0),
        };
      }
      Object.values(node).forEach((v) => { if (v && typeof v === 'object') walk(v); });
    };
    walk(parsed);
    if (!types.length) continue;
    blocks.push(types.join('+'));
    const flat = types.join(' ').toLowerCase();
    if (flat.includes('organization') || flat.includes('localbusiness')) hasOrg = true;
    if (flat.includes('hospital') || flat.includes('medical')) hasHospital = true;
    if (flat.includes('physician') || flat.includes('doctor')) hasPhysician = true;
    if (flat.includes('faq')) hasFAQ = true;
  }

  // Visible text (strip script/style blocks and tags)
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ');
  const wordCount = (text.trim().match(/[A-Za-zऀ-ॿ]{2,}/g) || []).length;

  const phone = text.match(/(\+91[\s.-]?)?[6-9]\d{9}\b/) || text.match(/\b0\d{2,5}[\s-]?\d{6,8}\b/);
  const pincode = text.match(/\b[1-9]\d{5}\b/);
  const addressHints = /\b(address|road|rd\.?|street|nagar|colony|sector|phase|layout|cross|main road)\b/i.test(text);
  const whatsappLink = /wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(html);
  const bookingLink = /\b(book|appointment|opd|consult|schedule)\b/i.test(html);
  const emailLink = /mailto:/i.test(html);

  return {
    ok: true,
    demo: false,
    site, https, redirects,
    page: {
      title, titleLen: title.length,
      metaDesc: metaDescContent, metaDescLen: metaDescContent.length,
      canonical, viewport, lang,
      h1Count,
      htmlBytes: Buffer.byteLength(html, 'utf8'),
      scripts: scriptsAll, blockingScripts, stylesheets,
      images: imgTags.length, imagesNoDims,
      wordCount,
    },
    schema: {
      blocks,
      hasOrg, hasHospital, hasPhysician, hasFAQ,
      aggregateRating,
    },
    nap: {
      phone: phone ? phone[0] : null,
      addressHints, pincode: pincode ? pincode[0] : null,
      whatsappLink, bookingLink, emailLink,
    },
  };
}

function decodeEnt(s) {
  return String(s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .trim().replace(/\s+/g, ' ');
}

// ── demo payload ────────────────────────────────────────────────────────────
// Fictional hospital homepage with the patterns we see in real audits:
// heavy page, no schema identity, no visible phone, no booking path.

function demoPayload() {
  return {
    ok: true,
    demo: true,
    site: 'sunrise-multispecialty.example',
    https: true,
    redirects: 1,
    page: {
      title: 'Welcome to Sunrise Multispecialty Hospital — Best Hospital | Trusted Care Since 1998 | Our Services',
      titleLen: 96,
      metaDesc: '',
      metaDescLen: 0,
      canonical: false,
      viewport: true,
      lang: 'en',
      h1Count: 0,
      htmlBytes: 587000,
      scripts: 21, blockingScripts: 9, stylesheets: 6,
      images: 34, imagesNoDims: 30,
      wordCount: 610,
    },
    schema: {
      blocks: ['WebSite', 'BreadcrumbList'],
      hasOrg: false, hasHospital: false, hasPhysician: false, hasFAQ: false,
      aggregateRating: null,
    },
    nap: {
      phone: null,
      addressHints: false, pincode: null,
      whatsappLink: false, bookingLink: false, emailLink: true,
    },
  };
}
