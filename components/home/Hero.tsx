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
            We map your hospital&apos;s patient journey — all six stages, from
            first search to post-discharge advocacy — find exactly where
            patients are being lost, and build what fixes that specific gap.
            Not a retainer. A system.
          </p>
        </Reveal>

        <Reveal delay={480}>
          <div className="flex flex-wrap items-center gap-3">
            <Btn href="/contact" withArrow>
              Book a discovery call
            </Btn>
            <Btn href="#audit" variant="secondary">
              Free YouTube audit
            </Btn>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted ml-2">
              No commitment · South India focus
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
