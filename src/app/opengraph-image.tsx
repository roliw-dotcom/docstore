import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "bAIndly — Your AI that reads the fine print";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0F2337",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: "28px" }}>
          <span style={{ fontSize: 72, color: "white", fontWeight: 400 }}>b</span>
          <span style={{ fontSize: 72, color: "#E67E22", fontWeight: 700, fontFamily: "Arial, sans-serif" }}>AI</span>
          <span style={{ fontSize: 72, color: "white", fontWeight: 400 }}>ndly</span>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: 30,
          color: "#8AAEC7",
          marginBottom: "52px",
          textAlign: "center",
          maxWidth: "820px",
          lineHeight: 1.4,
        }}>
          Your AI that reads the fine print. Never miss a deadline again.
        </p>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            "AI extracts every deadline",
            "Reminders before they're due",
            "Works with any document",
          ].map((f) => (
            <div
              key={f}
              style={{
                background: "rgba(230,126,34,0.12)",
                border: "1px solid rgba(230,126,34,0.3)",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: 20,
                color: "#F5A623",
              }}
            >
              {f}
            </div>
          ))}
        </div>

        {/* URL */}
        <p style={{
          position: "absolute",
          bottom: "36px",
          fontSize: 16,
          color: "rgba(255,255,255,0.2)",
          fontFamily: "monospace",
        }}>
          baindly.com
        </p>
      </div>
    ),
    { ...size }
  );
}
