/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['images.gscplusmd.com'], // Add your domain here
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
