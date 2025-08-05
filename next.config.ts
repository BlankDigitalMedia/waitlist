import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Disable turbopack for deployment to avoid native binding issues
    turbo: {
      rules: {
        "*.css": ["css-loader"],
      },
    },
  },
  // Ensure proper webpack configuration for native modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
