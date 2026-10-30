import * as p from 'drizzle-orm/pg-core';

export const schemasTable = p.pgTable(
    'schemas',
    {
        extensionId: p.bigint('extension_id', { mode: 'number' }).notNull(),
        versionId: p.varchar('version_id', { length: 20 }).notNull(),
    },
    table => [p.primaryKey({ columns: [table.extensionId, table.versionId] })],
);

export type Schema = typeof schemasTable.$inferSelect;
export type NewSchema = typeof schemasTable.$inferInsert;
