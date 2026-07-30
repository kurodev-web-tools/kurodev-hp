import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "kurodev Creator Platform";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #061019 0%, #081b25 58%, #0a2c33 100%)",
          color: "#f4f8fa",
          padding: 72,
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -100,
            width: 440,
            height: 440,
            borderRadius: 440,
            background: "rgba(40, 200, 194, 0.2)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -140,
            bottom: -160,
            width: 420,
            height: 420,
            borderRadius: 420,
            background: "rgba(208, 80, 158, 0.14)"
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: 24,
              background: "rgba(40, 200, 194, 0.16)",
              border: "1px solid rgba(85, 222, 216, 0.36)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#55ded8",
              fontSize: 34,
              fontWeight: 800
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                background: "#55ded8",
                transform: "rotate(45deg)"
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>kurodev</div>
            <div style={{ marginTop: 6, fontSize: 20, color: "#a7b7bf" }}>Creator Platform</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -3
            }}
          >
            <div>Creator tools and websites,</div>
            <div>shaped around the workflow.</div>
          </div>
          <div style={{ fontSize: 27, lineHeight: 1.55, color: "#c6d3d8" }}>
            クリエイターの準備・発信・問い合わせを、ツールとWeb制作で整える。
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            color: "#55ded8",
            fontSize: 22,
            fontWeight: 700
          }}
        >
          <span>Creator tools</span>
          <span>/</span>
          <span>Creator websites</span>
          <span>/</span>
          <span>Guides</span>
        </div>
      </div>
    ),
    size
  );
}
