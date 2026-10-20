import JConfig from '@/configuration';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

const pool = new Pool({
    host: JConfig.dbHost,
    database: JConfig.dbName,
    port: JConfig.dbPort,
    user: JConfig.dbUser,
    password: JConfig.dbPass,
    ssl: true,
    max: 20,
});

export const db = drizzle({ client: pool, schema });

db.execute('select 1');
