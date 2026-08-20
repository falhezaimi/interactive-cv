import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        background: "#080808",
        color: "#f8f5ef",
        fontFamily: "Arial, sans-serif",
        fontSize: 25,
        fontWeight: 900,
        letterSpacing: -2,
      }}
    >
      FA<span style={{ color: "#ff5c1a" }}>.</span>
    </div>,
    size,
  );
}
