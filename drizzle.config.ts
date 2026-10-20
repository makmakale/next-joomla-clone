import JConfig from '@/configuration';
import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/cms/libraries/services/database/schema/index.ts',
    out: './src/cms/libraries/services/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        host: JConfig.dbHost,
        database: JConfig.dbName,
        port: JConfig.dbPort,
        user: JConfig.dbUser,
        password: JConfig.dbPass,
        ssl: true,
    },
    verbose: true,
    strict: true,
}) satisfies Config;
