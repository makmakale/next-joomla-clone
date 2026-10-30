import * as p from 'drizzle-orm/pg-core';

export const finderTypesTable = p.pgTable(
    'finder_types',
    {
        id: p.serial('id').notNull().primaryKey(),
        title: p.varchar('title', { length: 100 }).notNull(),
        mime: p.varchar('mime', { length: 100 }).default('').notNull(),
    },
    table => [p.uniqueIndex('finder_types_title').on(table.title)],
);

export type FinderType = typeof finderTypesTable.$inferSelect;
export type NewFinderType = typeof finderTypesTable.$inferInsert;
