import { Btn } from "@/components/ui/Btn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JourneyExplorer } from "@/components/visuals/interactive/JourneyExplorer";

export function Method() {
  return (
    <section
      id="method"
      className="px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-24 md:pb-36"
    >
      <Reveal>
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-16 md:mb-20">
          <div>
            <Eyebrow className="mb-4">What we do differently — 02</Eyebrow>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1] tracking-[-0.02em]">
              Map the journey.
              <br />
              <em className="text-sage italic font-normal">Then build.</em>
            </h2>
          </div>
          <p className="self-end text-lg leading-[1.55] text-muted max-w-[480px]">
            Every asset is mapped to a decision moment — awareness,
            consideration, decision, post-consult, advocacy — so each piece
            moves the patient one step further into care.
          </p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mb-12 md:mb-16">
          <JourneyExplorer />
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="mt-4 md:mt-6 text-center">
          <Btn href="#audit" withArrow>
            Show me where enquiries are being lost
          </Btn>
        </div>
      </Reveal>
    </section>
  );
}
