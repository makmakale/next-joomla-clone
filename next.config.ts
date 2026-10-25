import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    turbopack: {
        rules: {
            '*.css': {
                loaders: ['@tailwindcss/turbopack'],
                as: '*.css',
            },
        },
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/index',
            },
            {
                source: '/administrator',
                destination: '/administrator/index',
            },
        ];
    },
};

export default nextConfig;
