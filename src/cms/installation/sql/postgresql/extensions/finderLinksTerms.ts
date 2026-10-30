import * as p from 'drizzle-orm/pg-core';

export const finderLinksTermsTable = p.pgTable(
    'finder_links_terms',
    {
        linkId: p.integer('link_id').notNull(),
        termId: p.integer('term_id').notNull(),
        weight: p.numeric('weight', { precision: 8, scale: 2 }).default('0').notNull(),
    },
    table => [
        p.primaryKey({ columns: [table.linkId, table.termId] }),
        p.index('finder_links_terms_idx_term_weight').on(table.termId, table.weight),
        p.index('finder_links_terms_idx_link_term_weight').on(table.linkId, table.termId, table.weight),
    ],
);

export type FinderLinksTerm = typeof finderLinksTermsTable.$inferSelect;
export type NewFinderLinksTerm = typeof finderLinksTermsTable.$inferInsert;
