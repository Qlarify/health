import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const symptoms = [
  {
    t: "Reports full of vanity",
    d: "Monthly decks of impressions, clicks and reach. Never a single qualified patient enquiry attributed properly.",
  },
  {
    t: "Spend resets every quarter",
    d: "Nothing compounds. The asset library grows, but trust and ranking start from zero each cycle.",
  },
  {
    t: "Doctors look uncomfortable",
    d: "On camera, on the website, in the hospital reel — because no one briefed them, and no one understood the clinical context.",
  },
  {
    t: "Team turns over every 18 months",
    d: "Institutional memory walks out the door with them. The agency has to be re-onboarded by a new in-house lead.",
  },
] as const;

export function Problem() {
  return (
    <section
      id="problem"
      className="px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-10"
    >
      <Reveal>
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20 mb-16">
          <div>
            <Eyebrow className="mb-4">The problem — 01</Eyebrow>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]">
              Activity ≠
              <br />
              <em className="text-sage italic font-normal">outcomes.</em>
            </h2>
          </div>
          <p className="self-end text-lg leading-[1.55] text-muted max-w-[560px]">
            Agencies without healthcare context run hospital marketing on a
            playbook that was never built for how patients actually decide.
          </p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-6">
        {symptoms.map((s, i) => (
          <Reveal key={s.t} delay={i * 60}>
            <div className="bg-surface border border-line rounded-[20px] p-7 md:p-8 h-full">
              <h3 className="font-serif text-2xl md:text-[28px] leading-[1.15] mb-3">
                {s.t}
              </h3>
              <p className="text-[15px] leading-[1.55] text-muted">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
