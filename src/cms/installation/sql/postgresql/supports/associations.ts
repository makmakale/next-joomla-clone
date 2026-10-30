import * as p from 'drizzle-orm/pg-core';

export const associationsTable = p.pgTable(
    'associations',
    {
        id: p.integer('id').notNull(),
        context: p.varchar('context', { length: 50 }).notNull(),
        key: p.char('key', { length: 32 }).notNull(),
    },
    table => [p.primaryKey({ columns: [table.context, table.id] }), p.index('associations_idx_key').on(table.key)],
);

export type Association = typeof associationsTable.$inferSelect;
export type NewAssociation = typeof associationsTable.$inferInsert;
