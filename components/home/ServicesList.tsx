import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type ServiceRow = {
  n: string;
  t: string;
  d: string;
  stage: string;
  href: string;
  flag?: boolean;
};

const services: ServiceRow[] = [
  {
    n: "01",
    t: "YouTube for hospitals",
    d: "Channel strategy, doctor-led video production, packaging and growth — physicians remain among the most-trusted information sources in health decisions.",
    stage: "Awareness → Decision",
    flag: true,
    href: "/services/youtube-for-hospitals",
  },
  {
    n: "02",
    t: "Social media marketing",
    d: "Instagram, Facebook, LinkedIn — the channels where patients comb through credibility before they ever click an ad.",
    stage: "Awareness → Consideration",
    href: "/services/social-media-marketing",
  },
  {
    n: "03",
    t: "SEO for hospitals",
    d: "Rank for the queries patients actually type — symptoms, doctors, localities, procedure costs.",
    stage: "Awareness → Consideration",
    href: "/services/seo-for-hospitals",
  },
  {
    n: "04",
    t: "Performance marketing",
    d: "Ads tuned for lead quality, not volume. Tied to call-tracking and downstream OPD outcomes.",
    stage: "Consideration → Decision",
    href: "/services/performance-marketing",
  },
  {
    n: "05",
    t: "Content marketing",
    d: "Medically-reviewed content that earns trust and ranks. Written by clinicians, structured for search.",
    stage: "Awareness → Consideration",
    href: "/services/content-marketing",
  },
  {
    n: "06",
    t: "Email & WhatsApp",
    d: "Lifecycle nurture on the two channels patients in India actually read.",
    stage: "Consideration → Advocacy",
    href: "/services/email-and-whatsapp",
  },
];

export function ServicesList() {
  return (
    <section
      id="services"
      className="px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-24 md:pb-36 bg-surface border-y border-line"
    >
      <Reveal>
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-12 md:mb-16 items-end">
          <div>
            <Eyebrow className="mb-4">Services — 03</Eyebrow>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em]">
              Six practices.
              <br />
              <em className="text-sage italic font-normal">One journey.</em>
            </h2>
          </div>
          <p className="text-lg leading-[1.55] text-muted max-w-[520px]">
            Each practice maps to a decision moment in the patient journey.
            Built to compound — not to vanish at the end of a campaign cycle.
          </p>
        </div>
      </Reveal>

      <ul className="border-t border-line">
        {services.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 50}>
            <Link
              href={s.href}
              className="group grid grid-cols-[40px_1fr_24px] md:grid-cols-[60px_1fr_1.4fr_1fr_40px] gap-4 md:gap-8 items-center py-6 md:py-8 border-b border-line transition-[padding,background-color] duration-200 motion-reduce:transition-none hover:pl-3 hover:bg-paper"
            >
              <span
                className={`font-mono text-xs tracking-[0.12em] ${
                  s.flag ? "text-sage" : "text-muted"
                }`}
              >
                {s.n}
              </span>

              <h3 className="font-serif text-2xl md:text-[32px] leading-[1.1] flex items-center flex-wrap gap-3">
                {s.t}
                {s.flag && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] px-2 py-1 rounded-full bg-sage text-paper font-medium">
                    Flagship
                  </span>
                )}
              </h3>

              <p className="hidden md:block text-[15px] leading-[1.55] text-muted">
                {s.d}
              </p>

              <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.12em] text-sage">
                {s.stage}
              </span>

              <span
                aria-hidden="true"
                className="text-lg text-ink text-right transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
