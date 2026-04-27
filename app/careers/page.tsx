import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQ } from "@/components/marketing/FAQ";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description:
    "We hire slowly, deliberately, and against a single bar: would we want this person reviewing our own work? Open roles publish here when we're ready to fill them properly.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `Careers — ${site.name}`,
    description:
      "We hire slowly. Open roles publish here when we're ready to fill them properly.",
    url: `${site.url}/careers`,
    type: "website",
  },
};

const principles = [
  {
    n: "01",
    title: "We hire from the work, not the funnel",
    body: "Most of our team joined because we worked with them on a client project, a freelance brief, or a panel. Cold applications are read; they rarely win against people we've already shipped with.",
  },
  {
    n: "02",
    title: "Compensation is transparent inside the firm",
    body: "Every salary band is visible to every employee. We benchmark against the top quartile for India agency work and pay the band, not the negotiation.",
  },
  {
    n: "03",
    title: "We don't grow for the sake of growth",
    body: "We stay small enough that the founders are still on every account. If hiring you means we'd lose that, we won't hire — even if there's revenue waiting.",
  },
  {
    n: "04",
    title: "Healthcare is the brief, not a vertical",
    body: "If you're looking for an agency that does healthcare on Tuesdays and fintech on Thursdays, we're not it. We chose one industry on purpose. We're not going to revisit that for a hire.",
  },
] as const;

const careersFaq = [
  {
    q: "Do you take freelancers or contractors?",
    a: "Selectively, yes — usually for video production, illustration, or specialist medical writing. Send a portfolio and the clinical specialty you're most comfortable with to careers@qlarify.health.",
  },
  {
    q: "Do you hire interns?",
    a: "We run two paid internship cohorts a year — one in Bengaluru, one in Mumbai. Applications open in January and June. We hire 4–6 each cohort and offer return offers to about half.",
  },
  {
    q: "Do you sponsor relocation?",
    a: "Within India, yes, for confirmed offers. We don't currently sponsor work visas to India.",
  },
  {
    q: "What's the interview like?",
    a: "Three conversations and one paid take-home. No whiteboarding, no trivia. The take-home is a real (anonymised) brief from a recent engagement; you keep the IP either way.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers · Hiring philosophy"
        title={
          <>
            We hire slowly,
            <br />
            <em className="text-sage italic font-normal">on purpose.</em>
          </>
        }
        sub="No open roles right now. When we are hiring, the position publishes on this page with a real brief, a real salary band, and a real timeline. If you'd like to be told first, write to us."
        meta={[
          { label: "Open roles", value: "0" },
          { label: "Team size", value: "34" },
          { label: "Avg. tenure", value: "3.6 yrs" },
          { label: "Cohorts / yr", value: "2" },
        ]}
      />

      <section
        aria-labelledby="principles-heading"
        className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-20 md:pb-28 border-t border-line"
      >
        <Reveal>
          <h2
            id="principles-heading"
            className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-12 md:mb-16 max-w-[680px]"
          >
            How we hire,{" "}
            <em className="text-sage italic font-normal">in plain words.</em>
          </h2>
        </Reveal>

        <ul className="grid md:grid-cols-2 gap-6 md:gap-8">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 80}>
              <article className="bg-surface border border-line rounded-[20px] p-8 md:p-10 h-full">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-sage mb-5">
                  {p.n}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">
                  {p.title}
                </h3>
                <p className="text-base md:text-[17px] leading-[1.55] text-muted">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="register-heading"
        className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-ink text-paper"
      >
        <div className="max-w-[820px]">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sage mb-6">
              Stay close
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2
              id="register-heading"
              className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] mb-8"
            >
              No role today.{" "}
              <em className="text-sage italic font-normal">
                Maybe one tomorrow.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-lg md:text-xl leading-[1.55] mb-10 max-w-[680px] opacity-80">
              Write to{" "}
              <a
                href="mailto:careers@qlarify.health"
                className="underline underline-offset-4 decoration-line/40 hover:decoration-paper transition-colors"
              >
                careers@qlarify.health
              </a>{" "}
              with the kind of work you do, the kind of work you want to do
              next, and one piece you&rsquo;re proud of. We read every email and
              reply within 10 working days. We don&rsquo;t keep a CV database;
              we keep notes on the people we&rsquo;d call when something opens
              up.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper text-ink font-mono text-[11px] uppercase tracking-[0.14em] hover:bg-sage-soft transition-colors"
              >
                Meet the team →
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-paper/30 font-mono text-[11px] uppercase tracking-[0.14em] hover:border-paper transition-colors"
              >
                See the work →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ items={careersFaq} title="Practical questions" eyebrow="FAQ" />
    </>
  );
}
