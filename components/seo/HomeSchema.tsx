import { site } from "@/lib/site";
import { homeFaqsForSchema } from "@/content/faqs";
import { JsonLd } from "./JsonLd";

// Six service slugs that match content/services and the URL structure.
const services = [
  {
    slug: "youtube-for-hospitals",
    name: "YouTube for hospitals",
    description:
      "Channel strategy, doctor-led video production, packaging and growth for hospital YouTube channels.",
  },
  {
    slug: "social-media-marketing",
    name: "Social media marketing for hospitals",
    description:
      "Instagram, Facebook, LinkedIn marketing for hospitals — credibility surface area before patients click an ad.",
  },
  {
    slug: "seo-for-hospitals",
    name: "SEO for hospitals",
    description:
      "Search engine optimisation for hospital websites — symptom, doctor, locality, and procedure-cost queries.",
  },
  {
    slug: "performance-marketing",
    name: "Performance marketing for hospitals",
    description:
      "Healthcare performance marketing tuned for lead quality, call-tracking, and downstream OPD outcomes.",
  },
  {
    slug: "content-marketing",
    name: "Content marketing for hospitals",
    description:
      "Medically-reviewed content, written by clinicians and structured for search.",
  },
  {
    slug: "email-and-whatsapp",
    name: "Email & WhatsApp marketing for hospitals",
    description:
      "Lifecycle nurture on the two channels Indian patients actually read — email and WhatsApp.",
  },
] as const;

export function HomeSchema() {
  const sameAs = [site.social.linkedin, site.social.youtube].filter(
    (u): u is string => Boolean(u),
  );

  const parentOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#parent-organization`,
    name: site.parent.name,
    foundingDate: String(site.parent.founded),
    description: site.parent.description,
    foundingLocation: { "@type": "Place", name: "Bengaluru, India" },
    subOrganization: { "@id": `${site.url}/#organization` },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: "Qlarify",
    url: site.url,
    logo: `${site.url}/og-default.png`,
    email: site.email,
    telephone: site.phone,
    foundingDate: String(site.founded),
    foundingLocation: { "@type": "Place", name: "Bengaluru, India" },
    parentOrganization: { "@id": `${site.url}/#parent-organization` },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "City", name: "Bengaluru" },
      { "@type": "City", name: "Mumbai" },
    ],
    knowsAbout: [
      "Hospital marketing",
      "Healthcare marketing in India",
      "Patient acquisition",
      "Digital health platform",
      "Healthcare analytics",
      "AI in healthcare",
      "Patient insights",
      "Hospital SEO",
      "YouTube for hospitals",
      "WhatsApp marketing for hospitals",
      "DPDP compliance",
    ],
    slogan: site.tagline,
    description:
      "Qlarify Health is a digital health platform built for hospitals in India — combining patient-journey strategy, health analytics, AI in healthcare and patient insights into one accountable system for OPD growth.",
    ...(sameAs.length > 0 && { sameAs }),
  };

  const localBusinesses = site.offices.map((office) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#office-${office.city.toLowerCase()}`,
    name: `${site.name} — ${office.city}`,
    parentOrganization: { "@id": `${site.url}/#organization` },
    url: site.url,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.address.slice(0, -1).join(", "),
      addressLocality: office.city,
      addressCountry: "IN",
      postalCode: office.address.at(-1)?.match(/\d{6}/)?.[0],
    },
  }));

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/insights?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const serviceList = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${s.slug}#service`,
    serviceType: s.name,
    name: s.name,
    description: s.description,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    url: `${site.url}/services/${s.slug}`,
    audience: {
      "@type": "Audience",
      audienceType: "Hospitals and hospital chains in India",
    },
  }));

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqsForSchema.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <JsonLd data={parentOrganization} />
      <JsonLd data={organization} />
      <JsonLd data={website} />
      {localBusinesses.map((b) => (
        <JsonLd key={b["@id"]} data={b} />
      ))}
      {serviceList.map((s) => (
        <JsonLd key={s["@id"]} data={s} />
      ))}
      <JsonLd data={faqPage} />
    </>
  );
}
