import { drizzle } from 'drizzle-orm/node-postgres';
import JConfig from '@/configuration';
import { Pool } from 'pg';

import * as schema from './schema';

const pool = new Pool({
    connectionString: JConfig.dbUrl,
    ssl: true,
    max: 20,
});

export const db = drizzle({ client: pool, schema });

db.execute('select 1');
