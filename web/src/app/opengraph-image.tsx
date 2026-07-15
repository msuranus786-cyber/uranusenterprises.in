import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1e2a78 0%, #0f1345 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 30,
            fontWeight: 700,
            color: "#a5b4fc",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {site.brand} · {site.city}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: "#c7d2fe",
            display: "flex",
          }}
        >
          CCTV · Biometric · Computer Service · Networking · Home Automation
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#25D366",
              borderRadius: 999,
              padding: "14px 34px",
            }}
          >
            Enquire on WhatsApp
          </div>
          <div style={{ display: "flex", color: "#94a3b8" }}>
            Free site survey across Chennai
          </div>
        </div>
      </div>
    ),
    size,
  );
}
