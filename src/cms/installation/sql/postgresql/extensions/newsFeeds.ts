import * as p from 'drizzle-orm/pg-core';

export const newsFeedsTable = p.pgTable(
    'newsfeeds',
    {
        catid: p.bigint('catid', { mode: 'number' }).default(0).notNull(),
        id: p.serial('id').notNull().primaryKey(),
        name: p.varchar('name', { length: 100 }).default('').notNull(),
        alias: p.varchar('alias', { length: 100 }).default('').notNull(),
        link: p.varchar('link', { length: 2048 }).default('').notNull(),
        published: p.smallint('published').default(0).notNull(),
        numarticles: p.bigint('numarticles', { mode: 'number' }).default(1).notNull(),
        cacheTime: p.bigint('cache_time', { mode: 'number' }).default(3600).notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        rtl: p.boolean('rtl').default(false).notNull(),
        access: p.bigint('access', { mode: 'number' }).default(0).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        params: p.jsonb('params').notNull().default({}),
        created: p.timestamp('created', { mode: 'date' }).notNull(),
        createdBy: p.integer('created_by').default(0).notNull(),
        createdByAlias: p.varchar('created_by_alias', { length: 255 }).default('').notNull(),
        modified: p.timestamp('modified', { mode: 'date' }).notNull(),
        modifiedBy: p.integer('modified_by').default(0).notNull(),
        metakey: p.text('metakey'),
        metadesc: p.text('metadesc').notNull(),
        metadata: p.jsonb('metadata').notNull().default({}),
        publishUp: p.timestamp('publish_up', { mode: 'date' }),
        publishDown: p.timestamp('publish_down', { mode: 'date' }),
        description: p.text('description').notNull(),
        version: p.bigint('version', { mode: 'number' }).default(1).notNull(),
        hits: p.bigint('hits', { mode: 'number' }).default(0).notNull(),
        images: p.jsonb('images').notNull().default({}),
    },
    table => [
        p.index('newsfeeds_idx_access').on(table.access),
        p.index('newsfeeds_idx_checkout').on(table.checkedOut),
        p.index('newsfeeds_idx_state').on(table.published),
        p.index('newsfeeds_idx_catid').on(table.catid),
        p.index('newsfeeds_idx_createdby').on(table.createdBy),
        p.index('newsfeeds_idx_language').on(table.language),
    ],
);

export type NewsFeed = typeof newsFeedsTable.$inferSelect;
export type NewNewsFeed = typeof newsFeedsTable.$inferInsert;
