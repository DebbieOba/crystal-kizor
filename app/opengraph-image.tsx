import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview generated at build time from site data — no binary asset to keep in sync. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f3efe7",
          color: "#1a1916",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5e584e",
            fontFamily: "sans-serif",
          }}
        >
          {site.roles.slice(0, 5).join("  ·  ")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 120, lineHeight: 1, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 40, color: "#9a4a2a" }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", height: 2, background: "#1a1916" }} />
      </div>
    ),
    size,
  );
}
