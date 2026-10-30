import * as p from 'drizzle-orm/pg-core';

export const fieldsCategoriesTable = p.pgTable(
    'fields_categories',
    {
        fieldId: p.bigint('field_id', { mode: 'number' }).default(0).notNull(),
        categoryId: p.bigint('category_id', { mode: 'number' }).default(0).notNull(),
    },
    table => [p.primaryKey({ columns: [table.fieldId, table.categoryId] })],
);

export type FieldsCategory = typeof fieldsCategoriesTable.$inferSelect;
export type NewFieldsCategory = typeof fieldsCategoriesTable.$inferInsert;
