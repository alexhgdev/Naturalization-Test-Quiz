/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/naturalization-quiz',
    assetPrefix: '/naturalization-quiz/',
    trailingSlash: true,
    skipMiddlewareUrlNormalize: true,
    skipTrailingSlashRedirect: true,
    experimental: {
        optimizeCss: true,
    }
}

module.exports = nextConfig 