"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setState("error");
        return;
      }
      setState("ok");
    } catch {
      setError("Network error. Try again.");
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <p
        role="status"
        className="font-serif italic text-2xl leading-[1.3]"
        style={{ color: "#A8C0B4" }}
      >
        Thanks. Confirmation in your inbox shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@hospital.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3.5 rounded-xl text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-sage"
          style={{
            background: "#0F1815",
            color: "var(--color-paper)",
            border: "1px solid #2C3A35",
          }}
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="px-5 py-3.5 rounded-xl text-sm font-medium bg-paper text-ink disabled:opacity-50 transition-opacity"
        >
          {state === "submitting" ? "Subscribing…" : "Subscribe →"}
        </button>
      </div>

      <label className="flex items-start gap-3 mt-5 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-sage"
        />
        <span
          className="text-[12px] leading-[1.5]"
          style={{ color: "#9BA89F" }}
        >
          I consent to receive monthly editorial emails from Qlarify Health. I
          can unsubscribe at any time.
        </span>
      </label>

      {state === "error" && error && (
        <p
          role="alert"
          className="text-sm mt-4"
          style={{ color: "#E8B4B4" }}
        >
          {error}
        </p>
      )}

      <p
        className="font-mono text-[10px] uppercase tracking-[0.1em] mt-4"
        style={{ color: "#7A8A82" }}
      >
        2,400+ hospital marketing leads · unsubscribe any time
      </p>
    </form>
  );
}
