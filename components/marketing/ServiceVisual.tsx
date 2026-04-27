import type { Service } from "@/content/services";

// Per-service infographic — small editorial visual that frames the discipline.
// Lifted from the prototype and rebuilt with token-driven CSS variables so
// they re-skin if the palette ever shifts.

export function ServiceVisual({ kind }: { kind: Service["visual"] }) {
  const labelMap: Record<Service["visual"], string> = {
    youtube: "Illustration of a YouTube player tile and metrics",
    social: "Illustration of an Instagram post and channel pills",
    seo: "Illustration of a search-results ranking ladder",
    funnel: "Illustration of a marketing funnel narrowing to OPD bookings",
    content:
      "Illustration of a clinically-reviewed article with multi-language tags",
    lifecycle:
      "Illustration of a patient lifecycle from enquiry to annual check",
  };

  const ink = "var(--color-ink)";
  const paper = "var(--color-paper)";
  const sage = "var(--color-sage)";
  const sageSoft = "var(--color-sage-soft)";
  const muted = "var(--color-muted)";
  const line = "var(--color-line)";
  const surface = "var(--color-surface)";
  const mono = "var(--font-mono)";
  const serif = "var(--font-serif)";
  const sans = "var(--font-sans)";

  if (kind === "youtube") {
    return (
      <svg viewBox="0 0 400 240" role="img" aria-label={labelMap.youtube} className="w-full h-auto">
        <rect x="20" y="20" width="360" height="200" rx="12" fill={surface} stroke={line} />
        <rect x="40" y="40" width="320" height="140" rx="6" fill={sageSoft} />
        <polygon points="180,90 180,140 220,115" fill={sage} />
        <rect x="40" y="190" width="180" height="6" rx="3" fill={line} />
        <rect x="40" y="202" width="120" height="4" rx="2" fill={line} />
        <text x="350" y="206" textAnchor="end" fontSize="9" fill={muted} fontFamily={mono}>
          847K · 1.2M VIEWS
        </text>
      </svg>
    );
  }
  if (kind === "social") {
    return (
      <svg viewBox="0 0 400 240" role="img" aria-label={labelMap.social} className="w-full h-auto">
        <rect x="120" y="20" width="160" height="200" rx="14" fill={surface} stroke={line} strokeWidth="1.5" />
        <rect x="130" y="36" width="140" height="20" rx="4" fill={paper} />
        <circle cx="142" cy="46" r="6" fill={sage} />
        <text x="154" y="49" fontSize="8" fill={ink} fontFamily={sans} fontWeight="500">
          drmehta.cardio
        </text>
        <text x="154" y="58" fontSize="6" fill={muted} fontFamily={sans}>
          2h · Manipal Hospital
        </text>
        <rect x="130" y="62" width="140" height="100" rx="4" fill={sageSoft} />
        <text x="200" y="115" textAnchor="middle" fontSize="11" fill={sage} fontFamily={serif} fontStyle="italic">
          &ldquo;5 signs your chest pain
        </text>
        <text x="200" y="128" textAnchor="middle" fontSize="11" fill={sage} fontFamily={serif} fontStyle="italic">
          isn&apos;t a heart attack.&rdquo;
        </text>
        <g transform="translate(130, 168)">
          <path d="M4 4 L8 0 L12 4 L8 8 Z" fill={ink} />
          <text x="18" y="7" fontSize="7" fill={muted} fontFamily={mono}>2.4K</text>
          <circle cx="48" cy="4" r="3" fill="none" stroke={ink} />
          <text x="56" y="7" fontSize="7" fill={muted} fontFamily={mono}>187</text>
          <rect x="80" y="0" width="8" height="8" rx="1" fill="none" stroke={ink} />
          <text x="92" y="7" fontSize="7" fill={muted} fontFamily={mono}>342</text>
        </g>
        <rect x="20" y="50" width="80" height="22" rx="11" fill={surface} stroke={line} />
        <text x="60" y="64" textAnchor="middle" fontSize="9" fill={ink} fontFamily={mono}>● INSTAGRAM</text>
        <rect x="20" y="110" width="80" height="22" rx="11" fill={sage} />
        <text x="60" y="124" textAnchor="middle" fontSize="9" fill={paper} fontFamily={mono}>● FACEBOOK</text>
        <rect x="20" y="170" width="80" height="22" rx="11" fill={surface} stroke={line} />
        <text x="60" y="184" textAnchor="middle" fontSize="9" fill={ink} fontFamily={mono}>● LINKEDIN</text>
        <rect x="300" y="80" width="80" height="22" rx="11" fill={surface} stroke={line} />
        <text x="340" y="94" textAnchor="middle" fontSize="9" fill={ink} fontFamily={mono}>+12.4K / mo</text>
        <rect x="300" y="140" width="80" height="22" rx="11" fill={surface} stroke={line} />
        <text x="340" y="154" textAnchor="middle" fontSize="8" fill={ink} fontFamily={mono}>340% ENGMT</text>
      </svg>
    );
  }
  if (kind === "seo") {
    const rows = [
      { y: 30, w: 320, label: "best cardiologist bangalore" },
      { y: 70, w: 280, label: "chest pain symptoms when to worry" },
      { y: 110, w: 240, label: "angioplasty cost india" },
      { y: 150, w: 200, label: "echocardiogram near me" },
      { y: 190, w: 160, label: "manipal hospital reviews" },
    ];
    return (
      <svg viewBox="0 0 400 240" role="img" aria-label={labelMap.seo} className="w-full h-auto">
        {rows.map((r, i) => (
          <g key={r.label}>
            <rect x="40" y={r.y} width={r.w} height="20" rx="4" fill={i === 0 ? sage : sageSoft} />
            <text x="48" y={r.y + 14} fontSize="10" fill={i === 0 ? paper : ink} fontFamily={mono}>
              {r.label}
            </text>
            <text x={40 + r.w + 8} y={r.y + 14} fontSize="9" fill={muted} fontFamily={mono}>
              #{i + 1}
            </text>
          </g>
        ))}
      </svg>
    );
  }
  if (kind === "funnel") {
    const rows = [
      { y: 30, w: 320, label: "Impressions", val: "1.2M" },
      { y: 70, w: 240, label: "Clicks", val: "38K" },
      { y: 110, w: 160, label: "Form starts", val: "4,200" },
      { y: 150, w: 100, label: "Qualified", val: "1,840" },
      { y: 190, w: 60, label: "OPD booked", val: "1,210" },
    ];
    return (
      <svg viewBox="0 0 400 240" role="img" aria-label={labelMap.funnel} className="w-full h-auto">
        {rows.map((r, i) => (
          <g key={r.label}>
            <rect
              x={(400 - r.w) / 2}
              y={r.y}
              width={r.w}
              height="22"
              rx="4"
              fill={i === 4 ? sage : sageSoft}
              stroke={sage}
              strokeWidth="0.5"
            />
            <text x="200" y={r.y + 15} textAnchor="middle" fontSize="10" fill={i === 4 ? paper : ink} fontFamily={sans}>
              {r.label}
            </text>
            <text x={400 - (400 - r.w) / 2 + 12} y={r.y + 15} fontSize="9" fill={muted} fontFamily={mono}>
              {r.val}
            </text>
          </g>
        ))}
      </svg>
    );
  }
  if (kind === "content") {
    return (
      <svg viewBox="0 0 400 240" role="img" aria-label={labelMap.content} className="w-full h-auto">
        <rect x="40" y="30" width="320" height="180" rx="8" fill={surface} stroke={line} />
        <text x="56" y="58" fontSize="13" fill={ink} fontFamily={serif} fontStyle="italic">
          Understanding cardiac arrhythmia
        </text>
        <text x="56" y="76" fontSize="9" fill={sage} fontFamily={mono}>
          ● CLINICALLY REVIEWED · DR. R. MEHTA, MD
        </text>
        {[90, 105, 120, 135, 150].map((y, i) => (
          <rect key={y} x="56" y={y} width={i === 4 ? 200 : 280} height="3" rx="1.5" fill={line} />
        ))}
        <rect x="56" y="170" width="60" height="20" rx="10" fill={sageSoft} />
        <text x="86" y="184" textAnchor="middle" fontSize="9" fill={sage} fontFamily={mono}>हिं</text>
        <rect x="120" y="170" width="60" height="20" rx="10" fill={sageSoft} />
        <text x="150" y="184" textAnchor="middle" fontSize="9" fill={sage} fontFamily={mono}>EN</text>
        <rect x="184" y="170" width="60" height="20" rx="10" fill={sageSoft} />
        <text x="214" y="184" textAnchor="middle" fontSize="9" fill={sage} fontFamily={mono}>ಕ</text>
      </svg>
    );
  }
  // lifecycle
  const steps = [
    { x: 50, y: 80, t: "Enquiry received", day: "D0" },
    { x: 130, y: 80, t: "WhatsApp confirm", day: "D0" },
    { x: 210, y: 80, t: "Pre-consult prep", day: "D-1" },
    { x: 290, y: 80, t: "Consult", day: "D1" },
    { x: 90, y: 170, t: "Follow-up", day: "D7" },
    { x: 170, y: 170, t: "Test reminder", day: "D14" },
    { x: 250, y: 170, t: "Annual", day: "D365" },
  ];
  return (
    <svg viewBox="0 0 400 240" role="img" aria-label={labelMap.lifecycle} className="w-full h-auto">
      {steps.map((s) => (
        <g key={s.t}>
          <circle cx={s.x} cy={s.y} r="20" fill={sageSoft} stroke={sage} strokeWidth="1" />
          <text x={s.x} y={s.y + 3} textAnchor="middle" fontSize="9" fill={sage} fontFamily={mono}>
            {s.day}
          </text>
          <text x={s.x} y={s.y + 36} textAnchor="middle" fontSize="9" fill={ink} fontFamily={sans}>
            {s.t}
          </text>
        </g>
      ))}
      <path d="M70 80 Q100 40 130 80 T210 80 T290 80" stroke={line} strokeDasharray="3 3" fill="none" />
      <path d="M290 100 Q200 140 110 170 T250 170" stroke={line} strokeDasharray="3 3" fill="none" />
    </svg>
  );
}
