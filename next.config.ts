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
            // hostname: "first-next-project-smoky.vercel.app",
          },
        ]
      : [
          {
            protocol: "http",
            hostname: "127.0.0.1",
          },
          {
            protocol: "http",
            hostname: "localhost",
          },
        ],
  },
};

export default nextConfig;

