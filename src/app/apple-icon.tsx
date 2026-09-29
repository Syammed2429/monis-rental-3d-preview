import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

/**
 * Apple Touch Icon (180x180)
 * High-resolution icon for iOS bookmarks and safari home screen.
 */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
        borderRadius: 40,
      }}
    >
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 110,
          fontWeight: 900,
          color: "#0a0c10",
          lineHeight: 1,
          marginBottom: 10,
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
