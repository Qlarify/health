import { Btn } from "@/components/ui/Btn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const mechanisms = [
  {
    n: "01",
    label: "Rebuilt the YouTube channel",
    body: "Specialty playlists, doctor-led explainers, packaging tuned to how patients actually search for treatment.",
  },
  {
    n: "02",
    label: "Reworked intake",
    body: "Call-centre scripts, slot discipline and follow-up cadence — the layer where most ad spend silently leaks.",
  },
  {
    n: "03",
    label: "Rewired the funnel",
    body: "Performance creative tied to call-tracking and downstream OPD, not to dashboard impressions.",
  },
];

export function CaseStudy() {
  return (
    <section
      aria-labelledby="case-study-heading"
      className="px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-24 md:pb-36"
    >
      <Reveal>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
          <div>
            <Eyebrow className="mb-4">Case study — 04</Eyebrow>
            <h2
              id="case-study-heading"
              className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
            >
              A 480-bed hospital,
              <br />
              <em className="text-sage italic font-normal">three quarters in.</em>
            </h2>
          </div>
          <p className="text-lg leading-[1.55] text-muted max-w-[520px]">
            A multi-specialty hospital in South India came to us with a busy
            ad calendar and a quiet OPD. Three things changed — none of them
            were the creative.
          </p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="bg-surface border border-line rounded-3xl p-8 md:p-14">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 mb-10 md:mb-14">
            {mechanisms.map((m) => (
              <li key={m.n} className="border-t-2 border-ink pt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-3">
                  {m.n}
                </div>
                <h3 className="font-serif text-xl md:text-[22px] leading-[1.2] mb-3">
                  {m.label}
                </h3>
                <p className="text-[14px] leading-[1.55] text-muted">{m.body}</p>
              </li>
            ))}
          </ul>

          <blockquote className="border-t border-line pt-8 max-w-[720px]">
            <p className="font-serif text-2xl md:text-[28px] leading-[1.25] tracking-[-0.01em] mb-6">
              &ldquo;We stopped buying impressions and started buying
              decisions. The reporting finally tied back to OPD, not
              dashboards.&rdquo;
            </p>
            <footer className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Head of Marketing · 480-bed multi-specialty · South India
            </footer>
          </blockquote>

          <div className="sr-only" aria-hidden="true">
            <p className="mt-8 font-mono text-[11px] leading-[1.6] text-muted max-w-[720px]">
              We publish outcome numbers only with written hospital permission.
              Engagement specifics — measurement window, baseline, methodology —
              are shared in the audit conversation.
            </p>
          </div>

          <div className="mt-10 md:mt-12">
            <Btn href="/work" variant="secondary" withArrow>
              Read the full case
            </Btn>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
