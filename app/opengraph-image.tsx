import { ImageResponse } from "next/og";

export const alt = "Fares Alhezaimi — Earth Intelligence and Scientific Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#080808",
        color: "#f8f5ef",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          borderRadius: "50%",
          right: -140,
          top: -40,
          border: "2px solid rgba(255,92,26,.52)",
          boxShadow: "0 0 180px rgba(255,92,26,.18) inset",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 370,
          height: 370,
          borderRadius: "50%",
          right: 0,
          top: 95,
          background: "radial-gradient(circle at 38% 32%, #ffb18b, #c9360d 23%, #351009 67%, #100806)",
          boxShadow: "0 0 90px rgba(255,92,26,.45)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 150,
          top: 270,
          color: "#ffb18b",
          fontSize: 23,
          letterSpacing: 5,
        }}
      >
        THERMAL SIGNAL
      </div>
      <div
        style={{
          width: 820,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 0 64px 72px",
        }}
      >
        <div style={{ color: "#ff8a50", fontSize: 20, letterSpacing: 5, textTransform: "uppercase" }}>
          Scientific software · Remote sensing · AI
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 74,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: -5,
          }}
        >
          Fares Alhezaimi
        </div>
        <div style={{ display: "flex", marginTop: 27, color: "#ff5c1a", fontSize: 43, fontWeight: 700 }}>
          Tools for a changing planet.
        </div>
        <div style={{ display: "flex", marginTop: 55, color: "#a9a49b", fontSize: 20 }}>
          Chapman University · NASA Jet Propulsion Laboratory
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 34,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 19,
          fontWeight: 800,
        }}
      >
        FA<span style={{ color: "#ff5c1a" }}>.</span>
      </div>
    </div>,
    size,
  );
}
