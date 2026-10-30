import * as p from 'drizzle-orm/pg-core';

export const actionLogConfigTable = p.pgTable('action_log_config', {
    id: p.serial('id').notNull().primaryKey(),
    typeTitle: p.varchar('type_title', { length: 255 }).default('').notNull(),
    typeAlias: p.varchar('type_alias', { length: 255 }).default('').notNull(),
    idHolder: p.varchar('id_holder', { length: 255 }),
    titleHolder: p.varchar('title_holder', { length: 255 }),
    tableName: p.varchar('table_name', { length: 255 }),
    textPrefix: p.varchar('text_prefix', { length: 255 }),
});

export type ActionLogConfig = typeof actionLogConfigTable.$inferSelect;
export type NewActionLogConfig = typeof actionLogConfigTable.$inferInsert;
