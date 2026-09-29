import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0c0e14] text-neutral-100">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
