import * as p from 'drizzle-orm/pg-core';

export const finderTermsTable = p.pgTable(
    'finder_terms',
    {
        termId: p.serial('term_id').notNull().primaryKey(),
        term: p.varchar('term', { length: 75 }).notNull(),
        stem: p.varchar('stem', { length: 75 }).default('').notNull(),
        common: p.boolean('common').default(false).notNull(),
        phrase: p.boolean('phrase').default(false).notNull(),
        weight: p.numeric('weight', { precision: 8, scale: 2 }).default('0').notNull(),
        soundex: p.varchar('soundex', { length: 75 }).default('').notNull(),
        links: p.integer('links').default(0).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
    },
    table => [
        p.uniqueIndex('finder_terms_idx_term_language').on(table.term, table.language),
        p.index('finder_terms_idx_term_phrase').on(table.term, table.phrase),
        p.index('finder_terms_idx_stem_phrase').on(table.stem, table.phrase),
        p.index('finder_terms_idx_soundex_phrase').on(table.soundex, table.phrase),
        p.index('finder_terms_idx_language').on(table.language),
    ],
);

export type FinderTerm = typeof finderTermsTable.$inferSelect;
export type NewFinderTerm = typeof finderTermsTable.$inferInsert;
