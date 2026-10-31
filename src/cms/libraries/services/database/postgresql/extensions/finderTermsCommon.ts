import * as p from 'drizzle-orm/pg-core';

export const finderTermsCommonTable = p.pgTable(
    'finder_terms_common',
    {
        term: p.varchar('term', { length: 75 }).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        custom: p.boolean('custom').default(false).notNull(),
    },
    table => [
        p.uniqueIndex('finder_terms_common_idx_term_language').on(table.term, table.language),
        p.index('finder_terms_common_idx_lang').on(table.language),
    ],
);

export type FinderTermsCommon = typeof finderTermsCommonTable.$inferSelect;
export type NewFinderTermsCommon = typeof finderTermsCommonTable.$inferInsert;
