import * as p from 'drizzle-orm/pg-core';

export const templateOverridesTable = p.pgTable(
    'template_overrides',
    {
        id: p.serial('id').notNull().primaryKey(),
        template: p.varchar('template', { length: 50 }).default('').notNull(),
        hashId: p.varchar('hash_id', { length: 255 }).default('').notNull(),
        extensionId: p.bigint('extension_id', { mode: 'number' }).default(0),
        state: p.smallint('state').default(0).notNull(),
        action: p.varchar('action', { length: 50 }).default('').notNull(),
        clientId: p.smallint('client_id').default(0).notNull(),
        createdDate: p.timestamp('created_date', { mode: 'date' }).notNull(),
        modifiedDate: p.timestamp('modified_date', { mode: 'date' }),
    },
    table => [
        p.index('template_overrides_idx_template').on(table.template),
        p.index('template_overrides_idx_extension_id').on(table.extensionId),
    ],
);

export type TemplateOverride = typeof templateOverridesTable.$inferSelect;
export type NewTemplateOverride = typeof templateOverridesTable.$inferInsert;
