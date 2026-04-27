import { Eyebrow } from "@/components/ui/Eyebrow";

// Hospital names — roman/italic alternation for editorial pacing.
// Replace with logo marks once written permission lands.
const hospitals = [
  "Manipal",
  "Narayana Health",
  "Sparsh",
  "KIMS",
  "Sakra World",
  "Rainbow",
  "Gleneagles",
  "Apollo",
  "Fortis",
  "Aster",
] as const;

// Tripled so no single name is ever on-screen twice at the same moment
const tripled = [...hospitals, ...hospitals, ...hospitals];

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
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)",
          }}
        >
          <ul
            className="flex gap-12 md:gap-16 opacity-65"
            style={{ animation: "marquee 42s linear infinite" }}
          >
            {tripled.map((name, i) => (
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
