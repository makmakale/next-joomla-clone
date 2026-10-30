import * as p from 'drizzle-orm/pg-core';

export const actionLogsTable = p.pgTable(
    'action_logs',
    {
        id: p.serial('id').notNull().primaryKey(),
        messageLanguageKey: p.varchar('message_language_key', { length: 255 }).default('').notNull(),
        message: p.text('message').notNull(),
        logDate: p.timestamp('log_date', { mode: 'date' }).notNull(),
        extension: p.varchar('extension', { length: 50 }).default('').notNull(),
        userId: p.integer('user_id').default(0).notNull(),
        itemId: p.integer('item_id').default(0).notNull(),
        ipAddress: p.varchar('ip_address', { length: 40 }).default('0.0.0.0').notNull(),
    },
    table => [
        p.index('action_logs_idx_user_id').on(table.userId),
        p.index('action_logs_idx_user_id_logdate').on(table.userId, table.logDate),
        p.index('action_logs_idx_user_id_extension').on(table.userId, table.extension),
        p.index('action_logs_idx_extension_itemid').on(table.extension, table.itemId),
    ],
);

export type ActionLog = typeof actionLogsTable.$inferSelect;
export type NewActionLog = typeof actionLogsTable.$inferInsert;
