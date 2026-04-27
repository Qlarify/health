"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_COOKIE = "q_consent";
const CONSENT_VERSION = "1";

type ConsentValue = "accepted" | "rejected";

function readConsentCookie(): { version: string; value: ConsentValue } | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  const raw = decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1));
  const [version, value] = raw.split(":");
  if (!version || !value) return null;
  if (value !== "accepted" && value !== "rejected") return null;
  return { version, value };
}

function writeConsentCookie(value: ConsentValue) {
  if (typeof document === "undefined") return;
  // 12 months, first-party, root-scoped, SameSite=Lax. No Secure flag locally;
  // the deployed site at qlarify.health is HTTPS-only so the cookie travels
  // safely there too.
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(
    `${CONSENT_VERSION}:${value}`
  )}; path=/; max-age=${oneYear}; SameSite=Lax`;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = readConsentCookie();
    if (!existing || existing.version !== CONSENT_VERSION) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const decide = (value: ConsentValue) => {
    writeConsentCookie(value);
    setVisible(false);
  };

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-body"
      className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-[440px] z-50 bg-ink text-paper rounded-[20px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] border border-paper/10 motion-safe:animate-slide-up"
    >
      <div className="p-6 md:p-7">
        <p
          id="cookie-banner-title"
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage mb-3"
        >
          Cookies · DPDP notice
        </p>
        <h2 className="font-serif text-xl md:text-2xl leading-[1.2] mb-3">
          We don&rsquo;t set analytics cookies until you say yes.
        </h2>
        <p
          id="cookie-banner-body"
          className="text-[13.5px] leading-[1.55] opacity-80 mb-5"
        >
          Only cookies that the site needs to function (e.g. remembering this
          choice) load by default. Analytics is opt-in. You can change your
          mind any time on the{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 decoration-paper/30 hover:decoration-paper transition-colors"
          >
            privacy page
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="inline-flex items-center px-4 py-2 rounded-full bg-paper text-ink font-mono text-[11px] uppercase tracking-[0.14em] hover:bg-sage-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Accept analytics
          </button>
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="inline-flex items-center px-4 py-2 rounded-full border border-paper/30 font-mono text-[11px] uppercase tracking-[0.14em] hover:border-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Reject all
          </button>
          <Link
            href="/dpdp"
            className="inline-flex items-center px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70 hover:text-paper transition-colors"
          >
            Read the DPDP notice →
          </Link>
        </div>
      </div>
    </aside>
  );
}
