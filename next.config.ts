import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração básica e estável
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;