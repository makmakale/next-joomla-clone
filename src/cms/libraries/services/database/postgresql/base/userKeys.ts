import * as p from 'drizzle-orm/pg-core';

export const userKeysTable = p.pgTable(
    'user_keys',
    {
        id: p.serial('id').notNull().primaryKey(),
        userId: p.varchar('user_id', { length: 255 }).notNull(),
        token: p.varchar('token', { length: 255 }).notNull(),
        series: p.varchar('series', { length: 255 }).notNull(),
        time: p.varchar('time', { length: 200 }).notNull(),
        uastring: p.varchar('uastring', { length: 255 }).notNull(),
    },
    table => [p.uniqueIndex('user_keys_series').on(table.series), p.index('user_keys_idx_user_id').on(table.userId)],
);

export type UserKey = typeof userKeysTable.$inferSelect;
export type NewUserKey = typeof userKeysTable.$inferInsert;
