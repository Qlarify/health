import Image from "next/image";

// Portrait renders one of two states:
// (1) a real headshot via next/image when `src` is provided, or
// (2) an SVG initial-bubble placeholder using the dark-block sub-ramp.
//
// The two states share dimensions so swapping in real photos as they land
// from leadership/practice-leads doesn't shift the page layout.

const tones = [
  { bg: "#D4DDD8", fg: "#3F5851" },
  { bg: "#E3E8E1", fg: "#5C7A6E" },
  { bg: "#C9D2C8", fg: "#2C3A35" },
  { bg: "#EFE9DC", fg: "#6B7670" },
] as const;

const imageSizes = {
  lg: "(min-width: 768px) 25vw, 50vw",
  sm: "(min-width: 768px) 16vw, 33vw",
} as const;

export function Portrait({
  initials,
  name,
  src,
  tone = 0,
  size = "lg",
  priority = false,
}: {
  initials: string;
  name?: string;
  src?: string;
  tone?: number;
  size?: "lg" | "sm";
  priority?: boolean;
}) {
  const t = tones[tone % tones.length];
  const radiusClass = size === "sm" ? "rounded-xl" : "rounded-2xl";

  if (src) {
    return (
      <div
        className={`relative aspect-[4/5] overflow-hidden ${radiusClass} bg-surface`}
      >
        <Image
          src={src}
          alt={name ? `Portrait of ${name}` : `Portrait of ${initials}`}
          fill
          sizes={imageSizes[size]}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          quality={88}
        />
      </div>
    );
  }

  const idSafe = initials.replace(/[^A-Z]/gi, "");
  const gradId = `portrait-grad-${idSafe}-${tone}`;

  return (
    <div
      role="img"
      aria-label={
        name
          ? `Portrait placeholder for ${name}`
          : `Portrait placeholder for ${initials}`
      }
      className={`aspect-[4/5] ${radiusClass} overflow-hidden`}
      style={{ background: t.bg }}
    >
      <svg viewBox="0 0 200 250" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={t.bg} />
            <stop offset="1" stopColor={t.fg} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect width="200" height="250" fill={`url(#${gradId})`} />
        <circle cx="100" cy="100" r="42" fill={t.fg} opacity="0.18" />
        <path
          d="M30 250 Q30 170 100 165 Q170 170 170 250 Z"
          fill={t.fg}
          opacity="0.18"
        />
        <text
          x="100"
          y="240"
          textAnchor="middle"
          fontSize="11"
          fill={t.fg}
          fontFamily="var(--font-mono)"
          letterSpacing="2"
          opacity="0.9"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
