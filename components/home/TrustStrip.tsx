import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

// Quiet trust signals — present, never the headline.
// India-context: DPDP (Digital Personal Data Protection Act 2023), ISO 27001 for
// data handling, WCAG 2.2 AA for accessibility, and a clinical-review marker
// that earns more trust here than any tech-vendor badge would.
const badges = [
  "DPDP Act 2023 compliant",
  "ISO 27001 aligned",
  "WCAG 2.2 AA",
  "Medically reviewed content",
] as const;

export function TrustStrip() {
  return (
    <Reveal as="section" className="px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-16 md:pb-20 border-t border-line">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Eyebrow>How we handle your data &amp; ours</Eyebrow>

        <ul
          aria-label="Compliance and standards"
          className="flex flex-wrap gap-2"
        >
          {badges.map((b) => (
            <li
              key={b}
              className="px-3 py-1.5 rounded-full bg-paper border border-line font-mono text-[11px] tracking-[0.04em] text-muted"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 max-w-[640px] text-sm leading-[1.55] text-muted">
        Patient and prospect data is collected with explicit consent, stored in
        India, and never sold. See our{" "}
        <a
          href="/dpdp"
          className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
        >
          DPDP notice
        </a>{" "}
        for what we collect, why, and how to withdraw consent.
      </p>
    </Reveal>
  );
}
