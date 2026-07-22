import { ImageResponse } from "next/og";

export const size = { width: 128, height: 128 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3f4fd1 0%, #0b0e2e 100%)",
          borderRadius: 26,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          U
        </div>
      </div>
    ),
    size,
  );
}
