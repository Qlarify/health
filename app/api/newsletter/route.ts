import { NextResponse } from "next/server";
import { postToSlack, sendEmailViaResend } from "@/lib/notify";
import { logEvent, logWarn, redactEmail } from "@/lib/log";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Body = { email?: string; consent?: boolean };

const isEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  const start = Date.now();
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    logWarn("newsletter.rejected", { reason: "invalid-json" });
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  if (body.consent !== true) {
    logWarn("newsletter.rejected", { reason: "consent-required" });
    return NextResponse.json(
      { ok: false, error: "consent-required" },
      { status: 400 }
    );
  }

  if (!isEmail(body.email)) {
    logWarn("newsletter.rejected", { reason: "email-required" });
    return NextResponse.json(
      { ok: false, error: "email-required" },
      { status: 400 }
    );
  }

  const subscriberEmail = body.email;

  // Fan out — three independent notifications in parallel:
  //   1. Slack: team alert with the signup
  //   2. Internal email to site.email (info@qlarify.health): so the team can
  //      add the address to the list system
  //   3. Confirmation email to the subscriber: warm receipt + DPDP-compliant
  //      opt-out reminder
  const confirmationText = [
    `Hi there,`,
    ``,
    `Thanks for subscribing to The Brief — Qlarify Health's monthly note for hospital marketing leads.`,
    ``,
    `One letter a month. Worth opening. Field notes from the practice — what's working, what's not, what we changed our minds about.`,
    ``,
    `You're confirmed. The next edition will land in your inbox at the start of the month.`,
    ``,
    `If you ever want to stop receiving it, just reply with "unsubscribe" or hit the one-click opt-out at the bottom of any email — we honour it within 72 hours.`,
    ``,
    `— Qlarify Health`,
    `${site.email} · ${site.phone}`,
    `${site.url}`,
  ].join("\n");

  const internalText = [
    `New newsletter signup`,
    ``,
    `Email:    ${subscriberEmail}`,
    `Consent:  granted (explicit opt-in)`,
    `Source:   ${site.url}`,
    ``,
    `—`,
    `Add to The Brief audience list when next batch goes out.`,
  ].join("\n");

  const [slackResult, internalResult, confirmationResult] = await Promise.all([
    postToSlack({ text: `*Newsletter signup:* ${subscriberEmail}` }),
    sendEmailViaResend({
      to: site.email,
      replyTo: subscriberEmail,
      subject: `Newsletter signup — ${subscriberEmail}`,
      text: internalText,
    }),
    sendEmailViaResend({
      to: subscriberEmail,
      replyTo: site.email,
      subject: `Welcome to The Brief — Qlarify Health`,
      text: confirmationText,
    }),
  ]);

  logEvent("newsletter.delivered", {
    contact: redactEmail(subscriberEmail),
    slack: slackResult.ok,
    internal: internalResult.ok,
    confirmation: confirmationResult.ok,
    durationMs: Date.now() - start,
  });

  return NextResponse.json({
    ok: true,
    delivered: {
      slack: slackResult.ok,
      internal: internalResult.ok,
      confirmation: confirmationResult.ok,
    },
  });
}
