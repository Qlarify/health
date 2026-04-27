"use client";

import { useState } from "react";
import type { ReactNode } from "react";

/**
 * IG-3 · Channel × Journey Grid
 * Interactive infographic showing which of Qlarify's five channels serves which
 * patient-journey moment. Hovering a row highlights it so visitors can follow
 * a single channel across all four moments.
 * "Primary" = the channel owns that moment; "Supporting" = amplifies another.
 */

type Role = "primary" | "supporting" | "–";

type Channel = {
  label: string;
  slug: string;
  href: string;
};

type Moment = {
  label: string;
  short: string;
};

const channels: readonly Channel[] = [
  { label: "YouTube & Video", slug: "video", href: "/video" },
  { label: "Social & Content", slug: "social", href: "/social" },
  { label: "Hospital SEO", slug: "seo", href: "/seo" },
  { label: "Performance / Paid", slug: "paid", href: "/paid" },
  { label: "Email & WhatsApp", slug: "email", href: "/email" },
];

const moments: readonly Moment[] = [
  { label: "Awareness", short: "01" },
  { label: "Consideration", short: "02" },
  { label: "Decision", short: "03" },
  { label: "Post-consult", short: "04" },
];

type RoleMatrix = readonly [Role, Role, Role, Role];

/** Row order mirrors `channels` array above */
const matrix: readonly RoleMatrix[] = [
  // YouTube & Video
  ["primary", "primary", "supporting", "supporting"],
  // Social & Content
  ["primary", "supporting", "–", "supporting"],
  // Hospital SEO
  ["primary", "primary", "supporting", "–"],
  // Performance / Paid
  ["supporting", "primary", "primary", "–"],
  // Email & WhatsApp
  ["–", "–", "supporting", "primary"],
];

function RoleCell({
  role,
  highlighted,
}: {
  role: Role;
  highlighted: boolean;
}) {
  if (role === "–") {
    return (
      <td
        className="border border-line p-2 md:p-3 text-center transition-colors duration-150"
        aria-label="not applicable"
      >
        <span className="text-muted text-sm">—</span>
      </td>
    );
  }

  const isPrimary = role === "primary";
  return (
    <td className="border border-line p-2 md:p-3 text-center transition-colors duration-150">
      <span
        className={[
          "inline-block rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-all duration-150",
          isPrimary
            ? highlighted
              ? "bg-sage text-paper scale-105 shadow-sm"
              : "bg-sage text-paper"
            : highlighted
            ? "bg-sage/20 text-sage border border-sage/50"
            : "bg-sage/10 text-sage border border-sage/30",
        ].join(" ")}
        aria-label={isPrimary ? "primary channel" : "supporting channel"}
      >
        {isPrimary ? "Primary" : "Support"}
      </span>
    </td>
  );
}

export function ChannelGrid({ caption }: { caption?: ReactNode }) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <figure className="not-prose">
      <div
        role="img"
        aria-labelledby="channel-grid-title"
        aria-describedby="channel-grid-desc"
        className="bg-paper border border-line rounded-3xl p-6 md:p-10 overflow-x-auto"
      >
        <span id="channel-grid-title" className="sr-only">
          Channel × patient-journey matrix
        </span>
        <span id="channel-grid-desc" className="sr-only">
          A grid showing which of Qlarify's five service channels — YouTube,
          Social, SEO, Paid, and Email &amp; WhatsApp — takes a primary or
          supporting role across the four patient-journey moments: Awareness,
          Consideration, Decision, and Post-consult.
        </span>

        <div className="flex items-center gap-4 mb-5">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em]">
            <span className="inline-block w-3 h-3 rounded-sm bg-sage" />
            Primary
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em]">
            <span className="inline-block w-3 h-3 rounded-sm bg-sage/10 border border-sage/30" />
            Supporting
          </span>
        </div>

        <table className="w-full border-collapse text-left min-w-[520px]">
          <thead>
            <tr>
              <th
                scope="col"
                className="border border-line p-2 md:p-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted bg-surface w-[160px] md:w-[200px]"
              >
                Channel
              </th>
              {moments.map((m) => (
                <th
                  key={m.short}
                  scope="col"
                  className="border border-line p-2 md:p-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted bg-surface text-center"
                >
                  <span className="text-sage mr-1">{m.short}</span>
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {channels.map((ch, i) => {
              const isHovered = hoveredRow === i;
              return (
                <tr
                  key={ch.slug}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={[
                    "transition-colors duration-150",
                    isHovered
                      ? "bg-sage/5"
                      : i % 2 === 0
                      ? ""
                      : "bg-surface/50",
                  ].join(" ")}
                >
                  <th
                    scope="row"
                    className="border border-line p-2 md:p-3 font-serif text-[14px] md:text-[15px] leading-[1.3]"
                  >
                    <a
                      href={ch.href}
                      className={[
                        "transition-colors duration-200",
                        isHovered ? "text-sage" : "hover:text-sage",
                      ].join(" ")}
                    >
                      {ch.label}
                    </a>
                  </th>
                  {matrix[i].map((role, j) => (
                    <RoleCell key={j} role={role} highlighted={isHovered} />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="mt-6 pt-5 border-t border-line font-mono text-[11px] leading-[1.6] text-muted">
          &ldquo;Primary&rdquo; = channel owns this moment end-to-end.
          &ldquo;Supporting&rdquo; = channel amplifies the primary at this
          stage. No cell = no meaningful contribution at this moment.
        </p>
      </div>

      {caption ? (
        <figcaption className="mt-4 text-[13px] leading-[1.55] text-muted max-w-[720px]">
          {caption}
        </figcaption>
      ) : null}

      {/* Long description — crawler-only */}
      <div className="sr-only" aria-hidden="true">
        <p>
          YouTube and Video takes a primary role in Awareness and Consideration,
          supporting Decision and Post-consult. Social and Content is primary at
          Awareness and supporting at Consideration and Post-consult. Hospital
          SEO is primary at Awareness and Consideration, supporting at Decision.
          Performance Paid Media is primary at Consideration and Decision,
          supporting at Awareness. Email and WhatsApp is primary at Post-consult
          and supporting at Decision. Together, the five channels cover every
          stage of the patient journey from awareness through post-consult.
        </p>
      </div>
    </figure>
  );
}
