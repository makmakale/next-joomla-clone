import * as p from 'drizzle-orm/pg-core';

export const actionLogsExtensionsTable = p.pgTable('action_logs_extensions', {
    id: p.serial('id').notNull().primaryKey(),
    extension: p.varchar('extension', { length: 50 }).default('').notNull(),
});

export type ActionLogsExtension = typeof actionLogsExtensionsTable.$inferSelect;
export type NewActionLogsExtension = typeof actionLogsExtensionsTable.$inferInsert;
