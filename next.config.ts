import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.6"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ttczjzzbtaxtnckrjtts.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
