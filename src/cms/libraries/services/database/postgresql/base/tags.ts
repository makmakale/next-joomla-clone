import * as p from 'drizzle-orm/pg-core';

export const tagsTable = p.pgTable(
    'tags',
    {
        id: p.serial('id').notNull().primaryKey(),
        parentId: p.bigint('parent_id', { mode: 'number' }).default(0).notNull(),
        lft: p.bigint('lft', { mode: 'number' }).default(0).notNull(),
        rgt: p.bigint('rgt', { mode: 'number' }).default(0).notNull(),
        level: p.integer('level').default(0).notNull(),
        path: p.varchar('path', { length: 255 }).default('').notNull(),
        title: p.varchar('title', { length: 255 }).notNull(),
        alias: p.varchar('alias', { length: 255 }).default('').notNull(),
        note: p.varchar('note', { length: 255 }).default('').notNull(),
        description: p.text('description').notNull(),
        published: p.smallint('published').default(0).notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        access: p.bigint('access', { mode: 'number' }).default(0).notNull(),
        params: p.jsonb('params').notNull().default({}),
        metadesc: p.varchar('metadesc', { length: 1024 }).notNull(),
        metakey: p.varchar('metakey', { length: 1024 }).default('').notNull(),
        metadata: p.jsonb('metadata').notNull().default({}),
        createdUserId: p.integer('created_user_id').default(0).notNull(),
        createdTime: p.timestamp('created_time', { mode: 'date' }).notNull(),
        createdByAlias: p.varchar('created_by_alias', { length: 255 }).default('').notNull(),
        modifiedUserId: p.integer('modified_user_id').default(0).notNull(),
        modifiedTime: p.timestamp('modified_time', { mode: 'date' }).notNull(),
        images: p.jsonb('images').notNull().default({}),
        urls: p.jsonb('urls').notNull().default({}),
        hits: p.integer('hits').default(0).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        version: p.bigint('version', { mode: 'number' }).default(1).notNull(),
        publishUp: p.timestamp('publish_up', { mode: 'date' }),
        publishDown: p.timestamp('publish_down', { mode: 'date' }),
    },
    table => [
        p.index('tags_cat_idx').on(table.published, table.access),
        p.index('tags_idx_access').on(table.access),
        p.index('tags_idx_checkout').on(table.checkedOut),
        p.index('tags_idx_path').on(table.path),
        p.index('tags_idx_left_right').on(table.lft, table.rgt),
        p.index('tags_idx_alias').on(table.alias),
        p.index('tags_idx_language').on(table.language),
    ],
);

export type Tag = typeof tagsTable.$inferSelect;
export type NewTag = typeof tagsTable.$inferInsert;
