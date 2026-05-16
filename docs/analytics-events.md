# Qlarify Health — Analytics Event Spec

> Source of truth for what fires in `dataLayer` from the website.
> The website-side wiring lives in `main.js` (search "QH Analytics Layer").
> The GA4 / GTM side wiring is **manual** — see `analytics-ga4-setup-checklist.md`.

## Container IDs

| System | ID | Where |
|---|---|---|
| GTM (server-bound) | `GTM-535KTHSM` | `index.html` head |
| GA4 (direct gtag) | `G-PMSJHJ679P` | `index.html` head |

> **Note:** the site currently has *both* a GTM container and a direct gtag.js
> snippet. Pick one path (GTM is recommended) and remove the other to avoid
> double-counting. See checklist item C-01.

## Global page context (pushed on every route change)

Every event below is automatically enriched with these parameters. Do **not** re-pass them.

| Param | Type | Example |
|---|---|---|
| `page_id` | string | `home`, `seo`, `blog-opd-footfall`, `contact` |
| `route` | string | `/`, `/seo`, `/blog/increase-opd-footfall` |
| `page_type` | enum | `home`, `service`, `blog_post`, `blog_index`, `glossary`, `about`, `contact`, `legal`, `error` |
| `journey_stage` | enum | `awareness`, `consideration`, `intent`, `utility` |

## Events

| Event | When it fires | Extra params | Suggested conversion tier |
|---|---|---|---|
| `page_view_qh` | Every route change + initial load | `page_title` | — |
| `scroll_depth` | First time user crosses 25 / 50 / 75 / 90 % of page | `depth_pct` | — |
| `form_view` | Contact form scrolls 40% into view | `form_id`, `form_location` | — |
| `form_attempt` | User clicks submit (valid or invalid) | `form_id`, `valid`, `interest` | — |
| `lead_form_submit` | Web3Forms returns `success:true` | `form_id`, `interest`, `city`, `lead_type` | **Primary** |
| `form_error` | API/network failure on submit | `error_type` | — |
| `call_click` | Click on any `tel:` link | `link_location`, `phone_masked` | **Secondary** |
| `whatsapp_click` | Click on `wa.me`, `api.whatsapp.com`, or `whatsapp:` link | `link_location` | **Secondary** |
| `email_click` | Click on `mailto:` link | `link_location` | — |
| `outbound_click` | Click on any external `http(s)` link | `link_location`, `destination_domain` | — |
| `<custom>` | Any element with `data-track="event_name"` | `cta_location`, `cta_label` | varies |

## Naming conventions

- Events: `snake_case`, verb-first (`call_click`, `form_view`, `lead_form_submit`).
- Parameters: `snake_case`, ≤ 40 chars, **no PII** (no phone, name, email, message text).
- `link_location` / `cta_location` values come from the closest enclosing
  `<section>`, `<header>`, `<footer>`, or `[data-section]` element. Add
  `data-section="hero"` (etc.) on a wrapper to control the value.

## Adding a new tracked CTA

```html
<button data-track="brochure_download" data-cta-location="cardiac_service_page">
  Download brochure
</button>
```

That alone is enough — the global click delegate handles the dataLayer push.

## Privacy

- Phone numbers are masked client-side before pushing (`+91XXX***NN`).
- Form field values that contain free text (Hospital name, Name & Role,
  Context) are **never** pushed to dataLayer. Only the structured `interest`
  dropdown value and `city` are sent.
- No identifiers are persisted to localStorage / cookies by this layer.
