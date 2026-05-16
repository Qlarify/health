import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `DPDP notice — ${site.name}`,
  description:
    "How Qlarify Health processes personal data under India's Digital Personal Data Protection Act, 2023. Notice to data principals.",
  alternates: { canonical: "/dpdp" },
  robots: { index: true, follow: true },
};

export default function DpdpPage() {
  return (
    <LegalPage
      eyebrow="Legal · DPDP notice"
      title={
        <>
          DPDP notice to{" "}
          <em className="text-sage italic font-normal">data principals.</em>
        </>
      }
      sub="This page sets out, in plain English, how Qlarify Health processes your personal data under the Digital Personal Data Protection Act, 2023. If anything below is unclear, write to our Data Protection Officer at the address below — we'll explain."
      lastUpdated="20 April 2026"
    >
      <h2>1. Who is processing your data</h2>
      <p>
        <strong>Data fiduciary:</strong> Qlarify Health Private Limited
        (&ldquo;Qlarify&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a company
        incorporated in India and operating from Bengaluru and Mumbai.
      </p>
      <p>
        <strong>Registered office:</strong> 4th Floor, Indiranagar Studio, 100
        Feet Road, HAL II Stage, Bengaluru 560038.
      </p>
      <p>
        <strong>Contact:</strong>{" "}
        <a href="mailto:dpo@qlarify.health">dpo@qlarify.health</a> —
        our Data Protection Officer.
      </p>

      <h2>2. What we collect, and why</h2>
      <p>
        We collect only what we need to reply to you. The fields below are the
        full list — if a form on this site asks for more, please tell us, it&apos;s
        a bug.
      </p>

      <dl>
        <dt>Name</dt>
        <dd>To address you correctly when we reply.</dd>
        <dt>Email</dt>
        <dd>Required to send the audit, the proposal, or the reply.</dd>
        <dt>Phone</dt>
        <dd>Optional. Only used if you tick the &ldquo;call me&rdquo; option.</dd>
        <dt>Hospital / org</dt>
        <dd>So we can prepare relevant context before replying.</dd>
        <dt>Role</dt>
        <dd>To tailor the conversation to your responsibilities.</dd>
        <dt>Channel link</dt>
        <dd>For YouTube audit requests — the channel we&apos;ll review.</dd>
        <dt>Notes</dt>
        <dd>Free text from you. Used as you intend.</dd>
      </dl>

      <p>
        We do not collect your IP address for any purpose other than abuse
        prevention, and we do not sell or share your data with marketing
        partners. Ever.
      </p>

      <h2>3. The lawful basis for processing</h2>
      <p>
        We rely on two lawful bases under the DPDP Act:
      </p>
      <ul>
        <li>
          <strong>Consent</strong> — for everything you submit through a form on
          this site. Consent is captured by an explicit, unticked checkbox you
          must tick to submit. We log the moment of consent (timestamp + form
          version).
        </li>
        <li>
          <strong>Legitimate uses</strong> — for replying to a message you
          initiated, in line with section 7(a) of the Act.
        </li>
      </ul>

      <h2>4. How long we keep it</h2>
      <p>
        Audit and contact-form submissions are retained for{" "}
        <strong>24 months</strong> from receipt, unless you ask us to delete
        them sooner. Deletion requests are honoured within 30 days; we&apos;ll
        confirm in writing once done.
      </p>
      <p>
        Newsletter subscriptions are retained until you unsubscribe (one click,
        no friction). Backups are purged on a 90-day cycle.
      </p>

      <h2>5. Who else sees your data</h2>
      <p>We share data with a short list of carefully chosen processors:</p>
      <ul>
        <li>
          <strong>Resend</strong> — sends the confirmation and reply emails. EU
          and US data centres. Standard contractual clauses in place.
        </li>
        <li>
          <strong>Slack</strong> — internal team notification of new enquiries.
          US data centres. Workspace is access-controlled and audited.
        </li>
        <li>
          <strong>Vercel</strong> — hosts this website. Logs are retained for 7
          days for abuse prevention only.
        </li>
      </ul>
      <p>
        We do not transfer your data to any country outside India for marketing
        or analytics purposes.
      </p>

      <h2>6. Your rights</h2>
      <p>Under the DPDP Act you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Correct or update inaccurate data.</li>
        <li>Erase your data (subject to lawful retention obligations).</li>
        <li>Withdraw consent at any time, without giving a reason.</li>
        <li>
          Nominate another individual to exercise these rights on your behalf
          in the event of incapacity.
        </li>
        <li>Lodge a grievance with us, and escalate to the Data Protection Board if unresolved.</li>
      </ul>

      <p>
        To exercise any of these, write to{" "}
        <a href="mailto:dpo@qlarify.health">dpo@qlarify.health</a>. We respond
        within 7 working days, and complete the requested action within 30
        days.
      </p>

      <h2>7. Grievance officer</h2>
      <p>
        Our Grievance Officer is Anjali Menon, CEO. You can reach her at{" "}
        <a href="mailto:grievance@qlarify.health">grievance@qlarify.health</a>{" "}
        or by post at the registered office above. We acknowledge grievances
        within 48 hours and resolve them within 30 days.
      </p>
      <p>
        If your grievance is not resolved to your satisfaction, you may approach
        the Data Protection Board of India once it is constituted under the
        Act.
      </p>

      <h2>8. Children&apos;s data</h2>
      <p>
        We do not knowingly process personal data of any individual under 18.
        Our forms ask you to confirm you are 18 or older. If you believe a child
        has submitted data via our site, please write to us and we will delete
        it immediately.
      </p>

      <h2>9. Changes to this notice</h2>
      <p>
        We&apos;ll update this notice when our practices change. Material
        changes are announced at the top of the page for 30 days, and (where
        relevant) emailed to subscribers. The &ldquo;last updated&rdquo; date
        above is authoritative.
      </p>
    </LegalPage>
  );
}
