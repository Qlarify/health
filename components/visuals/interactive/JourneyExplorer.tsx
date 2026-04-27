"use client";

import { useState } from "react";

/**
 * IX-1 · Journey Explorer
 * Interactive upgrade of the static PatientJourneyDiagram.
 * Click a moment to expand it with channels, metrics, and what-good-looks-like.
 */

type Moment = {
  n: string;
  label: string;
  query: string;
  channel: string;
  metric: string;
  detail: {
    whatHappens: string;
    goodLooksLike: string;
    redFlag: string;
  };
};

const moments: readonly Moment[] = [
  {
    n: “01”,
    label: “Symptom Awareness”,
    query: “”Is this serious?””,
    channel: “SEO + YouTube”,
    metric: “Organic impressions → qualified sessions”,
    detail: {
      whatHappens:
        “This is where demand is created. The patient has symptoms and is not looking for a hospital yet — they are looking for answers. They search the symptom or condition. If your content appears here with real clinical depth, you earn the first interaction before a competitor does.”,
      goodLooksLike:
        “Condition-level pages ranking in the top 3 organic results for symptom + city queries. YouTube Shorts answering early-stage questions. Health-literacy articles that explain what a diagnosis means in plain language.”,
      redFlag:
        “Only the home page or about page ranking for condition queries. Patients searching 'knee pain causes' are not looking for your hospital story — they want education. Promotional content at this stage is invisible.”,
    },
  },
  {
    n: “02”,
    label: “Trust Building”,
    query: “”Which doctor should I go to?””,
    channel: “YouTube + Social”,
    metric: “Video view-through to enquiry”,
    detail: {
      whatHappens:
        “This is where preference is formed. The patient knows they need care but is not sure who to trust. They want to see the doctor speak, hear how they explain things, and watch someone with the same condition describe their experience. Trust is earned here — not at the booking stage.”,
      goodLooksLike:
        “Named-specialist explainer videos for each flagship specialty. Doctor introduction reels showing clinical depth and bedside manner. Hospital capability videos that show infrastructure without feeling like a brochure.”,
      redFlag:
        “A YouTube channel with three videos uploaded two years ago, or a social feed that only posts achievements and awards. Patients evaluating trust need proof, not promotion.”,
    },
  },
  {
    n: “03”,
    label: “Decision”,
    query: “”Do I need surgery or not?””,
    channel: “Performance / Paid + SEO”,
    metric: “Enquiry-to-appointment conversion rate”,
    detail: {
      whatHappens:
        “This is where conversion happens. The patient is comparing treatment options, reading procedure explanations and deciding whether to commit. The content that wins here removes the last piece of doubt. One unanswered question at this stage sends them to a competitor.”,
      goodLooksLike:
        “Procedure comparison pages that explain conservative vs. surgical options honestly. Treatment pathway content that sets realistic expectations. High-intent landing pages with click-to-call and WhatsApp above the fold.”,
      redFlag:
        “Generic department pages with no procedure depth, or landing pages that lead to a contact form with no phone number. 30–50% of hospital enquiries are lost because the booking path is unclear.”,
    },
  },
  {
    n: “04”,
    label: “Post-Op Recovery”,
    query: “”What should I expect after surgery?””,
    channel: “Email + WhatsApp”,
    metric: “12-month patient retention rate”,
    detail: {
      whatHappens:
        “This is where retention and amplification happen. The patient is post-treatment and needs recovery guidance, reassurance and continuity. Without structured lifecycle communication, most patients do not return — and the hospital never learns whether the outcome was good.”,
      goodLooksLike:
        “A 48-hour WhatsApp check-in after discharge. Recovery timeline content segmented by specialty. Six-month review reminders. Structured capture of patient stories from patients who've had positive outcomes.”,
      redFlag:
        “No follow-up communication after discharge, or a single mass newsletter sent to the entire patient database with no segmentation by treatment stage. This is where most hospital marketing budgets stop — and where the most durable growth is built.”,
    },
  },
];

export function JourneyExplorer() {
  const [active, setActive] = useState<string>(moments[0].n);

  const activeMoment = moments.find((m) => m.n === active) ?? moments[0];

  return (
    <div
      className="bg-paper border border-line rounded-3xl overflow-hidden"
      role="region"
      aria-label="Interactive patient journey explorer"
    >
      {/* Tab strip */}
      <div
        className="grid grid-cols-4 border-b border-line"
        role="tablist"
        aria-label="Patient journey moments"
      >
        {moments.map((m) => {
          const isActive = m.n === active;
          return (
            <button
              key={m.n}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${m.n}`}
              id={`tab-${m.n}`}
              onClick={() => setActive(m.n)}
              className={[
                "relative py-4 px-3 md:px-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-inset",
                isActive
                  ? "bg-surface"
                  : "bg-paper hover:bg-surface/60 cursor-pointer",
                "border-r border-line last:border-r-0",
              ].join(" ")}
            >
              <div
                className={[
                  "font-mono text-[9px] uppercase tracking-[0.14em] mb-1.5 transition-colors",
                  isActive ? "text-sage" : "text-muted",
                ].join(" ")}
              >
                Moment {m.n}
              </div>
              <div
                className={[
                  "font-serif text-[15px] md:text-[17px] leading-[1.2] transition-colors",
                  isActive ? "text-ink" : "text-muted",
                ].join(" ")}
              >
                {m.label}
              </div>
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        id={`panel-${activeMoment.n}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeMoment.n}`}
        className="p-6 md:p-10"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
          {/* Left — query + channel */}
          <div>
            <p className="font-serif italic text-[18px] md:text-[22px] leading-[1.4] text-ink mb-5">
              {activeMoment.query}
            </p>
            <dl className="border-t border-line pt-4 space-y-3">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted mb-0.5">
                  Channel
                </dt>
                <dd className="text-[14px] leading-[1.45]">
                  {activeMoment.channel}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted mb-0.5">
                  Metric
                </dt>
                <dd className="text-[14px] leading-[1.45]">
                  {activeMoment.metric}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right — detail */}
          <div>
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-muted mb-5">
              {activeMoment.detail.whatHappens}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Good looks like */}
          <div className="bg-sage/8 border border-sage/20 rounded-2xl p-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-sage mb-3">
              What good looks like
            </div>
            <p className="text-[13px] leading-[1.6] text-ink">
              {activeMoment.detail.goodLooksLike}
            </p>
          </div>

          {/* Red flag */}
          <div className="bg-surface border border-line rounded-2xl p-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted mb-3">
              Red flag
            </div>
            <p className="text-[13px] leading-[1.6] text-muted">
              {activeMoment.detail.redFlag}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="px-6 md:px-10 py-4 border-t border-line bg-surface">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          Select a moment above to explore what happens — and what it takes to
          win it.
        </p>
      </div>
    </div>
  );
}
