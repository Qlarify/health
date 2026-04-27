"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={[
        "sticky top-0 z-50 w-full border-b transition-[padding,background,border-color] duration-300 ease-quart motion-reduce:transition-none",
        scrolled
          ? "bg-paper/90 backdrop-blur-md border-line py-3"
          : "bg-paper border-transparent py-6",
      ].join(" ")}
    >
      <div className="px-6 md:px-12 lg:px-20 flex items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="shrink-0 flex items-center"
        >
          {/* Inline SVG logo — scales on scroll via height transition */}
          <svg
            viewBox="0 0 240 90"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            className={[
              "transition-all duration-300 ease-quart motion-reduce:transition-none w-auto",
              scrolled ? "h-9" : "h-12",
            ].join(" ")}
          >
            {/* Magnifier mark — forms the Q */}
            <rect x="4" y="4" width="44" height="44" rx="3" ry="3" fill="#2C3A35" />
            {/* Inner lens */}
            <rect x="13" y="12" width="26" height="27" rx="3" ry="3" fill="#F4F1EA" />
            {/* Handle */}
            <line x1="44" y1="46" x2="57" y2="61" stroke="#2C3A35" strokeWidth="7" strokeLinecap="round" />
            {/* LARIFY wordmark */}
            <text x="62" y="38" fontFamily="var(--font-inter-tight), Arial, sans-serif" fontSize="30" fontWeight="700" letterSpacing="1" fill="#2C3A35">LARIFY</text>
            {/* HEALTH in sage */}
            <text x="66" y="62" fontFamily="var(--font-inter-tight), Arial, sans-serif" fontSize="17" fontWeight="700" letterSpacing="6" fill="#5C7A6E">HEALTH</text>
          </svg>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7 text-sm">
          {navItems.map((item) =>
            item.items ? (
              <li key={item.label} className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 border-b border-transparent group-hover:border-ink pb-0.5 transition-colors duration-200 motion-reduce:transition-none cursor-default"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-[9px] mt-px opacity-50">▾</span>
                </button>
                {/* Dropdown panel */}
                <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 motion-reduce:transition-none">
                  <ul className="bg-paper border border-line rounded-xl shadow-lg py-1.5 min-w-[220px]">
                    {item.items.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-surface transition-colors duration-100"
                        >
                          <span>{sub.label}</span>
                          {sub.note && (
                            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-sage ml-3">
                              {sub.note}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="border-b border-transparent hover:border-ink pb-0.5 transition-colors duration-200 motion-reduce:transition-none"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className={[
              "rounded-full bg-ink text-paper font-medium hidden sm:inline-flex items-center gap-2.5 transition-all duration-300 ease-quart motion-reduce:transition-none hover:bg-black",
              scrolled ? "px-5 py-2.5 text-sm" : "px-6 py-3.5 text-sm",
            ].join(" ")}
          >
            Free Video ROI Audit
            <span aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-10 h-10 rounded-full border border-ink flex items-center justify-center"
          >
            <span aria-hidden="true">{mobileOpen ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-line bg-paper px-6 py-6"
        >
          <ul className="flex flex-col gap-4 text-base">
            {navItems.map((item) =>
              item.items ? (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedGroup(
                        expandedGroup === item.label ? null : item.label
                      )
                    }
                    className="flex items-center gap-2 py-2 w-full text-left"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="text-[10px] text-muted">
                      {expandedGroup === item.label ? "▲" : "▼"}
                    </span>
                  </button>
                  {expandedGroup === item.label && (
                    <ul className="ml-4 flex flex-col gap-1 mt-1 pb-1">
                      {item.items.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setExpandedGroup(null);
                            }}
                            className="flex items-center gap-2 py-1.5 text-sm text-muted hover:text-ink transition-colors"
                          >
                            <span>{sub.label}</span>
                            {sub.note && (
                              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-sage">
                                {sub.note}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-3 text-sm font-medium"
              >
                Free Video ROI Audit <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
