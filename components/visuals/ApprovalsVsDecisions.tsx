import type { ReactNode } from "react";

/**
 * IG-4 · Approvals vs Decisions
 * A two-column static infographic contrasting how hospital marketing is
 * typically structured (approval-driven) with how healthcare decisions are
 * actually made (search-trust-conversation-driven).
 */

type Item = { icon: string; text: string };

const approvalsSide: readonly Item[] = [
  { icon: "📋", text: "Annual campaign calendar built before January" },
  { icon: "✔️", text: "Multiple approval cycles slow every asset down" },
  { icon: "📊", text: "Measured in impressions, reach, and posts published" },
  { icon: "🎨", text: "Brand guidelines reviewed per creative, not per intent" },
  { icon: "🔁", text: "Same broad messages recycled across all specialties" },
  { icon: "📅", text: "Activity pauses when the campaign budget runs out" },
];

const decisionsSide: readonly Item[] = [
  { icon: "🌙", text: "Symptom search at 11 pm when the child won't stop coughing" },
  { icon: "▶️", text: "YouTube to see the doctor's face before calling" },
  { icon: "💬", text: "WhatsApp the trusted relative who went to that hospital" },
  { icon: "⭐", text: "Google review cross-check before picking up the phone" },
  { icon: "📞", text: "One call to book — or the family moves on" },
  { icon: "🔁", text: "Repeat visit shaped entirely by how that first visit felt" },
];

export function ApprovalsVsDecisions({ caption }: { caption?: ReactNode }) {
  return (
    <figure className="not-prose">
      <div
        role="img"
        aria-labelledby="avd-title"
        aria-describedby="avd-desc"
        className="bg-paper border border-line rounded-3xl overflow-hidden"
      >
        <span id="avd-title" className="sr-only">
          How hospital marketing is structured vs how healthcare decisions are
          actually made
        </span>
        <span id="avd-desc" className="sr-only">
          A two-column comparison. Left column: how hospital marketing is
          typically built around approvals, calendars and outputs. Right column:
          how patients actually decide — through night-time searches, YouTube
          explainers, trusted conversations and a single inbound call.
        </span>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line">
          {/* Left — approval-driven */}
          <div className="p-6 md:p-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-3">
              How marketing is typically structured
            </div>
            <h3 className="font-serif text-2xl md:text-3xl leading-[1.15] mb-6">
              Built for{" "}
              <em className="text-muted italic font-normal">approvals.</em>
            </h3>
            <ul className="space-y-3">
              {approvalsSide.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-[14px] leading-[1.5] text-muted border-b border-line pb-3 last:border-0"
                >
                  <span
                    className="mt-0.5 text-base flex-shrink-0"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — decision-driven */}
          <div className="p-6 md:p-10 bg-ink text-paper">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3"
              style={{ color: "#7A8A82" }}
            >
              How healthcare decisions are actually made
            </div>
            <h3 className="font-serif text-2xl md:text-3xl leading-[1.15] mb-6">
              Built around{" "}
              <em
                className="italic font-normal"
                style={{ color: "#A8C0B4" }}
              >
                the moment.
              </em>
            </h3>
            <ul className="space-y-3">
              {decisionsSide.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-[14px] leading-[1.5] border-b pb-3 last:border-0"
                  style={{ borderColor: "#2C3A35", color: "#C9D2C8" }}
                >
                  <span
                    className="mt-0.5 text-base flex-shrink-0"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-6 md:px-10 py-5 border-t border-line bg-surface">
          <p className="font-mono text-[11px] leading-[1.6] text-muted">
            The gap between these two columns is where most hospital marketing
            budgets disappear. Building for decisions — not approvals — is the
            only way to close it.
          </p>
        </div>
      </div>

      {caption ? (
        <figcaption className="mt-4 text-[13px] leading-[1.55] text-muted max-w-[720px]">
          {caption}
        </figcaption>
      ) : null}

      {/* Long description — crawler-only */}
      <div className="sr-only" aria-hidden="true">
        <p>
          Hospital marketing is typically structured around approval cycles,
          annual campaign calendars, brand guidelines, and outputs measured in
          impressions — optimised for internal sign-off, not for patient
          behaviour. Healthcare decisions, by contrast, happen in private
          moments: a midnight symptom search, a YouTube video of the surgeon
          speaking, a WhatsApp conversation with a trusted relative, a Google
          review check, and a single phone call. The hospital that shows up
          consistently at every one of those moments wins the appointment. The
          hospital that optimised for the campaign calendar does not.
        </p>
      </div>
    </figure>
  );
}
