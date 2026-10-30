import * as p from 'drizzle-orm/pg-core';

export const userMfaTable = p.pgTable(
    'user_mfa',
    {
        id: p.serial('id').notNull().primaryKey(),
        userId: p.bigint('user_id', { mode: 'number' }).notNull(),
        title: p.varchar('title', { length: 255 }).default('').notNull(),
        method: p.varchar('method', { length: 100 }).notNull(),
        default: p.boolean('default').default(false).notNull(),
        options: p.jsonb('options').notNull().default({}),
        createdOn: p.timestamp('created_on', { mode: 'date' }).notNull(),
        lastUsed: p.timestamp('last_used', { mode: 'date' }),
        tries: p.bigint('tries', { mode: 'number' }).default(0).notNull(),
        lastTry: p.timestamp('last_try', { mode: 'date' }),
    },
    table => [p.index('user_mfa_idx_user_id').on(table.userId)],
);

export type UserMfa = typeof userMfaTable.$inferSelect;
export type NewUserMfa = typeof userMfaTable.$inferInsert;
