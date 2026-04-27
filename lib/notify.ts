// Notification helpers for form submissions.
// Both Resend and Slack are optional — missing creds emit a structured warn
// log and the route still succeeds, so local dev works without env setup.

import { logError, logWarn } from "@/lib/log";

type SlackPayload = { text: string; blocks?: unknown[] };

export async function postToSlack(payload: SlackPayload): Promise<{ ok: boolean; reason?: string }> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    logWarn("notify.slack.skipped", { reason: "missing-creds" });
    return { ok: false, reason: "missing-creds" };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      logError("notify.slack.failed", {
        status: res.status,
        statusText: res.statusText,
      });
      return { ok: false, reason: `status-${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    logError("notify.slack.error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { ok: false, reason: "network" };
  }
}

type ResendEmail = {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export async function sendEmailViaResend(email: ResendEmail): Promise<{ ok: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const defaultFrom = process.env.RESEND_FROM ?? "Qlarify Health <info@qlarify.health>";
  if (!apiKey) {
    logWarn("notify.email.skipped", { reason: "missing-creds" });
    return { ok: false, reason: "missing-creds" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: email.from ?? defaultFrom,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html,
        reply_to: email.replyTo,
      }),
    });
    if (!res.ok) {
      logError("notify.email.failed", {
        status: res.status,
        statusText: res.statusText,
      });
      return { ok: false, reason: `status-${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    logError("notify.email.error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { ok: false, reason: "network" };
  }
}
