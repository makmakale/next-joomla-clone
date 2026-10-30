import * as p from 'drizzle-orm/pg-core';

export const assetsTable = p.pgTable(
    'assets',
    {
        id: p.serial('id').notNull().primaryKey(),
        parentId: p.bigint('parent_id', { mode: 'number' }).default(0).notNull(),
        lft: p.bigint('lft', { mode: 'number' }).default(0).notNull(),
        rgt: p.bigint('rgt', { mode: 'number' }).default(0).notNull(),
        level: p.integer('level').notNull(),
        name: p.varchar('name', { length: 50 }).notNull(),
        title: p.varchar('title', { length: 100 }).notNull(),
        rules: p.jsonb('rules').notNull().default({}),
    },
    table => [
        p.uniqueIndex('assets_idx_asset_name').on(table.name),
        p.index('assets_idx_lft_rgt').on(table.lft, table.rgt),
        p.index('assets_idx_parent_id').on(table.parentId),
    ],
);

export type Asset = typeof assetsTable.$inferSelect;
export type NewAsset = typeof assetsTable.$inferInsert;
