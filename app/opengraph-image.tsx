import { ImageResponse } from "next/og";

import { hero, profile } from "@/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FAFAF7";
const INK = "#1A1A18";
const MUTED = "#6B6A63";
const ACCENT = "#146B6B";
const HAIRLINE = "#E3E1D8";

export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          color: INK,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, backgroundColor: ACCENT }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {`${profile.role} · ${profile.location}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, letterSpacing: -3, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 38,
              lineHeight: 1.3,
              color: MUTED,
              maxWidth: 900,
            }}
          >
            {hero.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${HAIRLINE}`,
            paddingTop: 28,
            fontSize: 24,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>jasur.dev</div>
          <div style={{ display: "flex", color: ACCENT }}>
            React · Next.js · TypeScript
          </div>
        </div>
      </div>
    ),
    size,
  );
}
