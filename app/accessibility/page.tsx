import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Accessibility statement — ${site.name}`,
  description:
    "Qlarify Health's commitment to WCAG 2.2 AA on this website. What we've done, what we know is imperfect, and how to tell us what's missing.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Legal · Accessibility statement"
      title={
        <>
          Accessibility{" "}
          <em className="text-sage italic font-normal">is the brief.</em>
        </>
      }
      sub="We design and build this site to meet WCAG 2.2 AA. This page describes what we've done, what we know is imperfect, and how to tell us if something is unusable for you."
      lastUpdated="20 April 2026"
    >
      <h2>Our commitment</h2>
      <p>
        Healthcare reaches everyone, eventually. A site about hospital
        marketing that excludes people with disabilities would be incoherent.
        We hold ourselves to <strong>WCAG 2.2, Level AA</strong>, and we test
        for it on every release.
      </p>

      <h2>What we&apos;ve done</h2>
      <ul>
        <li>
          <strong>Keyboard navigation.</strong> Every interactive element
          (links, buttons, form inputs, modals, accordions) is reachable and
          operable from the keyboard alone. A &ldquo;skip to main content&rdquo;
          link is the first focusable element on every page.
        </li>
        <li>
          <strong>Screen-reader semantics.</strong> Headings are hierarchical.
          Buttons say what they do. Forms have programmatic labels.
          Disclosures expose <code>aria-expanded</code>; modals trap focus and
          set <code>aria-modal</code>. Inline SVGs that carry meaning have{" "}
          <code>role=&quot;img&quot;</code> with an{" "}
          <code>aria-label</code>.
        </li>
        <li>
          <strong>Reduced motion.</strong> Every transform and fade-in is
          disabled when the operating system reports{" "}
          <code>prefers-reduced-motion: reduce</code>. Content appears
          immediately.
        </li>
        <li>
          <strong>Colour contrast.</strong> Body text meets 7:1 against the
          paper background; interactive elements meet 4.5:1 minimum.
        </li>
        <li>
          <strong>Form errors.</strong> Errors are announced as text alongside
          the field, not just by colour. The submit action stays disabled while
          consent is unticked, and the disabled reason is communicated.
        </li>
        <li>
          <strong>Live regions.</strong> Counters use{" "}
          <code>aria-live=&quot;off&quot;</code> so they don&apos;t interrupt;
          form-status messages use <code>role=&quot;status&quot;</code>.
        </li>
      </ul>

      <h2>What we know is imperfect</h2>
      <p>
        We&apos;d rather list this than pretend everything is solved.
      </p>
      <ul>
        <li>
          Some illustrations on the homepage are illustrative rather than
          informational. They have <code>role=&quot;img&quot;</code> labels but
          are not yet long-described. We&apos;ll add long-form descriptions for
          the case-study infographic and the patient-journey diagram before the
          public launch.
        </li>
        <li>
          The video case studies (when they ship in Sprint 5) will include
          captions and a transcript. Audio descriptions for visually-presented
          information are on the roadmap.
        </li>
        <li>
          We have not yet completed a full assistive-technology test pass with
          NVDA + Firefox. JAWS + Edge is on the schedule before launch.
        </li>
      </ul>

      <h2>How to tell us something is unusable</h2>
      <p>
        Email{" "}
        <a href="mailto:accessibility@qlarify.health">
          accessibility@qlarify.health
        </a>{" "}
        with the page URL, the device and assistive technology you&apos;re
        using, and what you were trying to do. We acknowledge accessibility
        reports within 2 working days and prioritise fixes alongside
        security-class issues.
      </p>

      <h2>Standards and testing</h2>
      <p>
        This statement is informed by:
      </p>
      <ul>
        <li>
          <a
            href="https://www.w3.org/TR/WCAG22/"
            rel="noopener noreferrer"
            target="_blank"
          >
            WCAG 2.2
          </a>{" "}
          at Level AA.
        </li>
        <li>
          The <strong>Rights of Persons with Disabilities Act, 2016</strong>{" "}
          (India) and rules made thereunder.
        </li>
        <li>Automated testing with axe-core on every page on every PR.</li>
        <li>
          Manual keyboard and screen-reader testing on each release using VoiceOver + Safari and NVDA + Firefox.
        </li>
      </ul>

      <h2>Contact</h2>
      <p>
        Accessibility issues:{" "}
        <a href="mailto:accessibility@qlarify.health">
          accessibility@qlarify.health
        </a>
        . General contact:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
