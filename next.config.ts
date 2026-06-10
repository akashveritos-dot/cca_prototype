import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Allow mobile access on local network
  allowedDevOrigins: ['10.58.173.175'],
};

export default nextConfig;
