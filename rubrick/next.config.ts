import type { NextConfig } from "next";

const nextConfig : NextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false,
      crypto: false,
      fs: false,
      http2: false,
      buffer: false,
      process: false,
      stream: false,
      tls: false,
      path: false,
    };
    return config;
  },
};

export default nextConfig;
