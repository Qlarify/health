import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

// Testimonial slot — three named-attributed quotes. Initials-bubble portraits
// are placeholders until photographed headshots land (Sprint 5).
const voices = [
  {
    quote:
      "They walked into our boardroom, but they wrote like they walked the OPD floor. The audit pointed at things our previous agency never asked about.",
    name: "Vikram R.",
    role: "Group Marketing Head",
    org: "Multi-specialty chain · 1,200 beds",
    initial: "V",
  },
  {
    quote:
      "We hired Qlarify because they refused to promise reach. Eighteen months later, doctor-led video is the single channel we plan around.",
    name: "Aisha M.",
    role: "Chief Marketing Officer",
    org: "Tertiary care hospital · Bengaluru",
    initial: "A",
  },
  {
    quote:
      "It's the first time our content calendar has been ratified by the clinical team without a fight. That alone has changed how we ship.",
    name: "Rohan S.",
    role: "Head of Digital",
    org: "Women's & children's hospital · Mumbai",
    initial: "R",
  },
] as const;

export function Voices() {
  return (
    <section
      aria-labelledby="voices-heading"
      className="px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-24 md:pb-36 bg-surface border-y border-line"
    >
      <Reveal>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
          <div>
            <Eyebrow className="mb-4">Voices — 05</Eyebrow>
            <h2
              id="voices-heading"
              className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]"
            >
              Years.
              <br />
              <em className="text-sage italic font-normal">
                Not campaigns.
              </em>
            </h2>
          </div>
          <p className="text-lg leading-[1.55] text-muted max-w-[520px]">
            Marketing leaders who stayed for the second year, the third, the
            fourth. Three of them, on the record about what changed —
            names lightly anonymised pending full attribution.
          </p>
        </div>
      </Reveal>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {voices.map((v, i) => (
          <Reveal as="li" key={v.name} delay={i * 80}>
            <figure className="bg-paper border border-line rounded-3xl p-7 md:p-8 h-full flex flex-col">
              <blockquote className="font-serif text-xl md:text-[22px] leading-[1.35] tracking-[-0.005em] flex-1 mb-8">
                &ldquo;{v.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-sage-soft text-sage font-serif text-lg flex items-center justify-center shrink-0"
                >
                  {v.initial}
                </span>
                <div>
                  <div className="text-sm font-medium text-ink">{v.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mt-1">
                    {v.role} · {v.org}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
