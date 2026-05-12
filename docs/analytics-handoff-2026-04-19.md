# Analytics Handoff — 2026-04-19

> Status snapshot of the GA4 / GTM build, what's done, and exactly what
> remains. Pair with `analytics-ga4-setup-checklist.md` (the spec) and
> `analytics-events.md` (the event contract).

## What's done

| Item | Status | Evidence |
|---|---|---|
| **C-01 / C-02** Site loads GTM only (no double-counted page_view) | ✓ DONE | Commit `e274471` removed direct `gtag.js` block from `index.html` |
| **C-08 (front-end half)** GA4 `client_id` captured + injected into form | ✓ DONE | `main.js` QH Analytics Layer; `window.qhClientId`; hidden `ga_client_id` field on `#cf-form` for Web3Forms → CRM |
| All site-side events (`page_view_qh`, `lead_form_submit`, `call_click`, `whatsapp_click`, `email_click`, `outbound_click`, `form_view`, `form_attempt`, `form_error`, `scroll_depth`) | ✓ DONE | `main.js` QH Analytics Layer block |
| **GTM workspace** `Default Workspace` opened (workspace 2) | ✓ in progress | `https://tagmanager.google.com/#/container/accounts/6349272080/containers/249085307/workspaces/2` |
| **9 of 14 dataLayer variables** created in GTM | ✓ DONE | `page_id`, `page_type`, `journey_stage`, `route`, `form_id`, `form_location`, `lead_type`, `interest`, `city` |

## What's left in GTM (Phase 2 — finish before publishing)

The Chrome MCP UI driver was hitting silent save failures on subsequent
variables (the editor's contenteditable title doesn't always commit, and
the type chooser modal interferes with input focus). Doing these by hand
in the GTM UI takes ~10 minutes and is more reliable than scripting it.

### Step 1 — Create the 5 remaining dataLayer variables

Variables → User-Defined → **New** → Variable Configuration →
**Data Layer Variable**. For each, set both the **title** (top of
sheet) AND the **Data Layer Variable Name** field to the same value:

- [ ] `link_location`
- [ ] `cta_location`
- [ ] `destination_domain`
- [ ] `depth_pct`
- [ ] `phone_masked`

(Leave `Data Layer Version = 2`, `Set Default Value = off`.)

### Step 2 — Create one Custom Event trigger

Triggers → **New** → trigger type **Custom Event**.
- Title: `QH — analytics events`
- Event name: `^(page_view_qh|lead_form_submit|call_click|whatsapp_click|email_click|outbound_click|form_view|form_attempt|form_error|scroll_depth)$`
- ✅ **Use regex matching** (checkbox)
- Fires on **All Custom Events**

### Step 3 — Create the GA4 Configuration tag (Google Tag)

Tags → **New** → tag type **Google tag** (the new Google Tag, not the
deprecated GA4 Configuration tag).
- Title: `GA4 — Config`
- Tag ID: `G-PMSJHJ679P`
- **Configuration parameter**:
  - Name: `send_page_view`
  - Value: `false`
