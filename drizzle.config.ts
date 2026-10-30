import 'dotenv/config';

import JConfig from '@/configuration';
import type { Config } from 'drizzle-kit';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/cms/libraries/services/database/schema/index.ts',
    out: './src/cms/libraries/services/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        host: JConfig.dbHost,
        port: JConfig.dbPort,
        user: JConfig.dbUser,
        password: JConfig.dbPass,
        database: JConfig.dbName,
        ssl: JConfig.dbSsl,
    },
    verbose: true,
    strict: true,
}) satisfies Config;
