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
    n: "01",
    label: "Symptom search",
    query: "“knee pain treatment Bengaluru”",
    channel: "SEO + Search ads",
    metric: "Cost per qualified inbound call",
    detail: {
      whatHappens:
        "The patient is not looking for a hospital yet — they are looking for answers. They search the symptom or condition paired with a city. If your content appears here, you earn the first interaction.",
      goodLooksLike:
        "A procedure-level page ranking in the top 3 organic results for the condition + city query, with a visible click-to-call or WhatsApp button above the fold.",
      redFlag:
        "Only the home page or about page ranking for condition queries. Patients searching 'knee replacement Bengaluru' are not looking for your hospital story — they want clinical depth.",
    },
  },
  {
    n: "02",
    label: "Trust",
    query: "“Is Dr. Kumar good for cardiac?”",
    channel: "YouTube + Social",
    metric: "Video view-through to enquiry",
    detail: {
      whatHappens:
        "The patient has found your hospital but is not sure yet. They want to see the doctor speak, hear how they explain things, and watch someone like them describe their experience.",
      goodLooksLike:
        "A YouTube channel with named-specialist explainers for each flagship specialty. Patient stories. Procedure walkthroughs. A consistent posting cadence that surfaces in YouTube search.",
      redFlag:
        "A YouTube channel with 3 videos uploaded 2 years ago, or a channel that only posts promotional content instead of clinical education.",
    },
  },
  {
    n: "03",
    label: "Decision",
    query: "“Book the appointment”",
    channel: "Call centre + Front desk",
    metric: "Call-to-appointment rate",
    detail: {
      whatHappens:
        "The patient calls. What happens in the next 4 minutes decides whether you get an appointment or they try the next hospital. This is the most commonly wasted moment.",
      goodLooksLike:
        "Inbound call answered within 2 rings. Staff with specialty-specific scripts, the name of a consultant, and a slot within 48 hours. Call-to-appointment rate tracked by specialty daily.",
      redFlag:
        "Unanswered calls, generic responses ('I'll check and call you back'), or a booking system that can't confirm slots in real time. 30–50% of hospital enquiries are lost at this layer.",
    },
  },
  {
    n: "04",
    label: "Aftercare",
    query: "“When do I come back?”",
    channel: "Email + WhatsApp",
    metric: "12-month retention",
    detail: {
      whatHappens:
        "The visit happened. Now the patient needs follow-up reminders, recovery guidance, and the right nudge to book a review appointment. Without lifecycle communication, most patients do not return.",
      goodLooksLike:
        "A 48-hour check-in via WhatsApp. A 30-day preventive health tip. A six-month review reminder tied to their specialty. Open rate 60–80%; return appointment rate tracked against baseline.",
      redFlag:
        "No follow-up communication after discharge, or a single mass newsletter sent to the entire patient database with no segmentation by specialty or treatment stage.",
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