- Trigger: **Initialization — All Pages** (or `All Pages` if Initialization isn't available)

### Step 4 — Create the GA4 Event tag (the catch-all)

Tags → **New** → tag type **Google Analytics: GA4 Event**.
- Title: `GA4 — QH events`
- Configuration tag → drop-down → **None — Manually Set ID** → enter
  `G-PMSJHJ679P` (the new Google Tag pattern doesn't expose itself as a
  config tag here; this is the workaround)
- **Event Name**: `{{Event}}` (built-in Event variable; fires whatever
  custom event name the dataLayer pushed)
- **Event Parameters** — add 14 rows. Parameter name = variable name on
  the left; Value = the matching `{{...}}` data-layer variable on the
  right:

| Parameter Name | Value |
|---|---|
| `page_id` | `{{page_id}}` |
| `page_type` | `{{page_type}}` |
| `journey_stage` | `{{journey_stage}}` |
| `route` | `{{route}}` |
| `form_id` | `{{form_id}}` |
| `form_location` | `{{form_location}}` |
| `lead_type` | `{{lead_type}}` |
| `interest` | `{{interest}}` |
| `city` | `{{city}}` |
| `link_location` | `{{link_location}}` |
| `cta_location` | `{{cta_location}}` |
| `destination_domain` | `{{destination_domain}}` |
| `depth_pct` | `{{depth_pct}}` |
| `phone_masked` | `{{phone_masked}}` |

- Trigger: `QH — analytics events` (the trigger from Step 2)

### Step 5 — Submit + Publish

Top-right → **Submit** → Version name `Qlarify analytics layer v1` →
Version notes `GA4 Config (send_page_view=false) + catch-all GA4 Event tag for QH events. Site-side wiring at commit e274471.`
→ **Publish**.

## Phase 3 — GA4 property configuration (do AFTER publish)

GA4 property → `G-PMSJHJ679P` → Admin.

### C-03 Custom Dimensions (do FIRST — registrations are forward-only)

Admin → Custom definitions → Custom dimensions → **Create custom dimension**.
For each: Scope = **Event**, Dimension name = the column on the left,
Event parameter = the column on the right.

| Dimension name | Event parameter |
|---|---|
| Page ID | `page_id` |
| Page type | `page_type` |
| Journey stage | `journey_stage` |
| Route | `route` |
| Form ID | `form_id` |
| Form location | `form_location` |
| Lead type | `lead_type` |
| Interest | `interest` |
| City | `city` |
| Link location | `link_location` |
| CTA location | `cta_location` |
| Destination domain | `destination_domain` |

Plus one Custom Metric (Custom definitions → **Custom metrics** tab):
| Metric name | Event parameter | Unit |
|---|---|---|
| Depth pct | `depth_pct` | Standard |

### C-05 Conversions

Admin → Events. The events won't appear until at least one fires. After
visiting the site once with GTM Preview on, come back and toggle
"Mark as conversion" for:
- [ ] `lead_form_submit`
- [ ] `call_click`
- [ ] `whatsapp_click`

(Skip `appointment_book_complete` and `lead_qualified` — those events
don't exist yet.)

### C-06 Hygiene

- [ ] Admin → Data Settings → **Data Retention** → 14 months → Save
- [ ] Admin → **Reporting Identity** → confirm **Blended**
- [ ] Admin → **Attribution Settings** → **Data-driven** model
- [ ] Admin → Data Settings → **Data Filters** → confirm `Internal Traffic`
      filter exists, set state = **Active**
- [ ] (Defer) Admin → Data Streams → Web → Configure tag settings →
      **Define internal traffic** → add your office IP

## Phase 4 — Platform links

(Each is a permission-granting action — read the consent screen before
clicking final Link/Save.)

- [ ] Admin → Product Links → **Google Ads Links** → Link → enable
      Personalised advertising + Auto-tagging → Submit. Then in Ads →
      Conversions → Import GA4 conversions.
- [ ] Admin → Product Links → **Search Console Links** → Link →
      `qlarify.health` property → Web stream → Submit. Add SC reports
      to the GA4 Reports library.
- [ ] Admin → **BigQuery Links** → Link → choose GCP project → Daily +
      Streaming → Submit.

## Phase 5 — Reports

### GA4 Explorations (Explore → blank template)

1. **Patient acquisition funnel** — Funnel exploration. Steps:
   `session_start` → `page_view_qh where journey_stage=consideration` →
   `page_view_qh where journey_stage=intent` (indirectly) →
   `lead_form_submit` OR `call_click` OR `whatsapp_click` →
   `appointment_book_complete` (placeholder). Breakdown: `interest`.
   Comparisons: Paid Search / Organic / Direct / Social.
2. **Content → conversion** — Free-form. Rows: Landing page + Page
   title. Cols: Sessions, `lead_form_submit`, `call_click`,
   `whatsapp_click`, conversion rate. Last 7 days.
3. **Form journey** — Path Exploration. Start: `form_view`. Watch for
   exits before `form_attempt` and before `lead_form_submit`.
4. **Specialty performance** — Free-form. Dimensions: `interest`,
   `journey_stage`. Metric: event count. Last 28 days.
5. **Paid efficiency** — Free-form. Dimensions: `session_campaign`,
   `session_source / medium`. Metric: `lead_form_submit` count + cost
   (after Ads link populates).

### Looker Studio founder dashboard

`lookerstudio.google.com` → Create → Report → connect GA4 (`G-PMSJHJ679P`).

| Block | Type | Definition |
|---|---|---|
| KPI 1 | Scorecard | Conversions where event = `lead_form_submit`, last 7d |
| KPI 2 | Scorecard | Total ad spend ÷ conversions, last 7d (after Ads link) |
| KPI 3 | Scorecard | Lead → appointment % (placeholder until booking ships) |
| Bar | Bar chart | Conversions by `Interest` |
| Bar | Bar chart | Conversions by `Default channel grouping` |
| Trend | Time series | 13-week qualified-lead trend |

Schedule → Email delivery → Weekly, Monday 08:00 IST.
**Confirm recipient email with founder before scheduling.**

## Phase 6 — Validation

- [ ] `https://qlarify.health/?gtm_debug=x` open in one tab; GTM Preview
      enabled in another → confirm `GA4 — Config` and `GA4 — QH events`
      both fire on initial load and on every in-app navigation.
- [ ] GA4 → Admin → DebugView. Manually trigger:
  - Navigate `/seo` → `/paid` → `/contact` → 3 `page_view_qh` events
    with `journey_stage` = `consideration`, `consideration`, `intent`.
  - Click a `tel:` link → `call_click` with masked phone.
  - Fill + submit contact form with test data → `form_attempt`
    (`valid:true`) then `lead_form_submit`.
  - Slow-scroll a blog page → 4 × `scroll_depth` events.
- [ ] GA4 → Realtime → custom-dimensions card → confirm `Page type`,
      `Journey stage`, `Interest` show real values (no `(not set)`).
- [ ] DevTools Network: exactly 1 × `googletagmanager.com/gtm.js`,
      0 × `gtag/js?id=G-PMSJHJ679P`. Multiple `g/collect` requests = good.
- [ ] After 24h: GA4 → Reports → Engagement → Events → conversion
      column shows ✓ for the 3 conversion events.

## Out of scope for this handoff

- **C-08 server-side `lead_qualified`** — needs CRM webhook to call GA4
  Measurement Protocol with the captured `client_id`. Spec is in
  `analytics-ga4-setup-checklist.md` § C-08.
- Internal-traffic IP definition — needs office IP.
- Meta Pixel, YouTube ↔ Ads link, Merchant Center — not in this rollout.
