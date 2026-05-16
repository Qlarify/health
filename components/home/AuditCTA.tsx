import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "./LeadForm";

const promises = [
  ["Channel & packaging review", "Thumbnails, titles, playlists, and end-screen conversion paths"],
  ["Doctor video performance", "Which doctors retain attention, which formats drive enquiries"],
  ["Content gap analysis", "Symptom and procedure searches your channel is missing"],
] as const;

export function AuditCTA() {
  return (
    <section
      id="audit"
      aria-labelledby="audit-heading"
      className="px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-24 md:pb-36 border-t border-line scroll-mt-24"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <Reveal>
          <div>
            <Eyebrow className="mb-6 md:mb-8">Free YouTube audit — 06</Eyebrow>
            <h2
              id="audit-heading"
              className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] mb-7 md:mb-8"
            >
              See where your channel is{" "}
              <em className="text-sage italic font-normal">
                leaving patients
              </em>{" "}
              on the table.
            </h2>
            <p className="text-lg leading-[1.55] text-muted mb-10 max-w-[480px]">
              We&apos;ll audit your hospital&apos;s YouTube channel —
              packaging, content gaps, doctor performance, and conversion to
              consult — and send a written report in 48 hours. No deck. No
              pitch. No commitment.
            </p>
            <ul className="border-t border-line pt-6">
              {promises.map(([t, d], i) => (
                <li
                  key={t}
                  className="grid grid-cols-[24px_1fr] gap-4 mb-5 last:mb-0"
                >
                  <span className="font-mono text-[11px] text-sage pt-1">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="text-base font-medium mb-0.5">{t}</div>
                    <div className="text-[13px] text-muted leading-[1.45]">
                      {d}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
