import * as p from 'drizzle-orm/pg-core';

export const finderTokensTable = p.pgTable(
    'finder_tokens',
    {
        term: p.varchar('term', { length: 75 }).notNull(),
        stem: p.varchar('stem', { length: 75 }).default('').notNull(),
        common: p.boolean('common').default(false).notNull(),
        phrase: p.boolean('phrase').default(false).notNull(),
        weight: p.numeric('weight', { precision: 8, scale: 2 }).default('1').notNull(),
        context: p.smallint('context').default(2).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
    },
    table => [
        p.index('finder_tokens_idx_word').on(table.term),
        p.index('finder_tokens_idx_stem').on(table.stem),
        p.index('finder_tokens_idx_context').on(table.context),
        p.index('finder_tokens_idx_language').on(table.language),
    ],
);

export type FinderToken = typeof finderTokensTable.$inferSelect;
export type NewFinderToken = typeof finderTokensTable.$inferInsert;
