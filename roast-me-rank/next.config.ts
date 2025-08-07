import type { NextConfig } from "next";
import { securityHeaders } from './src/lib/security-headers';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').split('.')[0] + '.supabase.co'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  // Enable compression for better performance
  compress: true,
  // Configure rewrites for API proxying if needed
  async rewrites() {
    return [];
  },
  // Configure redirects for better UX
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
