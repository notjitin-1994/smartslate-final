import type { NextConfig } from "next";
// import { createOptimizedDeps } from 'next/experimental/optimize-package-imports';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  // Reduce legacy/unused JS by optimizing package imports
  experimental: {
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: "/:all*\.(png|jpg|jpeg|gif|svg|webp|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
      {
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/images/courses/swirl.png?v=favicon4",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/images/courses/swirl.png?v=favicon4",
        permanent: false,
      },
      {
        source: "/personal-testimonial",
        destination: "/smartslate-testimony",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
