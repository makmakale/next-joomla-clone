import type { NextConfig } from 'next';

import packageJson from './package.json';

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    // cacheComponents: true,
    // partialPrefetching: true,
    turbopack: {
        rules: {
            '*.css': {
                loaders: ['@tailwindcss/turbopack'],
                as: '*.css',
            },
        },
    },
    env: {
        APP_VERSION: packageJson.version,
    },
    modularizeImports: {
        lodash: { transform: 'lodash/{{member}}' },
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
