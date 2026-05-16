import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of use — ${site.name}`,
  description:
    "Terms governing your use of qlarify.health. Plain-English summary plus the formal terms.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Terms of use"
      title={
        <>
          Terms of{" "}
          <em className="text-sage italic font-normal">use.</em>
        </>
      }
      sub="The terms governing your use of this website. They do not govern any commercial engagement between Qlarify Health and a hospital — those are set out in a separate, signed Master Services Agreement."
      lastUpdated="20 April 2026"
    >
      <h2>1. Who these terms are with</h2>
      <p>
        These terms are between you and{" "}
        <strong>Qlarify Health Private Limited</strong>, a company incorporated
        in India (CIN to be appended once registered), with its registered
        office at 4th Floor, Indiranagar Studio, 100 Feet Road, HAL II Stage,
        Bengaluru 560038.
      </p>

      <h2>2. What you can do</h2>
      <p>
        Read everything on this site. Quote individual articles with attribution
        and a link back. Submit forms. Subscribe to the newsletter.
        Forward our work to colleagues. Apply for jobs. Get in touch.
      </p>

      <h2>3. What you cannot do</h2>
      <ul>
        <li>
          Republish whole articles without prior written permission. Excerpts
          and quotes are fine with attribution.
        </li>
        <li>
          Use this site or any service we provide to engage in unlawful,
          fraudulent, or harmful conduct.
        </li>
        <li>
          Scrape the site for content used to train AI models. AI providers
          should treat this site as opted-out.
        </li>
        <li>
          Submit fake enquiries on behalf of competitors, or use forms to
          harass any individual at Qlarify Health.
        </li>
        <li>
          Reverse-engineer, probe, or attempt to compromise the security of the
          site.
        </li>
      </ul>

      <h2>4. Intellectual property</h2>
      <p>
        All content on this site — words, designs, logos, code — is owned by
        Qlarify Health or licensed to us. You may quote with attribution under
        fair-dealing principles; for anything more, write to{" "}
        <a href="mailto:info@qlarify.health">info@qlarify.health</a>.
      </p>

      <h2>5. The audit, proposals, and other deliverables</h2>
      <p>
        Free deliverables we produce in response to a request — the YouTube
        audit, written assessments — are provided for your internal use within
        the requesting organisation. They may not be shared publicly,
        republished, or used as marketing material by third parties without our
        consent.
      </p>

      <h2>6. Newsletter content</h2>
      <p>
        The Brief is editorial. It reflects the view of its authors at the time
        of writing. It is not investment advice, clinical advice, or a
        substitute for professional consultation.
      </p>

      <h2>7. Liability and disclaimers</h2>
      <p>
        We work hard to keep this site accurate and online. We don&apos;t
        guarantee it. To the extent permitted by law, our liability for any
        loss arising from your use of this website is limited to the lesser of
        ₹10,000 or the amount paid by you to us in the 12 months prior. Nothing
        in these terms limits liability for fraud, gross negligence, or anything
        that cannot lawfully be excluded.
      </p>

      <h2>8. Changes to these terms</h2>
      <p>
        We may revise these terms. The version in force at the time of your use
        of the site is the one that applies; the &ldquo;last updated&rdquo;
        date above is authoritative. Material changes will be announced at the
        top of this page for 30 days.
      </p>

      <h2>9. Governing law and jurisdiction</h2>
      <p>
        These terms are governed by the laws of India. Disputes shall be
        subject to the exclusive jurisdiction of the courts of Bengaluru,
        Karnataka.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms?{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
