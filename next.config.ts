import packageJson from './package.json';
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
    env: {
        APP_VERSION: packageJson.version,
    },
};

export default nextConfig;
