import { Btn } from "@/components/ui/Btn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

// V1-refined Hero A — staggered Reveal blocks reproduce the load-in choreography
// of the prototype's AnimatedHeadline without a custom component.
export function Hero() {
  return (
    <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-[1100px]">
        <Reveal y={12}>
          <Eyebrow dot className="mb-6 md:mb-8">
            Healthcare marketing agency · India
          </Eyebrow>
        </Reveal>

        <Reveal delay={120} y={32}>
          <h1 className="font-serif text-[44px] sm:text-[64px] md:text-[88px] leading-[1.02] tracking-[-0.02em] mb-6 md:mb-8">
            Busy marketing.{" "}
            <em className="text-sage italic font-normal">Quiet OPD?</em>
          </h1>
        </Reveal>

        <Reveal delay={320}>
          <p className="text-lg md:text-[21px] leading-[1.5] text-muted max-w-[640px] mb-8 md:mb-10">
            We help hospitals maximise enquiry volume, inbound call conversions
            and marketing ROI — through strategy, content and digital systems
            built exclusively for healthcare.
          </p>
        </Reveal>

        <Reveal delay={480}>
          <div className="flex flex-wrap items-center gap-3">
            <Btn href="#audit" withArrow>
              Claim free YouTube audit
            </Btn>
            <Btn href="#method" variant="secondary">
              How we work
            </Btn>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted ml-2">
              Report in 48 hrs · No commitment
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
