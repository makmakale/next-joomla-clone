import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';
import JConfig from '@/configuration';
import 'dotenv/config';

export default defineConfig({
    schema: './src/cms/libraries/services/database/schema/index.ts',
    out: './src/cms/libraries/services/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: JConfig.dbUrl,
        ssl: true,
    },
    verbose: true,
    strict: true,
}) satisfies Config;
