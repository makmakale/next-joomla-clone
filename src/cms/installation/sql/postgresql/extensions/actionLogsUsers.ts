import * as p from 'drizzle-orm/pg-core';

export const actionLogsUsersTable = p.pgTable(
    'action_logs_users',
    {
        userId: p.integer('user_id').notNull().primaryKey(),
        notify: p.boolean('notify').notNull(),
        extensions: p.jsonb('extensions').notNull().default([]),
    },
    table => [p.index('action_logs_users_idx_notify').on(table.notify)],
);

export type ActionLogsUser = typeof actionLogsUsersTable.$inferSelect;
export type NewActionLogsUser = typeof actionLogsUsersTable.$inferInsert;
