import * as p from 'drizzle-orm/pg-core';

export const viewLevelsTable = p.pgTable(
    'viewlevels',
    {
        id: p.serial('id').notNull().primaryKey(),
        title: p.varchar('title', { length: 100 }).default('').notNull(),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        rules: p.jsonb('rules').notNull().default([]),
    },
    table => [p.uniqueIndex('viewlevels_idx_assetgroup_title_lookup').on(table.title)],
);

export type ViewLevel = typeof viewLevelsTable.$inferSelect;
export type NewViewLevel = typeof viewLevelsTable.$inferInsert;
