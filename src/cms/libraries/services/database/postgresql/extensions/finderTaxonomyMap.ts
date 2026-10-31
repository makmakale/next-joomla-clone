import * as p from 'drizzle-orm/pg-core';

export const finderTaxonomyMapTable = p.pgTable(
    'finder_taxonomy_map',
    {
        linkId: p.integer('link_id').notNull(),
        nodeId: p.integer('node_id').notNull(),
    },
    table => [
        p.primaryKey({ columns: [table.linkId, table.nodeId] }),
        p.index('finder_taxonomy_map_link_id').on(table.linkId),
        p.index('finder_taxonomy_map_node_id').on(table.nodeId),
    ],
);

export type FinderTaxonomyMap = typeof finderTaxonomyMapTable.$inferSelect;
export type NewFinderTaxonomyMap = typeof finderTaxonomyMapTable.$inferInsert;
