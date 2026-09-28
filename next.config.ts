import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["*.trycloudflare.com", "localhost:3000", "192.168.100.101"],
};

export default nextConfig;
