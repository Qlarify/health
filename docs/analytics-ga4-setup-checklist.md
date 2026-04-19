# GA4 / GTM Setup Checklist (Manual — UI Work)

> The website-side wiring is **done** (`main.js` "QH Analytics Layer").
> This doc is the manual UI work that has to happen inside GA4, GTM, and
> Google Ads. Do these in order. Don't skip.

Containers in play:
- GTM: `GTM-535KTHSM`
- GA4: `G-PMSJHJ679P`

---

## C-01. Pick GTM **or** gtag — not both

The site currently loads both. GA4 will double-count `page_view` on every
SPA navigation if both fire.

- [ ] Decide: keep GTM (recommended — flexible) and remove the direct
      `<script src="googletagmanager.com/gtag/js?id=G-PMSJHJ679P">` block.
- [ ] In GTM, add a GA4 Configuration tag with measurement ID `G-PMSJHJ679P`
      that fires on **All Pages**.

## C-02. Block GA4's automatic page_view (SPA double-count fix)

Because we fire our own `page_view_qh` on every SPA route change, the
default GA4 enhanced-measurement page_view will fire too — once on real
load, then again on every history.pushState. Pick one:

- **Option A (recommended):** in GTM's GA4 Config tag, set field
  `send_page_view = false`. Use only `page_view_qh` going forward and
  build all reports off it.
- **Option B:** keep default page_view, but disable enhanced-measurement
  *History changes* in GA4 → Admin → Data Streams → Web → Enhanced
  measurement → cog icon.

## C-03. Register custom dimensions

GA4 → Admin → Custom definitions → Custom dimensions → Create. **Do this
before reports — params won't appear retroactively.**

| Dimension name | Scope | Event parameter |
|---|---|---|
| Page ID | Event | `page_id` |
| Page type | Event | `page_type` |
| Journey stage | Event | `journey_stage` |
| Route | Event | `route` |
| Form ID | Event | `form_id` |
| Form location | Event | `form_location` |
| Lead type | Event | `lead_type` |
| Interest | Event | `interest` |
| City | Event | `city` |
| Link location | Event | `link_location` |
| CTA location | Event | `cta_location` |
| Destination domain | Event | `destination_domain` |
| Depth pct | Event (numeric metric, optional) | `depth_pct` |

## C-04. Build GTM tags for each event

For **every** event in `analytics-events.md`, create:
1. A **Custom Event trigger** with the event name (e.g. `lead_form_submit`).
2. A **GA4 Event tag** that uses the same event name and forwards all
   event parameters from the dataLayer.

Shortcut: build one **GA4 Event tag** that uses `{{Event}}` as the event
name and a single trigger that fires on any custom event matching
`page_view_qh|lead_form_submit|call_click|whatsapp_click|email_click|outbound_click|form_view|form_attempt|form_error|scroll_depth`.
Forward standard params via dataLayer variables.

Variables to create in GTM (Variables → User-Defined → DataLayer Variable):
`page_id`, `page_type`, `journey_stage`, `route`, `form_id`,
`form_location`, `lead_type`, `interest`, `city`, `link_location`,
`cta_location`, `destination_domain`, `depth_pct`, `phone_masked`.

## C-05. Mark conversions

GA4 → Admin → Events → toggle "Mark as conversion" for:

- [ ] `lead_form_submit` (Primary)
- [ ] `call_click` (Secondary)
- [ ] `whatsapp_click` (Secondary)
- [ ] `appointment_book_complete` (Primary — when booking engine ships)
- [ ] `lead_qualified` (Primary, gold — server-side)

Do **not** mark conversions: `page_view_qh`, `scroll_depth`, `form_view`,
`form_attempt`, `form_error`, `outbound_click`, `email_click`.

## C-06. Property-level hygiene

- [ ] Admin → Data Settings → Data Retention → **14 months** (default 2).
- [ ] Admin → Data Settings → Data Filters → exclude internal traffic.
      First in GTM/GA4 Config: set parameter `traffic_type = internal` for
      your office IP. Then create the Internal Traffic filter with that value.
- [ ] Admin → Reporting Identity → set to **Blended**.
- [ ] Admin → Attribution Settings → **Data-driven** model.

