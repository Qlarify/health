import Link from "next/link";
import { footerSections, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-6 md:px-12 lg:px-20 pt-16 pb-10">
      <div className="grid gap-10 md:grid-cols-[2fr_repeat(4,1fr)] mb-20">
        <div>
          <Link href="/" className="inline-flex mb-4" aria-label={`${site.name} — home`}>
            <svg
              viewBox="0 0 240 90"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              className="h-11 w-auto"
            >
              <rect x="4" y="4" width="44" height="44" rx="3" ry="3" fill="#2C3A35" />
              <rect x="13" y="12" width="26" height="27" rx="3" ry="3" fill="#F4F1EA" />
              <line x1="44" y1="46" x2="57" y2="61" stroke="#2C3A35" strokeWidth="7" strokeLinecap="round" />
              <text x="62" y="38" fontFamily="var(--font-inter-tight), Arial, sans-serif" fontSize="30" fontWeight="700" letterSpacing="1" fill="#2C3A35">LARIFY</text>
              <text x="66" y="62" fontFamily="var(--font-inter-tight), Arial, sans-serif" fontSize="17" fontWeight="700" letterSpacing="6" fill="#5C7A6E">HEALTH</text>
            </svg>
          </Link>
          <p className="font-serif text-[28px] leading-[1.1] max-w-[360px]">
            {site.tagline}
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={section.heading}>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted mb-4">
              {section.heading}
            </p>
            <ul className="space-y-2 text-sm">
              {section.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line pt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between font-mono text-[11px] text-muted">
        <p>
          © {new Date().getFullYear()} {site.name} · Made in India
        </p>
        <p className="md:text-center">
          A{" "}
          <span className="text-ink">{site.parent.name}</span>{" "}
          company · Est. {site.parent.founded}
        </p>
        <p>
          {site.email} · {site.phone}
        </p>
      </div>
    </footer>
  );
}
