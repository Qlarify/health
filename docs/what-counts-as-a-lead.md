# What Counts as a Lead — Qlarify Health

> The single source of truth for the team. Pin this in Slack / wherever the
> marketing team works. Two pages. No exceptions to what's written here
> without updating this document.

## TL;DR

| Tier | Definition | Where it shows up |
|---|---|---|
| **Qualified lead** (revenue) | CRM-validated enquiry from a hospital or healthcare brand with budget signal & decision-maker contact. | Founder dashboard — the only number that drives go/no-go decisions. |
| **Lead** (conversion) | Contact form submitted successfully + WhatsApp click + Call click. | Marketing dashboard — used for channel optimisation. |
| **Intent signal** (micro) | Form view, scroll-90 on a service page, video complete, brochure download. | Audience-building only. Never reported as "leads". |

## Detailed definitions

### 1. Qualified lead (CRM-confirmed)

A submitted enquiry counts as **qualified** when **all** are true:

- Hospital or healthcare brand named (not "freelancer", "general business").
- Decision-maker named (CMO, founder, marketing head, COO, GM marketing).
- Working contact (phone or email reachable).
- Budget signal present (either dropdown selection ≥ ₹50K/mo, or stated in
  context field, or revealed in discovery call).

GA4 event: `lead_qualified` — pushed via Measurement Protocol from the CRM,
**not** from the website. (See setup checklist item C-08.)

### 2. Lead (website conversion)

Any of the following counts as a website lead:

| GA4 event | Trigger | Counts because |
|---|---|---|
| `lead_form_submit` | Web3Forms returns success | Structured contact ask |
| `whatsapp_click` | Click on `wa.me` link | Strong intent — WhatsApp is patient-initiated convo |
| `call_click` | Click on `tel:` link | Strong intent — direct dial |
| `appointment_book_complete` | (future) booking engine confirmation | Hard conversion |

These three are marked as **Conversions** in GA4 (admin → events).

### 3. Intent signals (NOT leads)

These are **never** reported as leads. They feed audience-building and
content-quality decisions only:

- `form_view` — scrolled the form into view but didn't submit.
- `form_attempt` with `valid:false` — tried to submit, failed validation.
- `scroll_depth` ≥ 75 on a service or blog page.
- `outbound_click` to LinkedIn / case-study external links.
- `email_click` (`mailto:`) — too easy to fire by accident.

## What does NOT count, ever

- **Page views.** Even a 1,000-view spike from a viral post is zero leads.
- **Bounce rate / time on page.** Engagement signal at best.
- **Email opens.** Pixel-blocked everywhere now; meaningless.
- **Social impressions / reach.** Reported separately, never folded into
  "lead" numbers.
- **Form attempt** (without success). The form was opened, not submitted.
- **WhatsApp click without subsequent reply on the WhatsApp side.** This
  is a known limitation — the website event fires on click; whether the
  user actually messaged is captured in the WhatsApp Business inbox, not
  GA4. Reconcile weekly between GA4 `whatsapp_click` count and WhatsApp
  inbox new-conversations count.

## Reporting cadence

| Cadence | Audience | Number reported |
|---|---|---|
| Weekly (Monday) | Marketing team | Leads (tier 2), CPL by channel, top-converting content |
| Weekly (Monday) | Founder | Qualified leads (tier 1), cost per qualified lead, biggest WoW change |
| Monthly | Founder + Ops | Lead → appointment %, lead → revenue (estimated), channel mix shift |
| Quarterly | Strategy | Audit this document. Update tiers if the funnel has changed. |

## Lead-source reconciliation

When the team disagrees on "where did this lead come from", the order of
truth is:

1. CRM source field (manually set on call).
2. GA4 conversion path (Advertising → Conversion paths).
3. UTM on the landing page that captured the form.
4. `Session source / medium` on the converting session.

If 1 and 2 disagree, 1 wins for *attribution*, but 2 wins for *channel
optimisation* — they're answering different questions.

## Common arguments this document settles

> "We had 12,000 sessions but only 4 leads — should we be worried?"
**Answer:** Look at sessions on `journey_stage = intent` pages, not total
sessions. If `/contact` sessions are healthy and converting, awareness
traffic is doing its job (audience-building).

> "Should I count call clicks as leads?"
**Answer:** Yes — tier 2 (secondary). They're directional, not gospel.
Always pair with the call-centre log to dedupe.

> "I added a chatbot — does a chat session count as a lead?"
**Answer:** Only if the chatbot captures structured contact info AND it
flows to the CRM. Otherwise it's a tier 3 intent signal.
