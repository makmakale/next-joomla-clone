import * as p from 'drizzle-orm/pg-core';

export const finderLoggingTable = p.pgTable(
    'finder_logging',
    {
        searchterm: p.varchar('searchterm', { length: 255 }).default('').notNull(),
        md5sum: p.varchar('md5sum', { length: 32 }).default('').notNull().primaryKey(),
        query: p.text('query').notNull(),
        hits: p.integer('hits').default(1).notNull(),
        results: p.integer('results').default(0).notNull(),
    },
    table => [p.index('finder_logging_idx_searchterm').on(table.searchterm)],
);

export type FinderLogging = typeof finderLoggingTable.$inferSelect;
export type NewFinderLogging = typeof finderLoggingTable.$inferInsert;
