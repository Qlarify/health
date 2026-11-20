// Vercel serverless function — YouTube channel analyzer backend.
// GET /api/tools/youtube?q=<channel url|handle|id>  or  ?demo=1
//
// With YOUTUBE_API_KEY set: resolves the channel via the YouTube Data API v3,
// pulls the ~50 most recent uploads and the top videos, and returns the raw
// numbers. The client computes scores.
// Without a key (or ?demo=1): returns a clearly-labelled sample dataset for a
// fictional hospital channel so the tool still demonstrates its full report.

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://qlarify.health');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'method-not-allowed' });

  const q = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 200) : '';
  const wantDemo = req.query.demo === '1' || q === '' || q.toLowerCase() === 'demo';

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (wantDemo || !apiKey) return res.json(demoPayload());

  try {
    const channelId = await resolveChannel(q, apiKey);
    if (!channelId) {
      return res.json({ ok: false, error: 'Could not find a channel for that input. Paste a full channel URL (youtube.com/@name or youtube.com/channel/UC…).' });
    }

    const chRes = await yt('channels', {
      part: 'snippet,statistics,contentDetails',
      id: channelId,
    }, apiKey);
    const ch = chRes.items && chRes.items[0];
    if (!ch) return res.json({ ok: false, error: 'Channel not found.' });

    const uploadsId = (ch.contentDetails && ch.contentDetails.relatedPlaylists && ch.contentDetails.relatedPlaylists.uploads) || '';
    let recent = [];
    if (uploadsId) {
      const pl = await yt('playlistItems', { part: 'contentDetails', playlistId: uploadsId, maxResults: '50' }, apiKey);
      recent = (pl.items || []).map((it) => it.contentDetails.videoId).filter(Boolean);
    }

    let videos = [];
    let top = [];
    if (recent.length) {
      const stats = await yt('videos', { part: 'snippet,statistics', id: recent.join(',') }, apiKey);
      videos = (stats.items || []).map((v) => ({
        title: (v.snippet && v.snippet.title) || '',
        publishedAt: (v.snippet && v.snippet.publishedAt) || '',
        views: Number((v.statistics && v.statistics.viewCount) || 0),
        likes: Number((v.statistics && v.statistics.likeCount) || 0),
        comments: Number((v.statistics && v.statistics.commentCount) || 0),
        descLen: ((v.snippet && v.snippet.description) || '').length,
        hasLink: /https?:\/\/|wa\.me|whatsapp/i.test((v.snippet && v.snippet.description) || ''),
      }));
      videos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    try {
      const search = await yt('search', { part: 'snippet', channelId: channelId, order: 'viewCount', type: 'video', maxResults: '5' }, apiKey);
      top = (search.items || []).map((it) => ({
        title: (it.snippet && it.snippet.title) || '',
        publishedAt: (it.snippet && it.snippet.publishedAt) || '',
        views: 0,
        url: 'https://www.youtube.com/watch?v=' + ((it.id && it.id.videoId) || ''),
      }));
    } catch (_) { /* top videos are optional; search quota may be exhausted */ }

    return res.json({
      ok: true,
      demo: false,
      channel: {
        title: (ch.snippet && ch.snippet.title) || '—',
        subs: Number((ch.statistics && ch.statistics.subscriberCount) || 0),
        videoCount: Number((ch.statistics && ch.statistics.videoCount) || 0),
        totalViews: Number((ch.statistics && ch.statistics.viewCount) || 0),
        publishedAt: (ch.snippet && ch.snippet.publishedAt) || '',
      },
      videos,
      top,
    });
  } catch (err) {
    const status = err && err.status;
    if (status === 403) {
      return res.json({ ok: false, error: 'Live analysis is temporarily unavailable (the data quota is exhausted). Try again later, or use the sample data to see the full report.' });
    }
    if (status === 400) {
      return res.json({ ok: false, error: 'Could not read that channel. Paste a full channel URL (youtube.com/@name or youtube.com/channel/UC…).' });
    }
    return res.json({ ok: false, error: 'Could not reach the data service. Please try again.' });
  }
};

// ── helpers ────────────────────────────────────────────────────────────────

async function yt(endpoint, params, apiKey) {
  const qs = new URLSearchParams(params);
  qs.set('key', apiKey);
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 9000);
  try {
    const r = await fetch(`https://www.googleapis.com/youtube/v3/${endpoint}?${qs.toString()}`, {
      signal: ctrl.signal,
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      const e = new Error((j.error && j.error.message) || 'yt api error');
      e.status = r.status;
      throw e;
    }
    return j;
  } finally {
    clearTimeout(t);
  }
}

