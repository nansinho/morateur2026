import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/mounine/index.html',
        destination: '/mounine',
        permanent: true,
      },
      {
        source: '/bergerie/index.html',
        destination: '/bergerie',
        permanent: true,
      },
      {
        source: '/revenants/index.html',
        destination: '/revenants',
        permanent: true,
      },
      {
        source: '/roumanille/roumanille.html',
        destination: '/roumanille-thiers',
        permanent: true,
      },
      {
        source: '/roumanille',
        destination: '/quartiers',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
