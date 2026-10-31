import * as p from 'drizzle-orm/pg-core';

export const finderTokensAggregateTable = p.pgTable(
    'finder_tokens_aggregate',
    {
        termId: p.integer('term_id').notNull(),
        term: p.varchar('term', { length: 75 }).notNull(),
        stem: p.varchar('stem', { length: 75 }).default('').notNull(),
        common: p.boolean('common').default(false).notNull(),
        phrase: p.boolean('phrase').default(false).notNull(),
        termWeight: p.numeric('term_weight', { precision: 8, scale: 2 }).default('0').notNull(),
        context: p.smallint('context').default(2).notNull(),
        contextWeight: p.numeric('context_weight', { precision: 8, scale: 2 }).default('0').notNull(),
        totalWeight: p.numeric('total_weight', { precision: 8, scale: 2 }).default('0').notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
    },
    table => [
        p.index('finder_tokens_aggregate_token').on(table.term),
        p.index('finder_tokens_aggregate_keyword_id').on(table.termId),
    ],
);

export type FinderTokensAggregate = typeof finderTokensAggregateTable.$inferSelect;
export type NewFinderTokensAggregate = typeof finderTokensAggregateTable.$inferInsert;
