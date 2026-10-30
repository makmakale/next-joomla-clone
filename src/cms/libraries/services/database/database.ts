import JConfig from '@/configuration';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

const globalDb = globalThis as typeof globalThis & { pgPool?: Pool };

const pool =
    globalDb.pgPool ??
    new Pool({
        host: JConfig.dbHost,
        port: JConfig.dbPort,
        user: JConfig.dbUser,
        password: JConfig.dbPass,
        database: JConfig.dbName,
        ssl: JConfig.dbSsl,
        connectionTimeoutMillis: 5000,
    }).on('error', err => console.error('[DB]', err.message));

if (process.env.NODE_ENV !== 'production') globalDb.pgPool = pool;

export const db = drizzle({ client: pool, schema });
