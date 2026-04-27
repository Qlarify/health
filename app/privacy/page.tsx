import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy policy — ${site.name}`,
  description:
    "How Qlarify Health collects, uses, and protects personal data. The short version: only what's needed, for as long as it's needed, never sold.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy policy"
      title={
        <>
          Privacy{" "}
          <em className="text-sage italic font-normal">in plain English.</em>
        </>
      }
      sub="The short version: we only collect what we need to reply to you, we don't sell or share data with marketing partners, and you can ask for it back or have it deleted at any time."
      lastUpdated="20 April 2026"
    >
      <h2>The short version</h2>
      <ul>
        <li>We collect only what you give us through forms on this site.</li>
        <li>We use it only to reply to you and to operate our service.</li>
        <li>We do not sell, rent, or share your data for marketing.</li>
        <li>You can access, correct, or delete your data at any time.</li>
        <li>
          We comply with the Digital Personal Data Protection Act, 2023. The
          full notice is on our{" "}
          <a href="/dpdp">DPDP page</a>.
        </li>
      </ul>

      <h2>1. Information we collect</h2>
      <p>
        We collect personal data only when you submit it through a form on this
        site — the audit request, contact message, or newsletter signup. The
        full list of fields, with the reason for each, is documented on our{" "}
        <a href="/dpdp">DPDP notice</a>.
      </p>
      <p>
        We also collect a minimal set of operational logs (server-side request
        logs, error reports) for security and debugging. These are retained for
        7 days and contain no marketing identifiers.
      </p>

      <h2>2. Cookies and analytics</h2>
      <p>
        This site uses a single first-party cookie (<code>q_consent</code>) to
        remember whether you&apos;ve consented to analytics. No analytics or
        tracking scripts load until you opt in via the cookie banner.
      </p>
      <p>
        If you opt in, we use a privacy-friendly analytics provider that does
        not set tracking cookies, does not collect IP addresses in identifiable
        form, and does not share data with third parties. You can withdraw
        consent at any time from the footer link &ldquo;Cookie settings&rdquo;.
      </p>

      <h2>3. How we use your data</h2>
      <p>To:</p>
      <ul>
        <li>Reply to your enquiry, send the audit, deliver the proposal.</li>
        <li>
          Send the monthly newsletter, but only if you explicitly subscribed.
        </li>
        <li>Operate this website securely, including abuse prevention.</li>
        <li>Comply with legal obligations (tax, regulatory, court orders).</li>
      </ul>

      <h2>4. How we store and protect it</h2>
      <p>
        Form submissions are stored in encrypted-at-rest form by our processors
        (Resend, Slack, Vercel). Access within Qlarify is on a need-to-know
        basis and audited. Backups are encrypted and rotated on a 90-day cycle.
      </p>

      <h2>5. Your rights</h2>
      <p>
        You can access, correct, port, or delete your personal data — and
        withdraw consent — at any time. Write to{" "}
        <a href="mailto:dpo@qlarify.health">dpo@qlarify.health</a>. We respond
        within 7 working days.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions? Write to{" "}
        <a href="mailto:dpo@qlarify.health">dpo@qlarify.health</a>, or by post
        to the registered office at: 4th Floor, Indiranagar Studio, 100 Feet
        Road, HAL II Stage, Bengaluru 560038, India.
      </p>
      <p>
        General contact: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
