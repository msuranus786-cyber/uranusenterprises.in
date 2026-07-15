/** Renders a schema.org JSON-LD block. `data` must be built server-side from
 *  our own trusted sources; `<` is escaped to keep the payload script-safe. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
