import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Ensures a self-contained build
  logging: false,
  fetches: {
    fullUrl: true, // Logs full fetch URLs for debugging
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    ppr: false,
    inlineCss: true,
  },
  devIndicators: {
    buildActivityPosition: "bottom-right",
    appIsrStatus: false,
    buildActivity: false,
  },
  async redirects() {
    return [
      {
        source: "/start",
        destination: "https://elizas.xyz/eliza/",
        permanent: false,
      },
      {
        source: "/school",
        destination:
          "https://www.youtube.com/playlist?list=PL0D_B_lUFHBKZSKgLlt24RvjJ8pavZNVh",
        permanent: false,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/2bkryvK9Yu",
        permanent: false,
      },
      {
        source: "/profiles",
        destination: "https://elizaos.github.io/profiles",
        permanent: false,
      },
      {
        source: "/bounties",
        destination: "https://elizaos.github.io/website/",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path(.*)",
        destination: "https://us-assets.i.posthog.com/static/:path",
      },
      {
        source: "/ingest/:path(.*)",
        destination: "https://us.i.posthog.com/:path",
      },
      {
        source: "/profiles/:path(.*)",
        destination: "https://elizaos.github.io/profiles/:path",
      },
      {
        source: "/bounties/:path(.*)",
        destination: "https://elizaos.github.io/website/:path",
      },
      {
        source: "/eliza/:path(.*)",
        destination: "https://elizaos.github.io/eliza/:path",
      },
      {
        source: "/docs",
        destination: "https://cogend.mintlify.dev/docs",
      },
      {
        source: "/docs/:match*",
        destination: "https://cogend.mintlify.dev/docs/:match*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://elizas.xyz" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;
