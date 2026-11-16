import { sql } from 'drizzle-orm';

import { db } from '@/libraries/services/database';

export const resetSerial = async (table: string, column: string) => {
    await db.execute(
        sql`select setval(pg_get_serial_sequence(${table}, ${column}), coalesce((select max(${sql.identifier(column)}) from ${sql.identifier(table)}), 1))`,
    );
};
