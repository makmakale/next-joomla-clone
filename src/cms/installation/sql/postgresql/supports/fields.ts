import * as p from 'drizzle-orm/pg-core';

export const fieldsTable = p.pgTable(
    'fields',
    {
        id: p.serial('id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        context: p.varchar('context', { length: 255 }).default('').notNull(),
        groupId: p.bigint('group_id', { mode: 'number' }).default(0).notNull(),
        title: p.varchar('title', { length: 255 }).default('').notNull(),
        name: p.varchar('name', { length: 255 }).default('').notNull(),
        label: p.varchar('label', { length: 255 }).default('').notNull(),
        defaultValue: p.text('default_value'),
        type: p.varchar('type', { length: 255 }).default('text').notNull(),
        note: p.varchar('note', { length: 255 }).default('').notNull(),
        description: p.text('description').notNull(),
        state: p.smallint('state').default(0).notNull(),
        required: p.boolean('required').default(false).notNull(),
        onlyUseInSubform: p.boolean('only_use_in_subform').default(false).notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        params: p.jsonb('params').notNull().default({}),
        fieldparams: p.jsonb('fieldparams').notNull().default({}),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        createdTime: p.timestamp('created_time', { mode: 'date' }).notNull(),
        createdUserId: p.bigint('created_user_id', { mode: 'number' }).default(0).notNull(),
        modifiedTime: p.timestamp('modified_time', { mode: 'date' }).notNull(),
        modifiedBy: p.bigint('modified_by', { mode: 'number' }).default(0).notNull(),
        access: p.bigint('access', { mode: 'number' }).default(0).notNull(),
    },
    table => [
        p.index('fields_idx_checked_out').on(table.checkedOut),
        p.index('fields_idx_state').on(table.state),
        p.index('fields_idx_created_user_id').on(table.createdUserId),
        p.index('fields_idx_access').on(table.access),
        p.index('fields_idx_context').on(table.context),
        p.index('fields_idx_language').on(table.language),
    ],
);

export type Field = typeof fieldsTable.$inferSelect;
export type NewField = typeof fieldsTable.$inferInsert;
