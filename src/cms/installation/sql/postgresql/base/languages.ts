import * as p from 'drizzle-orm/pg-core';

export const languagesTable = p.pgTable(
    'languages',
    {
        langId: p.serial('lang_id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        langCode: p.varchar('lang_code', { length: 7 }).notNull(),
        title: p.varchar('title', { length: 50 }).notNull(),
        titleNative: p.varchar('title_native', { length: 50 }).notNull(),
        sef: p.varchar('sef', { length: 50 }).notNull(),
        image: p.varchar('image', { length: 50 }).notNull(),
        description: p.varchar('description', { length: 512 }).notNull(),
        metakey: p.text('metakey'),
        metadesc: p.text('metadesc').notNull(),
        sitename: p.varchar('sitename', { length: 1024 }).default('').notNull(),
        published: p.bigint('published', { mode: 'number' }).default(0).notNull(),
        access: p.integer('access').default(0).notNull(),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
    },
    table => [
        p.uniqueIndex('languages_idx_sef').on(table.sef),
        p.uniqueIndex('languages_idx_langcode').on(table.langCode),
        p.index('languages_idx_ordering').on(table.ordering),
        p.index('languages_idx_access').on(table.access),
    ],
);

export type Language = typeof languagesTable.$inferSelect;
export type NewLanguage = typeof languagesTable.$inferInsert;
