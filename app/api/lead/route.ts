import { NextResponse } from "next/server";
import { postToSlack, sendEmailViaResend } from "@/lib/notify";
import { logEvent, logWarn, redactEmail } from "@/lib/log";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type LeadBody = {
  hospital?: string;
  size?: string;
  channel?: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  notes?: string;
  consent?: boolean;
};

const isString = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

const isEmail = (v: unknown): v is string =>
  isString(v) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const cap = (v: string, n = 500) => (v.length > n ? v.slice(0, n) : v);

export async function POST(req: Request) {
  const start = Date.now();
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    logWarn("lead.rejected", { reason: "invalid-json" });
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  // DPDP — consent must be explicitly true.
  if (body.consent !== true) {
    logWarn("lead.rejected", { reason: "consent-required" });
    return NextResponse.json(
      { ok: false, error: "consent-required" },
      { status: 400 }
    );
  }

  // Required fields
  if (!isString(body.hospital)) {
    logWarn("lead.rejected", { reason: "hospital-required" });
    return NextResponse.json({ ok: false, error: "hospital-required" }, { status: 400 });
  }
  if (!isString(body.name)) {
    logWarn("lead.rejected", { reason: "name-required" });
    return NextResponse.json({ ok: false, error: "name-required" }, { status: 400 });
  }
  if (!isEmail(body.email)) {
    logWarn("lead.rejected", { reason: "email-required" });
    return NextResponse.json({ ok: false, error: "email-required" }, { status: 400 });
  }

  // Sanitize what we'll forward
  const safe = {
    hospital: cap(body.hospital ?? ""),
    size: cap(body.size ?? "—"),
    channel: cap(body.channel ?? "—"),
    name: cap(body.name ?? ""),
    role: cap(body.role ?? "—"),
    email: cap(body.email ?? ""),
    phone: cap(body.phone ?? "—"),
    notes: cap(body.notes ?? "", 1500),
  };

  const summary = [
    `*New audit request*`,
    `*Hospital:* ${safe.hospital} (${safe.size})`,
    `*Contact:* ${safe.name} — ${safe.role}`,
    `*Email:* ${safe.email}`,
    `*Phone:* ${safe.phone}`,
    `*Channel:* ${safe.channel}`,
    safe.notes && `*Notes:* ${safe.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Fan out — Slack notification, internal team email (lands at info@), and a
  // confirmation email back to the submitter. All three run in parallel.
  const internalEmailText = [
    `New lead via qlarify.health`,
    ``,
    `Hospital:  ${safe.hospital} (${safe.size})`,
    `Contact:   ${safe.name} — ${safe.role}`,
    `Email:     ${safe.email}`,
    `Phone:     ${safe.phone}`,
    `Channel:   ${safe.channel}`,
    ``,
    `Notes:`,
    safe.notes || "—",
    ``,
    `—`,
    `Reply directly to this email to respond to the sender.`,
  ].join("\n");

  const [slackResult, internalResult, confirmationResult] = await Promise.all([
    postToSlack({ text: summary }),
    sendEmailViaResend({
      to: site.email,
      replyTo: safe.email,
      subject: `New lead — ${safe.hospital} (${safe.name})`,
      text: internalEmailText,
    }),
    sendEmailViaResend({
      to: safe.email,
      replyTo: site.email,
      subject: `We received your message — Qlarify Health`,
      text: [
        `Hi ${safe.name},`,
        ``,
        `Thanks for reaching out about ${safe.hospital}. A real human at Qlarify Health will be back to you within one working day, often within a few hours.`,
        ``,
        `If you'd like to share anything else in the meantime, just reply to this email.`,
        ``,
        `— Qlarify Health`,
        `${site.email} · ${site.phone}`,
      ].join("\n"),
    }),
  ]);

  const emailResult = confirmationResult;
  const internalEmailOk = internalResult.ok;

  const anyDelivered = slackResult.ok || internalResult.ok || confirmationResult.ok;

  logEvent("lead.delivered", {
    contact: redactEmail(safe.email),
    slack: slackResult.ok,
    email: emailResult.ok,
    internal: internalEmailOk,
    anyDelivered,
    durationMs: Date.now() - start,
  });

  return NextResponse.json({
    ok: true,
    delivered: {
      slack: slackResult.ok,
      email: emailResult.ok,
      internal: internalEmailOk,
    },
    // True when no delivery channel is configured — client should show fallback
    fallbackRequired: !anyDelivered,
  });
}
