# Qlarify Health — UTM Convention

> One sheet. One owner. Every paid / social / email / WhatsApp / QR link
> goes through this template. If a link doesn't match, the resulting GA4
> channel report is wrong.

## Rules

1. **Lowercase only.** No spaces.
2. Use **hyphens** in *values* (`q2-2026`, `cardiac-opd`). Reserve `_` for word breaks inside multi-word labels.
3. **Never UTM internal links** — auto-decoration breaks attribution. Internal navigation must be plain `/path`.
4. **WhatsApp strips referrers.** Every link sent via WhatsApp **must** be UTM'd, no exceptions.
5. **Google Ads** uses auto-tagging (`gclid`). Do **not** also add `utm_*` to Ads URLs — pick one.

## Schema

| Param | Required | Format | Examples |
|---|---|---|---|
| `utm_source` | yes | platform name | `google`, `meta`, `youtube`, `whatsapp`, `linkedin`, `newsletter`, `practo`, `justdial`, `print`, `events` |
| `utm_medium` | yes | channel type | `cpc`, `cpm`, `social`, `email`, `messaging`, `referral`, `qr`, `video`, `display` |
| `utm_campaign` | yes | `<specialty>_<objective>_<quarter>` | `cardiac_opd_q2-2026`, `ivf_awareness_q2-2026`, `oncology_screening_q3-2026` |
| `utm_content` | recommended | creative variant | `video-15s-v2`, `static-doctor-quote`, `carousel-3-stats` |
| `utm_term` | optional | keyword (paid search) or audience | `chest-pain-specialist-blr`, `lookalike-1pct-cardiac` |

## Channel-specific examples

### Meta Ads (manual UTM, FB doesn't auto-tag reliably)
```
https://qlarify.health/seo
  ?utm_source=meta
  &utm_medium=cpc
  &utm_campaign=cardiac_opd_q2-2026
  &utm_content=video-15s-v2
  &utm_term=lookalike-1pct-cardiac
```

### YouTube description / pinned comment
```
https://qlarify.health/blog/hospital-video-production-india
  ?utm_source=youtube
  &utm_medium=video
  &utm_campaign=video-as-infrastructure_q2-2026
  &utm_content=channel-pinned
```

### WhatsApp (CRM-sent template message)
```
https://qlarify.health/contact
  ?utm_source=whatsapp
  &utm_medium=messaging
  &utm_campaign=opd-followup_q2-2026
  &utm_content=template-reminder-1
```

### Email newsletter
```
https://qlarify.health/blog/increase-opd-footfall
  ?utm_source=newsletter
  &utm_medium=email
  &utm_campaign=monthly-digest_q2-2026
  &utm_content=feature-article-1
```

### QR code (print collateral, in-hospital banner)
```
https://qlarify.health/contact
  ?utm_source=print
  &utm_medium=qr
  &utm_campaign=opd-banner-blr_q2-2026
  &utm_content=front-desk-standee
```

### Listings (Practo / Justdial — paid placements that link back)
```
https://qlarify.health
  ?utm_source=practo
  &utm_medium=referral
  &utm_campaign=listing_evergreen
```

## Owner & process

- **Owner:** Performance lead.
- **Builder sheet:** Google Sheet `Qlarify – UTM Builder` (TODO: link). Free
  text fields auto-generate the encoded URL. No one constructs URLs by hand.
- **Audit cadence:** Monthly. Pull `Acquisition → Traffic acquisition` in
  GA4, sort by sessions, look for `(not set)` or odd-cased mediums (`CPC`,
  `Cpc`, `cpc ` with trailing space). Each one is a leak — fix at source.

## Anti-patterns to reject

| Bad | Why | Use instead |
|---|---|---|
| `utm_source=Facebook` | Inconsistent casing → 2 rows in GA4 | `meta` |
| `utm_medium=Paid Search` | Spaces + casing → orphan channel | `cpc` |
| `utm_campaign=spring sale!` | Spaces + special chars | `cardiac_opd_q2-2026` |
| `utm_source=email&utm_medium=newsletter` | Reversed: `email` is medium, `newsletter` is source | `utm_source=newsletter&utm_medium=email` |
| Tagging internal anchor links | Wipes original session source | Plain `/contact` |
