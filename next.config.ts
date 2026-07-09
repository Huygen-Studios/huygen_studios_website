process.env.NAPI_RS_FORCE_WASI = '1';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const appRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  transpilePackages: ['three', '@react-three/drei', '@react-three/fiber'],
  turbopack: {
    root: dirname(appRoot),
  },
  async redirects() {
    return [
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/policy",
        destination: "/privacy-policy",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/huygen-sequence/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:model*.glb",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
