import type { NextConfig } from 'next';

import packageJson from './package.json';

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
    modularizeImports: {
        lodash: { transform: 'lodash/{{member}}' },
    },
};

export default nextConfig;
