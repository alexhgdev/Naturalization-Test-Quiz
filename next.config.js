/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        domains: ['github.com'],
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? '/Naturalization-Test-Quiz/' : '',
    basePath: process.env.NODE_ENV === 'production' ? '/Naturalization-Test-Quiz' : '',
    trailingSlash: true,
    distDir: 'out',
    reactStrictMode: true,
    swcMinify: true
}

module.exports = nextConfig 