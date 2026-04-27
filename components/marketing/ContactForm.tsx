"use client";

import { useState, type FormEvent } from "react";
import { Field } from "@/components/ui/Field";

const TOPICS = [
  "New engagement",
  "Press",
  "Partnership",
  "Careers",
  "Just saying hi",
] as const;
type Topic = (typeof TOPICS)[number];

const WA_NUMBER = "918147410751"; // +91 81474 10751

export function ContactForm() {
  const [topic, setTopic] = useState<Topic>("New engagement");
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [fallbackRequired, setFallbackRequired] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const hospital = String(form.get("hospital") ?? "");
    const payload = {
      hospital,
      name,
      role: String(form.get("role") ?? ""),
      email: String(form.get("email") ?? ""),
      notes: `[${topic}] ${String(form.get("message") ?? "")}`,
      consent: form.get("consent") === "on",
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        fallbackRequired?: boolean;
      };
      if (!res.ok || !data.ok) {
        setError(humaniseError(data.error));
        setState("error");
        return;
      }
      setSubmittedName(name);
      if (data.fallbackRequired) setFallbackRequired(true);
      setState("ok");
    } catch {
      setError("Network error. Try again.");
      setState("error");
    }
  }

  if (state === "ok") {
    const waMsg = submittedName
      ? `Hi, I just sent a message via qlarify.health. I'm ${submittedName}. Looking forward to connecting!`
      : "Hi, I just sent a message via qlarify.health.";
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-paper border border-line rounded-[20px] p-10 text-center"
      >
        <div
          aria-hidden="true"
          className="w-16 h-16 rounded-full bg-sage-soft text-sage flex items-center justify-center text-3xl mx-auto mb-5"
        >
          ✓
        </div>
        <div className="font-serif text-3xl mb-2">Message received.</div>
        <div className="text-sm text-muted">
          We&apos;ll be back to you within one working day.
        </div>

        {fallbackRequired && (
          <div className="mt-6 pt-6 border-t border-line">
            <p className="text-[13px] text-muted mb-4 leading-[1.55]">
              Our email system isn&apos;t set up yet — for a faster response,
              drop us a WhatsApp:
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink text-paper text-[14px] font-medium hover:bg-black transition-colors duration-200"
            >
              Message us on WhatsApp →
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-paper border border-line rounded-[20px] p-7 md:p-8"
    >
      <div
        id="topic-label"
        className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-3"
      >
        What&apos;s it about?
      </div>
      <div
        role="radiogroup"
        aria-labelledby="topic-label"
        className="flex flex-wrap gap-2 mb-6"
      >
        {TOPICS.map((t) => {
          const active = topic === t;
          return (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setTopic(t)}
              className={[
                "px-3.5 py-2 rounded-full text-[13px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2",
                active
                  ? "bg-ink text-paper border border-ink"
                  : "bg-transparent text-ink border border-line hover:border-ink",
              ].join(" ")}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Field
          label="Your name"
          name="name"
          autoComplete="name"
          required
          placeholder="Full name"
        />
        <Field
          label="Organisation"
          name="hospital"
          autoComplete="organization"
          required
          placeholder="Hospital or company"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Field
          kind="email"
          label="Email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
        <Field
          label="Role"
          name="role"
          autoComplete="organization-title"
          placeholder="Marketing lead, CMO, COO…"
        />
      </div>
      <div className="mb-6">
        <Field
          kind="textarea"
          label="Message"
          name="message"
          required
          placeholder="Tell us a little about what you're working on, what's not working, or just say hi."
        />
      </div>

      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 accent-sage"
        />
        <span className="text-[12px] text-muted leading-[1.5]">
          I consent to Qlarify Health storing the information above to reply to
          my message. I can request deletion at any time.
        </span>
      </label>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full px-6 py-4 rounded-full bg-ink text-paper text-[15px] font-medium disabled:opacity-50 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
      >
        {state === "submitting" ? "Sending…" : "Send message →"}
      </button>

      {state === "error" && error && (
        <p
          role="alert"
          className="text-sm text-red-700 mt-4 text-center"
        >
          {error}
        </p>
      )}

      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted text-center mt-4">
        We reply within one working day
      </p>

      <div className="mt-5 pt-5 border-t border-line text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          Prefer WhatsApp?{" "}
        </span>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I'd like to get in touch with Qlarify Health.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.1em] text-sage underline-offset-4 hover:underline"
        >
          +91 81474 10751 →
        </a>
      </div>
    </form>
  );
}

function humaniseError(code?: string): string {
  switch (code) {
    case "consent-required":
      return "Please tick the consent box to send.";
    case "hospital-required":
      return "Please tell us which organisation you're with.";
    case "name-required":
      return "Please share your name.";
    case "email-required":
      return "Please enter a valid email.";
    default:
      return "Something went wrong. Try again, or email info@qlarify.health.";
  }
}
