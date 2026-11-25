# HG progress — hg/q-more2-fixes (cut from glm/q-more2 d863eb1)

Loop 4 of 5 (his "All five", 26-11-2026). Branch only; not merged, not deployed, not pushed.

## 26-11-2026 — review findings fixed
1. SSRF: both URL tools now use `api/tools/ssrf-guard.js`. It resolves all A/AAAA answers, rejects any private/reserved address, pins the
   validated address for the socket, validates every redirect before connecting, allows only HTTP(S) on standard ports, caps bytes and time.
   Covers loopback, RFC1918, link-local/cloud metadata, CGNAT, IPv6 ULA/link-local/mapped IPv4, 6to4/Teredo/NAT64 and local hostnames.
   `npm test`: 10 tests pass (7 SSRF + 3 digest). No live exploit attempts.
2. Digest form: `{ok:true,fallbackRequired:true}` no longer becomes "You're on the list". It now says the signup is not confirmed and gives
   info@qlarify.health as the manual route; network errors also say not confirmed. Server error text uses textContent, not innerHTML.
3. Clinical claims: the patient-decision-support article no longer promises lower readmissions, higher HCAHPS, better adherence or clinical outcomes.
   It states the evidence limit (knowledge/value-consistent choices strongest), asks hospitals to measure their own pathway, and cites the 2024
   Cochrane review + AHRQ SHARE Approach. The patient-education service page was softened the same way.
4. Client-visible vendor words removed from this branch's copy (production workflow and answer-search wording instead). Existing URLs/route
   IDs stay unchanged so links do not break; `llms.txt` remains as the literal discovery filename.
5. `npm run build`: 153 pages built.

## Open for him
- /api/lead still returns `ok:true` with fallbackRequired when the email key is missing. The digest handles it correctly now; the audit forms
  already have their WhatsApp fallback. A later API cleanup can make fallback a non-2xx/non-ok response for every client.
- No real deploy or live endpoint test (forbidden in this loop).
