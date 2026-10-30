import * as p from 'drizzle-orm/pg-core';

export const contentTypesTable = p.pgTable(
    'content_types',
    {
        typeId: p.serial('type_id').notNull().primaryKey(),
        typeTitle: p.varchar('type_title', { length: 255 }).default('').notNull(),
        typeAlias: p.varchar('type_alias', { length: 255 }).default('').notNull(),
        table: p.varchar('table', { length: 2048 }).default('').notNull(),
        rules: p.jsonb('rules').notNull().default({}),
        fieldMappings: p.jsonb('field_mappings').notNull().default({}),
        router: p.varchar('router', { length: 255 }).default('').notNull(),
        contentHistoryOptions: p.jsonb('content_history_options'),
    },
    table => [p.index('content_types_idx_alias').on(table.typeAlias)],
);

export type ContentType = typeof contentTypesTable.$inferSelect;
export type NewContentType = typeof contentTypesTable.$inferInsert;
