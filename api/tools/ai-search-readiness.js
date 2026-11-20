// Vercel serverless function — hospital AI-search readiness backend.
// GET /api/tools/ai-search-readiness?q=<https://site>  or  ?demo=1
//
// Reads the public homepage plus /robots.txt, /llms.txt and /sitemap.xml,
// and returns what answer engines see: discovery files, JSON-LD identity,
// question-shaped headings, content depth, citability snippets.
// The client computes the score. Plain public fetches only; no key needed.
// Self-contained by design (guards duplicated from website-audit.js so each
// serverless function bundles independently).

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://qlarify.health');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'method-not-allowed' });

  const q = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 300) : '';
  const wantDemo = req.query.demo === '1' || q === '' || q.toLowerCase() === 'demo';
  if (wantDemo) return res.json(demoPayload());

  let base;
  try {
    base = new URL(/^https?:\/\//i.test(q) ? q : 'https://' + q);
  } catch (_) {
    return res.json({ ok: false, error: 'That does not look like a website address. Try https://yourhospital.com' });
  }
  if (base.protocol !== 'http:' && base.protocol !== 'https:') {
    return res.json({ ok: false, error: 'Only http and https addresses can be checked.' });
  }
  if (!isPublicHost(base.hostname)) {
    return res.json({ ok: false, error: 'That address is not a public website.' });
  }

  try {
    const page = await fetchText(base, 9000, 3 * 1024 * 1024);
    if (!page.ok) {
      return res.json({ ok: false, error: 'Could not read that page (' + page.status + '). Check the URL, or try the homepage directly.' });
    }
    const [robots, llms, sitemap] = await Promise.all([
      probe(base, '/robots.txt', 6000),
      probe(base, '/llms.txt', 6000),
      probe(base, '/sitemap.xml', 6000),
    ]);
    return res.json(analyse(base.hostname.replace(/^www\./, ''), base.protocol === 'https:', page.text, { robots, llms, sitemap }));
  } catch (_) {
    return res.json({ ok: false, error: 'Could not reach that site (timeout or connection refused). Check the URL and try again.' });
  }
};

// ── guards + fetch (mirrors website-audit.js) ───────────────────────────────

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

async function fetchRaw(url, timeoutMs) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'user-agent': 'QlarifyHealthAudit/1.0 (public readiness check)',
        'accept': 'text/html,text/plain,application/xml,*/*',
      },
    });
  } finally {
    clearTimeout(t);
  }
}

async function fetchText(url, timeoutMs, cap) {
  let current = url, redirects = 0;
  for (let i = 0; i <= 4; i++) {
    const r = await fetchRaw(current, timeoutMs);
    if (r.status >= 300 && r.status < 400) { if (redirects >= 4) break; redirects++; continue; }
    if (!r.ok) return { ok: false, status: r.status, text: '' };
    const text = await r.text();
    return { ok: true, status: r.status, text: text.length > cap ? text.slice(0, cap) : text };
  }
  return { ok: false, status: 0, text: '' };
}

async function probe(base, pathname, timeoutMs) {
  try {
    const u = new URL(base.origin + pathname);
    const r = await fetchRaw(u, timeoutMs);
    if (!r.ok) return false;
    const text = await r.text();
    return text.trim().length > 0;
  } catch (_) {
    return false;
  }
}

// ── analysis ────────────────────────────────────────────────────────────────

function analyse(site, https, html, files) {
  const title = decodeEnt((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
  const metaDesc = (html.match(/<meta[^>]+name=["']description["'][^>]*>/i) || [])[0] || '';
  const metaDescContent = (metaDesc.match(/content=["']([^"']*)["']/i) || [])[1] || '';

  const ldRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = []; let hasOrg = false, hasHospital = false, hasFAQ = false;
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
      Object.values(node).forEach((v) => { if (v && typeof v === 'object') walk(v); });
    };
    walk(parsed);
    if (!types.length) continue;
    blocks.push(types.join('+'));
    const flat = types.join(' ').toLowerCase();
    if (flat.includes('organization') || flat.includes('localbusiness')) hasOrg = true;
    if (flat.includes('hospital') || flat.includes('medical')) hasHospital = true;
    if (flat.includes('faq')) hasFAQ = true;
  }

  const h2Count = (html.match(/<h2\b/gi) || []).length;

  const headingRe = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi;
  let questionHeadings = 0;
  while ((m = headingRe.exec(html)) !== null) {
    const t = m[1].replace(/<[^>]+>/g, ' ').trim();
    if (t.includes('?') || /^(what|why|how|when|which|who|can|should|is|are|do|does)\b/i.test(t)) questionHeadings++;
  }

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ');
  const wordCount = (text.trim().match(/[A-Za-zऀ-ॿ]{2,}/g) || []).length;

  return {
    ok: true,
    demo: false,
    site, https,
    files: {
      robots: !!files.robots,
      llms: !!files.llms,
      sitemap: !!files.sitemap,
    },
    page: {
      title, titleLen: title.length,
      metaDesc: metaDescContent, metaDescLen: metaDescContent.length,
      h2Count, questionHeadings, wordCount,
      htmlBytes: Buffer.byteLength(html, 'utf8'),
    },
    schema: {
      blocks,
      hasOrg, hasHospital, hasFAQ,
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
// Fictional hospital: robots present, everything else an answer engine
// would want is missing.

function demoPayload() {
  return {
    ok: true,
    demo: true,
    site: 'sunrise-multispecialty.example',
    https: true,
    files: { robots: true, llms: false, sitemap: false },
    page: {
      title: 'Welcome to Sunrise Multispecialty Hospital — Best Hospital | Trusted Care Since 1998 | Our Services',
      titleLen: 96,
      metaDesc: 'Sunrise Multispecialty Hospital — trusted healthcare.',
      metaDescLen: 49,
      h2Count: 2,
      questionHeadings: 0,
      wordCount: 540,
      htmlBytes: 587000,
    },
    schema: {
      blocks: ['WebSite'],
      hasOrg: false, hasHospital: false, hasFAQ: false,
    },
  };
}