## C-07. Link the platforms

| Link | Where | Why |
|---|---|---|
| Google Ads ↔ GA4 | Admin → Product Links → Google Ads | Auto-tag `gclid`, import conversions |
| Search Console ↔ GA4 | Admin → Product Links → Search Console | "Queries" report inside GA4 |
| BigQuery ↔ GA4 | Admin → BigQuery Links | Free export — turn on day 1 |
| YouTube channel ↔ Google Ads | Ads → Tools → Linked Accounts | View-through conversions |
| Merchant Center / GMB | Optional |  |

## C-08. Server-side `lead_qualified` from CRM

When a CRM record is marked qualified, POST to GA4 Measurement Protocol:

```
POST https://www.google-analytics.com/mp/collect
  ?measurement_id=G-PMSJHJ679P
  &api_secret=<create in Admin → Data Streams → Measurement Protocol API secrets>

{
  "client_id": "<GA4 client_id captured at form-submit time and stored on the lead record>",
  "events": [{
    "name": "lead_qualified",
    "params": {
      "lead_id_hash": "<hash of internal lead id>",
      "specialty": "cardiac",
      "city": "bengaluru",
      "branch": "indiranagar",
      "lead_score": 8
    }
  }]
}
```

Capture `client_id` at form-submit time:

```js
gtag('get', 'G-PMSJHJ679P', 'client_id', function(cid){ /* store with lead */ });
```

(That snippet has to live in front-end code; the actual MP call is server-side.)

## C-09. Build the patient acquisition funnel

GA4 → Explore → Funnel exploration. Steps:

1. `session_start` (any source)
2. `page_view_qh` where `journey_stage = consideration`
3. `page_view_qh` where `journey_stage = intent`  *(indirectly followed)*
4. `lead_form_submit` OR `call_click` OR `whatsapp_click`
5. `lead_qualified` *(directly followed)*

Breakdown: `interest`. Segments: Paid Search vs Organic vs Direct vs Social.

## C-10. Build the founder dashboard (Looker Studio)

One screen, no scroll. Connect to GA4 property.

| Block | Metric | Filter |
|---|---|---|
| KPI 1 | Qualified leads (last 7d) | `event_name = lead_qualified` |
| KPI 2 | CPL (last 7d) | qualified leads ÷ ad spend (Ads connector) |
| KPI 3 | Lead → appointment % | `appointment_book_complete` ÷ `lead_form_submit` |
| Bar | Leads by `interest` | `event_name = lead_form_submit` |
| Bar | Leads by `session_default_channel_grouping` | same |
| Trend | 13-week qualified leads | line chart |

Schedule weekly email Monday 8am to founder.

## C-11. Build the marketing team explorations

In GA4 → Explore, create:

1. **Patient acquisition funnel** (as above).
2. **Content → conversion**: free-form. Rows: Landing page + Page title.
   Cols: Sessions, `lead_form_submit`, `call_click`, `whatsapp_click`,
   conversion rate. Last 7 days.
3. **Form journey**: Path Exploration starting from `form_view`. Look for
   exits between `form_view` → `form_attempt` → `lead_form_submit`.
4. **Specialty performance**: free-form, dimensions = `interest`,
   `journey_stage`. Metric = event count.
5. **Paid efficiency**: free-form, dimensions = `session_campaign`,
   `session_source / medium`. Metric = `lead_form_submit` count + cost.

## C-12. Validation (do this before declaring "done")

- [ ] GTM Preview mode: visit each route, confirm `page_view_qh` fires
      with correct `journey_stage`.
- [ ] Submit the contact form with valid data — confirm `form_attempt`
      then `lead_form_submit` fire in DebugView.
- [ ] Click a `tel:` link — confirm `call_click` with masked phone.
- [ ] Click a `wa.me` link — confirm `whatsapp_click`.
- [ ] Scroll a long blog page — confirm `scroll_depth` 25/50/75/90 fire
      once each.
- [ ] GA4 → Realtime → confirm events appear with custom dimensions
      populated (not "(not set)").

If any param is "(not set)" in reports after 24h: dimension wasn't
registered in GA4 *before* data was sent. Re-register and wait — reports
populate forward-only.
