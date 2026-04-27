// Site-wide default Open Graph image. Renders at build time via next/og.
// Inherits the editorial-calm palette from globals.css — paper background,
// ink text, sage italic for emphasis. 1200x630 is the canonical OG size.

import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = `${site.name} — ${site.tagline}`;

const PAPER = "#F4F1EA";
const INK = "#1A1F1B";
const SAGE = "#5C7A6E";
const MUTED = "#6B7670";
const LINE = "#E2DFD7";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: PAPER,
          color: INK,
          display: "flex",
          flexDirection: "column",
          padding: "72px 88px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "20px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: SAGE,
            fontFamily: "monospace",
            marginBottom: "60px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              background: SAGE,
              display: "block",
            }}
          />
          <span>Qlarify Health · Bengaluru &middot; Mumbai</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "108px",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            maxWidth: "1024px",
            marginBottom: "36px",
          }}
        >
          <span>Marketing for hospitals.</span>
          <span style={{ color: SAGE, fontStyle: "italic" }}>
            Only hospitals.
          </span>
        </div>

        <div
          style={{
            fontSize: "26px",
            lineHeight: 1.4,
            color: MUTED,
            maxWidth: "880px",
            fontFamily: "sans-serif",
          }}
        >
          Strategy, content, and digital systems built exclusively for
          healthcare across India. A decade of work, 40+ active hospital
          partners, 14 cities.
        </div>

        <div style={{ flex: 1 }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "32px",
            borderTop: `1px solid ${LINE}`,
            fontSize: "20px",
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>qlarify.health</span>
          <span style={{ color: INK }}>Outcomes &mdash; not awards.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
