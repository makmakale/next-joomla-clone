import * as p from 'drizzle-orm/pg-core';

export const modulesTable = p.pgTable(
    'modules',
    {
        id: p.serial('id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        title: p.varchar('title', { length: 100 }).default('').notNull(),
        note: p.varchar('note', { length: 255 }).default('').notNull(),
        content: p.text('content'),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        position: p.varchar('position', { length: 50 }).default('').notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        publishUp: p.timestamp('publish_up', { mode: 'date' }),
        publishDown: p.timestamp('publish_down', { mode: 'date' }),
        published: p.boolean('published').default(false).notNull(),
        module: p.varchar('module', { length: 50 }).default('').notNull(),
        access: p.bigint('access', { mode: 'number' }).default(0).notNull(),
        showTitle: p.boolean('showtitle').default(true).notNull(),
        params: p.jsonb('params').notNull().default({}),
        clientId: p.smallint('client_id').default(0).notNull(),
        language: p.varchar('language', { length: 7 }).notNull(),
    },
    table => [
        p.index('modules_published').on(table.published, table.access),
        p.index('modules_newsfeeds').on(table.module, table.published),
        p.index('modules_idx_language').on(table.language),
    ],
);

export type Module = typeof modulesTable.$inferSelect;
export type NewModule = typeof modulesTable.$inferInsert;
