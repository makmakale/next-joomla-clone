import * as p from 'drizzle-orm/pg-core';

export const fieldsGroupsTable = p.pgTable(
    'fields_groups',
    {
        id: p.serial('id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        context: p.varchar('context', { length: 255 }).default('').notNull(),
        title: p.varchar('title', { length: 255 }).default('').notNull(),
        note: p.varchar('note', { length: 255 }).default('').notNull(),
        description: p.text('description').notNull(),
        state: p.smallint('state').default(0).notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        ordering: p.integer('ordering').default(0).notNull(),
        params: p.jsonb('params').notNull().default({}),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        created: p.timestamp('created', { mode: 'date' }).notNull(),
        createdBy: p.bigint('created_by', { mode: 'number' }).default(0).notNull(),
        modified: p.timestamp('modified', { mode: 'date' }).notNull(),
        modifiedBy: p.bigint('modified_by', { mode: 'number' }).default(0).notNull(),
        access: p.bigint('access', { mode: 'number' }).default(1).notNull(),
    },
    table => [
        p.index('fields_groups_idx_checked_out').on(table.checkedOut),
        p.index('fields_groups_idx_state').on(table.state),
        p.index('fields_groups_idx_created_by').on(table.createdBy),
        p.index('fields_groups_idx_access').on(table.access),
        p.index('fields_groups_idx_context').on(table.context),
        p.index('fields_groups_idx_language').on(table.language),
    ],
);

export type FieldsGroup = typeof fieldsGroupsTable.$inferSelect;
export type NewFieldsGroup = typeof fieldsGroupsTable.$inferInsert;
