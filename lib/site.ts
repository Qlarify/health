// Site-wide constants — used by metadata, footer, schema components.

export type NavDropdownItem = { href: string; label: string; note?: string };
export type NavItem =
  | { href: string; label: string; items?: never }
  | { label: string; href?: undefined; items: readonly NavDropdownItem[] };

export const navItems: readonly NavItem[] = [
  {
    label: "Services",
    items: [
      { href: "/video",  label: "Video as Infrastructure", note: "Flagship" },
      { href: "/seo",    label: "SEO" },
      { href: "/paid",   label: "Paid Media" },
      { href: "/social", label: "Social Media" },
      { href: "/email",  label: "Email & WhatsApp" },
    ],
  },
  { href: "/work",        label: "Work" },
  { href: "/insights",    label: "Blog" },
  { href: "/about",       label: "About" },
  { href: "/contact",     label: "Contact" },
] as const;

export const site = {
  name: "Qlarify Health",
  tagline: "Marketing for hospitals. Only hospitals.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://qlarify.health",
  email: "info@qlarify.health",
  phone: "+91 81474 10751",
  founded: 2026,
  parent: {
    name: "Digitinize Creative",
    founded: 2014,
    description:
      "A digital marketing studio in its second decade — performance, content, brand and platform engineering. The infrastructure on which Qlarify Health operates as a digital health platform from day one.",
  },
  offices: [
    {
      city: "Bengaluru",
      role: "HQ · Studio",
      address: [
        "Salarpuria Symbiosis",
        "Arekere Village, Bannerghatta Road",
        "Begur Hobli, Bengaluru, Karnataka 560076",
      ],
    },
  ],
  social: {
    // Filled in once accounts exist
    linkedin: undefined as string | undefined,
    youtube: undefined as string | undefined,
  },
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

export const footerSections = [
  {
    heading: "Services",
    links: [
      { href: "/video",  label: "Video as Infrastructure" },
      { href: "/seo",    label: "Hospital SEO" },
      { href: "/paid",   label: "Paid Media" },
      { href: "/social", label: "Social Media" },
      { href: "/email",  label: "Email & WhatsApp" },
    ],
  },
  {
    heading: "Work",
    links: [
      { href: "/work#cardiac-sciences-manipal",  label: "Cardiac sciences" },
      { href: "/work#cancer-care-manipal",       label: "Breast cancer care" },
      { href: "/work#neurosciences-manipal",     label: "Neurosciences" },
      { href: "/work#fertility-cloudnine",       label: "IVF & fertility" },
      { href: "/work#womens-care-cloudnine",     label: "Women's care" },
      { href: "/work#paediatrics-manipal",       label: "Paediatrics" },
      { href: "/work",                           label: "All case studies →" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about",    label: "About" },
      { href: "/work",     label: "Work" },
      { href: "/insights", label: "Blog" },
      { href: "/careers",  label: "Careers" },
      { href: "/contact",  label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy",       label: "Privacy" },
      { href: "/terms",         label: "Terms" },
{ href: "/accessibility", label: "Accessibility" },
    ],
  },
] as const;
