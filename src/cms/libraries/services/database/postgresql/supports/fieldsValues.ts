import * as p from 'drizzle-orm/pg-core';

export const fieldsValuesTable = p.pgTable(
    'fields_values',
    {
        fieldId: p.bigint('field_id', { mode: 'number' }).default(0).notNull(),
        itemId: p.varchar('item_id', { length: 255 }).default('').notNull(),
        value: p.text('value'),
    },
    table => [p.index('fields_values_idx_field_id').on(table.fieldId), p.index('fields_values_idx_item_id').on(table.itemId)],
);

export type FieldsValue = typeof fieldsValuesTable.$inferSelect;
export type NewFieldsValue = typeof fieldsValuesTable.$inferInsert;
