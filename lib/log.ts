// Structured JSON logger. Vercel ingests stdout as logs and parses JSON
// fields, so emitting one line per event with consistent shape makes
// production observability work without a SaaS.
//
// Never log raw form payloads — PII (email, phone, hospital name) goes only
// to Slack/Resend. Logs carry status + redacted markers only.

type Level = "info" | "warn" | "error";

type LogContext = Record<string, string | number | boolean | null | undefined>;

type LogRecord = {
  ts: string;
  level: Level;
  event: string;
  msg?: string;
} & LogContext;

function emit(record: LogRecord) {
  const line = JSON.stringify(record);
  if (record.level === "error") console.error(line);
  else if (record.level === "warn") console.warn(line);
  else console.log(line);
}

export function logEvent(
  event: string,
  ctx: LogContext = {},
  msg?: string,
): void {
  emit({ ts: new Date().toISOString(), level: "info", event, msg, ...ctx });
}

export function logWarn(
  event: string,
  ctx: LogContext = {},
  msg?: string,
): void {
  emit({ ts: new Date().toISOString(), level: "warn", event, msg, ...ctx });
}

export function logError(
  event: string,
  ctx: LogContext = {},
  msg?: string,
): void {
  emit({ ts: new Date().toISOString(), level: "error", event, msg, ...ctx });
}

// Hash an email-ish string into a short stable token, so logs can correlate
// "did the same address submit twice" without storing the address itself.
export function redactEmail(value: string): string {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h * 31 + value.charCodeAt(i)) | 0;
  }
  return `e_${(h >>> 0).toString(36)}`;
}
