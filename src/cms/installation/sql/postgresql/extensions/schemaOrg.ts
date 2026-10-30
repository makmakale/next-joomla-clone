import * as p from 'drizzle-orm/pg-core';

export const schemaOrgTable = p.pgTable('schemaorg', {
    id: p.serial('id').notNull().primaryKey(),
    itemId: p.bigint('itemId', { mode: 'number' }),
    context: p.varchar('context', { length: 100 }),
    schemaType: p.varchar('schemaType', { length: 100 }),
    schema: p.jsonb('schema'),
});

export type SchemaOrg = typeof schemaOrgTable.$inferSelect;
export type NewSchemaOrg = typeof schemaOrgTable.$inferInsert;
