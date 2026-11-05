import * as p from 'drizzle-orm/pg-core';

export const categoriesTable = p.pgTable(
    'categories',
    {
        id: p.serial('id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        parentId: p.integer('parent_id').default(0).notNull(),
        lft: p.bigint('lft', { mode: 'number' }).default(0).notNull(),
        rgt: p.bigint('rgt', { mode: 'number' }).default(0).notNull(),
        level: p.integer('level').default(0).notNull(),
        path: p.varchar('path', { length: 255 }).default('').notNull(),
        extension: p.varchar('extension', { length: 50 }).default('').notNull(),
        title: p.varchar('title', { length: 255 }).default('').notNull(),
        alias: p.varchar('alias', { length: 255 }).default('').notNull(),
        note: p.varchar('note', { length: 255 }).default('').notNull(),
        description: p.text('description'),
        published: p.smallint('published').default(0).notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        access: p.bigint('access', { mode: 'number' }).default(0).notNull(),
        params: p.jsonb('params'),
        metadesc: p.varchar('metadesc', { length: 1024 }).default('').notNull(),
        metakey: p.varchar('metakey', { length: 1024 }).default('').notNull(),
        metadata: p.jsonb('metadata').notNull().default({}),
        createdUserId: p.integer('created_user_id').default(0).notNull(),
        createdTime: p.timestamp('created_time', { mode: 'date' }).notNull(),
        modifiedUserId: p.integer('modified_user_id').default(0).notNull(),
        modifiedTime: p.timestamp('modified_time', { mode: 'date' }).notNull(),
        hits: p.integer('hits').default(0).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        version: p.bigint('version', { mode: 'number' }).default(1).notNull(),
    },
    table => [
        p.index('categories_cat_idx').on(table.extension, table.published, table.access),
        p.index('categories_idx_access').on(table.access),
        p.index('categories_idx_checkout').on(table.checkedOut),
        p.index('categories_idx_path').on(table.path),
        p.index('categories_idx_left_right').on(table.lft, table.rgt),
        p.index('categories_idx_alias').on(table.alias),
        p.index('categories_idx_language').on(table.language),
    ],
);

export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;
