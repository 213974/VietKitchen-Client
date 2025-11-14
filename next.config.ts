import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Allows importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;