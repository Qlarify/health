// Inlines a JSON-LD <script> in the document head/body. Server-component-safe;
// avoids next/script's client runtime so the markup ships in the initial HTML
// (which is what crawlers actually read).
//
// JSON.stringify is sufficient — there is no user-supplied data in any of the
// homepage schemas. If you ever pass user data through here, run it through
// a stricter encoder that escapes `<`, `>`, and `&`.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The output is ours, not user input — safe to dangerouslySetInnerHTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
