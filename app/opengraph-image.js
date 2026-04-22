import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "kurodev portal & build desk";
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
          background: "linear-gradient(135deg, #05050a 0%, #10111c 54%, #161025 100%)",
          color: "#f7f7fb",
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
            background: "rgba(139, 92, 246, 0.22)"
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
            background: "rgba(34, 211, 238, 0.12)"
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: 24,
              background: "rgba(139, 92, 246, 0.18)",
              border: "1px solid rgba(196, 181, 253, 0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a78bfa",
              fontSize: 34,
              fontWeight: 800
            }}
          >
            ✦
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>kurodev</div>
            <div style={{ marginTop: 6, fontSize: 20, color: "#a5adbd" }}>portal & build desk</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 900 }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.08, letterSpacing: -3 }}>
            Web制作・改善運用・業務ツール相談
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.55, color: "#c9ced8" }}>
            要件整理から実装後の改善まで、一続きで扱う制作相談の入口です。
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            color: "#a78bfa",
            fontSize: 22,
            fontWeight: 700
          }}
        >
          <span>Web制作</span>
          <span>/</span>
          <span>改善運用</span>
          <span>/</span>
          <span>業務ツール相談</span>
        </div>
      </div>
    ),
    size
  );
}
