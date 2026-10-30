import * as p from 'drizzle-orm/pg-core';

export const finderTaxonomyTable = p.pgTable(
    'finder_taxonomy',
    {
        id: p.serial('id').notNull().primaryKey(),
        parentId: p.integer('parent_id').default(0).notNull(),
        lft: p.integer('lft').default(0).notNull(),
        rgt: p.integer('rgt').default(0).notNull(),
        level: p.integer('level').default(0).notNull(),
        path: p.varchar('path', { length: 400 }).default('').notNull(),
        title: p.varchar('title', { length: 255 }).default('').notNull(),
        alias: p.varchar('alias', { length: 400 }).default('').notNull(),
        state: p.smallint('state').default(1).notNull(),
        access: p.smallint('access').default(1).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
    },
    table => [
        p.index('finder_taxonomy_state').on(table.state),
        p.index('finder_taxonomy_access').on(table.access),
        p.index('finder_taxonomy_path').on(table.path),
        p.index('finder_taxonomy_level').on(table.level),
        p.index('finder_taxonomy_lft_rgt').on(table.lft, table.rgt),
        p.index('finder_taxonomy_alias').on(table.alias),
        p.index('finder_taxonomy_language').on(table.language),
        p.index('finder_taxonomy_idx_parent_published').on(table.parentId, table.state, table.access),
    ],
);

export type FinderTaxonomy = typeof finderTaxonomyTable.$inferSelect;
export type NewFinderTaxonomy = typeof finderTaxonomyTable.$inferInsert;
