import { ImageResponse } from "next/og";

export const alt = "monis.rent – Bali 3D Workspace Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        background: "linear-gradient(135deg, #090b10 0%, #111827 50%, #1e1b4b 100%)",
        color: "#f8fafc",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      {/* Glow Accent */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234, 88, 12, 0.35) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Header / Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px -5px rgba(234, 88, 12, 0.5)",
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 900, color: "#ffffff" }}>M</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            monis<span style={{ color: "#fb923c" }}>.rent</span>
          </span>
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            Bali Remote Work Equipment
          </span>
        </div>
      </div>

      {/* Main Value Proposition */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: 900 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            borderRadius: "9999px",
            background: "rgba(249, 115, 22, 0.15)",
            border: "1px solid rgba(249, 115, 22, 0.35)",
            color: "#fb923c",
            fontSize: 18,
            fontWeight: 600,
            alignSelf: "flex-start",
          }}
        >
          Interactive 3D Workspace Configurator
        </div>
        <h1
          style={{
            fontSize: 58,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: 0,
            color: "#ffffff",
          }}
        >
          Build your dream Bali workstation. Delivered tomorrow.
        </h1>
        <p
          style={{
            fontSize: 22,
            lineHeight: 1.4,
            color: "#cbd5e1",
            margin: 0,
          }}
        >
          Dual-motor standing desks, ergonomic Herman Miller-style mesh chairs, 4K displays &amp;
          tropical extras. Direct villa setup in Canggu, Ubud, Seminyak &amp; Uluwatu.
        </p>
      </div>

      {/* Footer Badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: 18,
            color: "#94a3b8",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Next-Day Delivery</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: 18,
            color: "#94a3b8",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Free Villa Setup</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: 18,
            color: "#94a3b8",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Up to 30% Long-Stay Discount</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: 18,
            color: "#94a3b8",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>WhatsApp Instant Booking</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
