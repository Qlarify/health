import { Eyebrow } from "@/components/ui/Eyebrow";

// Real hospital names that the prototype lists. Replace with logos once
// written permission lands (Sprint 5). Italic alternation borrowed from the
// prototype's editorial pacing — Manipal/Sparsh/Gleneagles roman, others italic.
const hospitals = [
  "Manipal",
  "Narayana",
  "Sparsh",
  "Sakra World",
  "Gleneagles",
  "Rainbow",
] as const;

// Doubled for seamless infinite marquee loop
const doubled = [...hospitals, ...hospitals];

export function TrustedBy() {
  return (
    <section
      aria-label="Hospitals we have worked with"
      className="px-6 md:px-12 lg:px-20 py-10 md:py-14 border-y border-line"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-16">
        <Eyebrow className="shrink-0 md:max-w-[200px] md:whitespace-nowrap">
          Engagements 2014–2024
        </Eyebrow>

        {/* Animated marquee track — hidden from screen readers */}
        <div
          className="flex-1 overflow-hidden"
          aria-hidden="true"
        >
          <ul
            className="flex gap-12 md:gap-16 opacity-65"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {doubled.map((name, i) => (
              <li
                key={i}
                className={`font-serif text-base md:text-lg text-ink whitespace-nowrap shrink-0${
                  i % 2 === 1 ? " italic" : ""
                }`}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        {/* Accessible static fallback for screen readers */}
        <ul className="sr-only">
          {hospitals.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