async function resolveChannel(q, apiKey) {
  let s = q.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/^m\./i, '');
  if (!s) return null;
  if (s.startsWith('youtube.com') || s.startsWith('youtu.be')) {
    const mChannel = s.match(/channel\/(UC[A-Za-z0-9_-]{10,})/);
    if (mChannel) return mChannel[1];
    const mHandle = s.match(/youtube\.com\/@([A-Za-z0-9._-]+)/);
    if (mHandle) return byHandle(mHandle[1], apiKey);
    const mUser = s.match(/youtube\.com\/(?:user|c)\/([A-Za-z0-9._-]+)/);
    if (mUser) return byLegacy(mUser[1], apiKey);
    return null;
  }
  if (s.startsWith('@')) return byHandle(s.slice(1), apiKey);
  if (/^UC[A-Za-z0-9_-]{10,}$/.test(s)) return s;
  return byHandle(s, apiKey);
}

async function byHandle(handle, apiKey) {
  try {
    const r = await yt('channels', { part: 'id', forHandle: '@' + handle.replace(/^@/, '') }, apiKey);
    if (r.items && r.items[0]) return r.items[0].id;
  } catch (_) { /* fall through to search */ }
  return byLegacy(handle, apiKey);
}

async function byLegacy(name, apiKey) {
  try {
    const r = await yt('search', { part: 'snippet', q: name, type: 'channel', maxResults: '1' }, apiKey);
    const it = r.items && r.items[0];
    if (it && it.snippet && it.snippet.channelId) return it.snippet.channelId;
  } catch (_) { /* ignore */ }
  return null;
}

// ── demo payload ───────────────────────────────────────────────────────────
// Fictional hospital channel with the patterns we see in real channel audits:
// event-driven uploads, brochure titles, declining reach, empty descriptions.

function demoPayload() {
  const now = Date.now();
  const DAY = 86400000;
  const vids = [
    ['Sunrise Hospital celebrates World Heart Day 2026', 96, 5],
    ['Free Health Check-up Camp | Sunrise Hospital', 74, 20],
    ['World Arthritis Day Celebration at Sunrise Hospital', 61, 35],
    ['Knee Replacement Surgery at Sunrise Hospital', 6400, 50],
    ['Sunrise Hospital Annual Report 2025', 43, 65],
    ['Doctor’s Day Celebration 2026', 89, 95],
    ['When is knee replacement surgery the only option? 5 signs', 11200, 130],
    ['Sunrise Hospital — Our New Wing Inauguration', 210, 160],
    ['IVF Awareness Walk by Sunrise Hospital', 150, 185],
    ['How does IVF work? Our fertility specialist explains', 8300, 210],
    ['Republic Day Celebration at Sunrise Hospital', 67, 240],
    ['Heart attack symptoms everyone should know', 15600, 265],
    ['Sunrise Hospital Diwali Celebration', 54, 285],
    ['What is angioplasty? Cardiologist explains in 5 minutes', 9800, 310],
    ['Best hospital in the city | Sunrise Hospital TV Ad', 430, 335],
    ['Diabetes and your kidneys — what patients ignore', 7400, 360],
    ['Cataract surgery at Sunrise Hospital', 5100, 385],
    ['Sunrise Hospital New Year Wishes', 71, 410],
    ['Patient testimonial — knee replacement recovery', 6900, 435],
    ['World Health Day Walkathon', 130, 460],
    ['Thyroid: symptoms every woman should know', 8800, 490],
    ['Our ICU — A tour with the critical care head', 3200, 520],
    ['Sunrise Hospital Independence Day Celebration', 88, 550],
    ['Ganesh Chaturthi at Sunrise Hospital', 102, 580],
  ];
  const videos = vids.map((v) => ({
    title: v[0],
    publishedAt: new Date(now - v[2] * DAY).toISOString(),
    views: v[1] >= 5000 ? v[1] * 3 : v[1],
    likes: Math.max(1, Math.round(v[1] / 18)),
    comments: Math.max(0, Math.round(v[1] / 90)),
    descLen: v[1] >= 5000 ? 480 : 40,
    hasLink: v[1] >= 5000,
  }));
  return {
    ok: true,
    demo: true,
    channel: {
      title: 'Sunrise Multispecialty Hospital (Sample Data)',
      subs: 24800,
      videoCount: 96,
      totalViews: 1840000,
      publishedAt: new Date(now - 1500 * DAY).toISOString(),
    },
    videos,
    top: [
      { title: 'Heart attack symptoms everyone should know', views: 46800, publishedAt: new Date(now - 110 * DAY).toISOString() },
      { title: 'When is knee replacement surgery the only option? 5 signs', views: 33600, publishedAt: new Date(now - 22 * DAY).toISOString() },
      { title: 'Thyroid: symptoms every woman should know', views: 26400, publishedAt: new Date(now - 400 * DAY).toISOString() },
      { title: 'What is angioplasty? Cardiologist explains in 5 minutes', views: 29400, publishedAt: new Date(now - 150 * DAY).toISOString() },
      { title: 'How does IVF work? Our fertility specialist explains', views: 24900, publishedAt: new Date(now - 50 * DAY).toISOString() },
    ],
  };
}
