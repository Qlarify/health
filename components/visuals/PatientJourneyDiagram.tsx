import type { ReactNode } from "react";

type Moment = {
  n: string;
  label: string;
  query: string;
  channel: string;
  metric: string;
};

const moments: readonly Moment[] = [
  {
    n: "01",
    label: "Symptom search",
    query: "\u201cknee pain treatment Bengaluru\u201d",
    channel: "SEO + Search ads",
    metric: "Cost per qualified inbound call",
  },
  {
    n: "02",
    label: "Trust",
    query: "\u201cIs Dr. Kumar good for cardiac?\u201d",
    channel: "YouTube + Social",
    metric: "Video view-through to enquiry",
  },
  {
    n: "03",
    label: "Decision",
    query: "\u201cBook the appointment\u201d",
    channel: "Call centre + Front desk",
    metric: "Call-to-appointment rate",
  },
  {
    n: "04",
    label: "Aftercare",
    query: "\u201cWhen do I come back?\u201d",
    channel: "Email + WhatsApp",
    metric: "12-month retention",
  },
];

export function PatientJourneyDiagram({
  caption,
}: {
  caption?: ReactNode;
}) {
  return (
    <figure className="not-prose">
      <div
        role="img"
        aria-labelledby="patient-journey-title"
        aria-describedby="patient-journey-desc"
        className="relative bg-paper border border-line rounded-3xl p-6 md:p-10"
      >
        <span id="patient-journey-title" className="sr-only">
          The four moments of a healthcare decision
        </span>
        <span id="patient-journey-desc" className="sr-only">
          A horizontal flow showing the four moments every patient moves
          through &mdash; symptom search, trust, decision and aftercare &mdash;
          each mapped to the channel that serves it and the metric we track.
        </span>

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-3">
          {moments.map((m, i) => (
            <li
              key={m.n}
              className="relative bg-surface border border-line rounded-2xl p-5 md:p-6"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-sage mb-3">
                Moment {m.n}
              </div>
              <h3 className="font-serif text-xl md:text-[22px] leading-[1.15] mb-3">
                {m.label}
              </h3>
              <p className="font-serif italic text-[14px] leading-[1.45] text-ink mb-4">
                {m.query}
              </p>
              <dl className="border-t border-line pt-3 space-y-2">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    Channel
                  </dt>
                  <dd className="text-[13px] leading-[1.45]">{m.channel}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    Metric
                  </dt>
                  <dd className="text-[13px] leading-[1.45]">{m.metric}</dd>
                </div>
              </dl>

              {i < moments.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 text-sage text-lg"
                >
                  &rarr;
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {caption ? (
        <figcaption className="mt-4 text-[13px] leading-[1.55] text-muted max-w-[680px]">
          {caption}
        </figcaption>
      ) : null}

      {/* Long description — crawler-only. In HTML for AI extractors; sr-only hides it from viewers. */}
      <div className="sr-only" aria-hidden="true">
        <p>
          The patient journey unfolds across four distinct moments. In moment
          one, the symptom search, patients type condition + city queries into
          Google — served by SEO and search advertising, measured by cost
          per qualified inbound call. In moment two, trust, patients verify
          specialists on YouTube and social before they call — measured
          by video view-through to enquiry. Moment three is the decision: the
          call-centre and front desk convert the enquiry into a booked
          appointment, measured by call-to-appointment rate. Moment four is
          aftercare: email and WhatsApp bring patients back at the right
          clinical interval, measured by twelve-month retention. A hospital
          marketing system that addresses only one moment under-converts the
          other three.
        </p>
      </div>
    </figure>
  );
}
