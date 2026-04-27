import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description:
    "Talk to us about your hospital. A real human at Qlarify Health replies within one working day. Bengaluru office, India-wide engagements.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    description:
      "A real human replies within one working day. Bengaluru, India.",
    url: `${site.url}/contact`,
    type: "website",
  },
};

const office = site.offices[0];
const mapQuery = encodeURIComponent(
  "Salarpuria Symbiosis, Arekere Village, Bannerghatta Road, Begur Hobli, Bengaluru, Karnataka 560076"
);
const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const mapLinkSrc = `https://maps.google.com/?q=${mapQuery}`;

function ContactSchema() {
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.url}/contact`,
  };
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    parentOrganization: { "@type": "Organization", name: site.name, url: site.url },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Salarpuria Symbiosis, Arekere Village, Bannerghatta Road",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560076",
      addressCountry: "IN",
    },
    telephone: site.phone,
    email: site.email,
    openingHours: "Mo-Fr 09:30-18:30",
    url: `${site.url}/contact`,
  };
  return (
    <>
      <JsonLd data={contactPage} />
      <JsonLd data={localBusiness} />
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactSchema />

      <PageHero
        eyebrow="Contact · we read everything"
        title={
          <>
            Talk to us about
            <br />
            <em className="text-sage italic font-normal">your hospital.</em>
          </>
        }
        sub="The fastest way to start is a short note below. A real human at Qlarify Health replies within one working day."
      />

      <section
        aria-labelledby="message-heading"
        className="px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-24 md:pb-32 border-t border-line bg-surface"
      >
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-start">
          <Reveal>
            <div>
              <Eyebrow className="mb-4">Send a message — 01</Eyebrow>
              <h2
                id="message-heading"
                className="font-serif text-4xl md:text-6xl leading-[1] tracking-[-0.02em] mb-4"
              >
                Just say
                <br />
                <em className="text-sage italic font-normal">hello.</em>
              </h2>
              <p className="text-base md:text-[17px] leading-[1.55] text-muted mb-10 max-w-[480px]">
                A note, a question, a project we should know about. We reply
                within one working day, often within a few hours. Every
                message lands directly in{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
                >
                  {site.email}
                </a>
                .
              </p>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <Eyebrow className="mb-6">Office</Eyebrow>
              <div className="py-7 border-t border-b border-line">
                <h3 className="font-serif text-3xl md:text-[36px] leading-[1.05] mb-3">
                  {office.city}
                </h3>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-sage mb-3">
                  ● {office.role}
                </div>
                <address className="not-italic text-sm leading-[1.6] text-muted">
                  {office.address.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </address>
                <a
                  href={mapLinkSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
                >
                  Open in Google Maps →
                </a>
              </div>

              <div className="pt-7">
                <Eyebrow className="mb-3.5">Direct lines</Eyebrow>
                <ul className="space-y-2 mb-6">
                  <li>
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="text-[15px] text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
                    >
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[15px] text-sage underline decoration-sage/50 underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
                    >
                      {site.email}
                    </a>
                  </li>
                </ul>
                <Eyebrow className="mb-3.5">Hours</Eyebrow>
                <p className="text-sm leading-[1.6] text-muted">
                  Mon–Fri · 09:30–18:30 IST
                  <br />
                  Reply window 1 working day
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section
        aria-labelledby="map-heading"
        className="px-6 md:px-12 lg:px-20 pt-20 md:pt-24 pb-24 md:pb-32 border-t border-line"
      >
        <Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 mb-10 md:mb-12 items-end">
            <div>
              <Eyebrow className="mb-4">Find us — 02</Eyebrow>
              <h2
                id="map-heading"
                className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]"
              >
                Bannerghatta Road,{" "}
                <em className="text-sage italic font-normal">Bengaluru.</em>
              </h2>
            </div>
            <p className="text-base md:text-[17px] leading-[1.6] text-muted max-w-[520px]">
              South Bengaluru, fifteen minutes from Jayanagar and Electronic
              City. Visits by appointment — drop us a note before you come over.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-[24px] overflow-hidden border border-line bg-paper">
            <iframe
              title="Qlarify Health office — Bannerghatta Road, Bengaluru"
              src={mapEmbedSrc}
              width="100%"
              height="480"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full h-[360px] md:h-[480px] border-0"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
