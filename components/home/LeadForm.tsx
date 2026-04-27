"use client";

import { useId, useState } from "react";
import { Field } from "@/components/ui/Field";

const sizes = [
  "Under 100 beds",
  "100–300 beds",
  "300–600 beds",
  "600+ beds",
  "Multi-hospital chain",
] as const;

const roles = [
  "Head of Marketing",
  "CMO",
  "Marketing Manager",
  "CEO / Director",
  "Digital Lead",
  "Other",
] as const;

type Status = "idle" | "submitting" | "ok" | "error";

export function LeadForm() {
  const consentId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const data = new FormData(e.currentTarget);
    const body = {
      hospital: String(data.get("hospital") ?? ""),
      size: String(data.get("size") ?? ""),
      channel: String(data.get("channel") ?? ""),
      name: String(data.get("name") ?? ""),
      role: String(data.get("role") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      consent: data.get("consent") === "on",
    };

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        className="bg-surface border border-line rounded-3xl p-10 md:p-12 text-center"
      >
        <div
          aria-hidden="true"
          className="w-16 h-16 rounded-full bg-sage-soft text-sage flex items-center justify-center text-3xl mx-auto mb-6"
        >
          ✓
        </div>
        <h3 className="font-serif text-3xl md:text-4xl leading-[1.05] mb-3 tracking-[-0.02em]">
          Audit requested.
        </h3>
        <p className="text-[15px] text-muted mb-6 max-w-sm mx-auto leading-[1.55]">
          You&apos;ll have a written report — and a calendar link if you want
          to talk it through — within 48 hours.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          We email from info@qlarify.health
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-surface border border-line rounded-3xl p-7 md:p-10"
    >
      <div className="flex items-center gap-2.5 mb-7">
        <span
          aria-hidden="true"
          className="w-2 h-2 rounded-full bg-sage [animation:var(--animate-pulse-soft)] motion-reduce:animate-none"
        />
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
          Claim your free YouTube audit
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <Field
          name="hospital"
          label="Hospital name"
          placeholder="e.g. Manipal"
          required
          autoComplete="organization"
        />
        <Field
          kind="select"
          name="size"
          label="Hospital size"
          defaultValue="100–300 beds"
          options={sizes}
        />
      </div>

      <Field
        kind="url"
        name="channel"
        label="YouTube channel URL"
        placeholder="https://youtube.com/@..."
        required
        className="mb-4"
        autoComplete="url"
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <Field
          name="name"
          label="Your name"
          placeholder="Full name"
          required
          autoComplete="name"
        />
        <Field
          kind="select"
          name="role"
          label="Your role"
          defaultValue="Head of Marketing"
          options={roles}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Field
          kind="email"
          name="email"
          label="Work email"
          placeholder="you@hospital.com"
          required
          autoComplete="email"
        />
        <Field
          kind="tel"
          name="phone"
          label="Phone (WhatsApp)"
          placeholder="+91 ..."
          required
          autoComplete="tel"
        />
      </div>

      <label
        htmlFor={consentId}
        className="flex items-start gap-3 mb-6 text-[13px] leading-[1.5] text-muted cursor-pointer"
      >
        <input
          id={consentId}
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 w-4 h-4 accent-ink shrink-0"
        />
        <span>
          I consent to Qlarify Health processing the details I&apos;ve shared
          to deliver this audit and follow up by email or WhatsApp. See our{" "}
          <a href="/dpdp" className="text-ink underline underline-offset-4">
            DPDP notice
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full px-6 py-4 rounded-full bg-ink text-paper font-medium text-[15px] inline-flex items-center justify-center gap-2.5 transition-[background-color,transform] duration-200 motion-reduce:transition-none hover:bg-black hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {status === "submitting" ? "Sending…" : "Send my audit request"}
        <span aria-hidden="true">→</span>
      </button>

      {status === "error" && (
        <p role="alert" className="text-[13px] text-red-700 mt-4 text-center">
          {errorMsg}
        </p>
      )}

      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted text-center mt-4 leading-[1.6]">
        Report in 48 hours · No commitment · DPDP-compliant
      </p>
    </form>
  );
}
