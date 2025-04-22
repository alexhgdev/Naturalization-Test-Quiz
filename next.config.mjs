/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/Naturalization-Test-Quiz',
  assetPrefix: '/Naturalization-Test-Quiz/',
  experimental: {
    serverActions: true
  }
}

export default nextConfig
