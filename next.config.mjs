import { withPayload } from '@payloadcms/next/withPayload'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
  ? `https://${process.env.NEXT_PUBLIC_SERVER_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin/login',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/src',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL, 'https://tsmcaqxorqmxtnkqwmmq.supabase.co'].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  experimental: {
    reactCompiler: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
