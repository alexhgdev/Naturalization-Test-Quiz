/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/naturalization-quiz',
    experimental: {
        missingSuspenseWithCSRError: false,
    },
    skipMiddlewareUrlNormalize: true,
    skipTrailingSlashRedirect: true,
}

module.exports = nextConfig 