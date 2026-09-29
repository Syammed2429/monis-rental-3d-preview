import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://monis.rent"),
  title: "Workspace Designer | monis.rent – Bali Remote Work Equipment",
  description:
    "Design and customize your dream remote workspace in Bali. Electric standing desks, ergonomic mesh chairs, 4K displays, and tropical accessories delivered directly to your villa in Canggu, Ubud, Seminyak, or Uluwatu.",
  keywords: [
    "monis.rent",
    "bali workspace designer",
    "rent standing desk bali",
    "ergonomic chair rental canggu",
    "remote work bali",
    "digital nomad equipment",
  ],
  openGraph: {
    title: "Workspace Designer | monis.rent",
    description:
      "Interactive 3D workspace builder for digital nomads in Bali. Customize your sit-stand desk, chair, monitors, and rent with next-day villa delivery.",
    url: "https://monis.rent",
    siteName: "monis.rent",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full font-sans antialiased">
      <body className="flex min-h-full flex-col bg-[#0c0e14] text-neutral-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
