// Security headers for Next.js
// This file is used to configure security headers for the application

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // Add Content-Security-Policy in production
  ...(process.env.NODE_ENV === 'production'
    ? [
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy.replace(/\\s{2,}/g, ' ').trim(),
        },
      ]
    : []),
];

// Define Content-Security-Policy
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.supabase.co;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: *.supabase.co;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  connect-src 'self' *.supabase.co wss://*.supabase.co;
`;

module.exports = { securityHeaders };
