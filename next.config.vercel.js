/** @type {import('next').NextConfig} */
// Configuration for Vercel deployment (server-side rendering)
const vercelConfig = {
  images: {
    domains: [],
  },
  // Add security headers for Vercel
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = vercelConfig
