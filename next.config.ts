import type { NextConfig } from "next";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: isProd
      ? [
          {
            protocol: "https",
            hostname: "admin.dot95bd.com",
          },
        ]
      : [
          {
            protocol: "http",
            hostname: "127.0.0.1",
          }
        ],
  },
};

export default nextConfig;

