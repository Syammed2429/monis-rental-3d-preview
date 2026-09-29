import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

/**
 * Dynamic Next.js Favicon / App Icon
 * Generates an emerald-to-teal branded square icon with the monis 'm' mark.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(16, 185, 129, 0.4)",
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 20,
          fontWeight: 900,
          color: "#0a0c10",
          lineHeight: 1,
          marginBottom: 2,
        }}
      >
        m
      </span>
    </div>,
    {
      ...size,
    }
  );
}
