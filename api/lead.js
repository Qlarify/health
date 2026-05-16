// Vercel serverless function — handles audit and contact form submissions.
// Sends internal notification + submitter confirmation via Resend.
// Requires RESEND_API_KEY env var; without it returns fallbackRequired:true
// so the client can show a WhatsApp CTA instead.

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://qlarify.health');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const body = req.body || {};

  if (!body.consent) return res.status(400).json({ ok: false, error: 'consent-required' });
  if (!body.hospital || !body.name || !body.email) {
    return res.status(400).json({ ok: false, error: 'missing-fields' });
  }

  const email = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  if (!email(body.email)) return res.status(400).json({ ok: false, error: 'invalid-email' });

  const s = (v, n = 500) => (typeof v === 'string' ? v.trim().slice(0, n) : '—');

  const hospital  = s(body.hospital);
  const name      = s(body.name);
  const emailAddr = s(body.email, 200);
  const city      = s(body.city);
  const challenge = s(body.challenge, 1500);
  const role      = s(body.role);
  const phone     = s(body.phone);

  const apiKey = process.env.RESEND_API_KEY;
  const from   = process.env.RESEND_FROM || 'Qlarify Health <info@qlarify.health>';
  const toTeam = 'info@qlarify.health';

  if (!apiKey) {
    return res.json({ ok: true, fallbackRequired: true });
  }

  const send = (payload) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((r) => ({ ok: r.ok, status: r.status }));

  const internalText = [
    `New audit request via qlarify.health`,
    ``,
    `Hospital:  ${hospital}`,
    `Contact:   ${name}${role ? ' — ' + role : ''}`,
    `Email:     ${emailAddr}`,
    `Phone:     ${phone}`,
    `City:      ${city}`,
    ``,
    `Challenge:`,
    challenge || '—',
    ``,
    `Reply directly to respond to the sender.`,
  ].join('\n');

  const confirmText = [
    `Hi ${name},`,
    ``,
    `Thanks for requesting a free Video ROI Audit for ${hospital}.`,
    `We'll review your channel and send a written report within 48 hours.`,
    ``,
    `If you have anything else to share in the meantime, just reply to this email.`,
    ``,
    `— Qlarify Health`,
    `info@qlarify.health · +91 81474 10751`,
  ].join('\n');

  const [internal, confirm] = await Promise.all([
    send({ from, to: toTeam, reply_to: emailAddr, subject: `New audit request — ${hospital} (${name})`, text: internalText }),
    send({ from, to: emailAddr, reply_to: toTeam, subject: `We received your audit request — Qlarify Health`, text: confirmText }),
  ]);

  return res.json({
    ok: true,
    delivered: { internal: internal.ok, confirmation: confirm.ok },
    fallbackRequired: !internal.ok && !confirm.ok,
  });
};
