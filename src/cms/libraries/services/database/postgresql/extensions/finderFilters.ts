import * as p from 'drizzle-orm/pg-core';

export const finderFiltersTable = p.pgTable('finder_filters', {
    filterId: p.serial('filter_id').notNull().primaryKey(),
    title: p.varchar('title', { length: 255 }).notNull(),
    alias: p.varchar('alias', { length: 255 }).notNull(),
    state: p.smallint('state').default(1).notNull(),
    created: p.timestamp('created', { mode: 'date' }).notNull(),
    createdBy: p.integer('created_by').default(0).notNull(),
    createdByAlias: p.varchar('created_by_alias', { length: 255 }).default('').notNull(),
    modified: p.timestamp('modified', { mode: 'date' }).notNull(),
    modifiedBy: p.integer('modified_by').default(0).notNull(),
    checkedOut: p.integer('checked_out'),
    checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
    mapCount: p.integer('map_count').default(0).notNull(),
    data: p.jsonb('data'),
    params: p.jsonb('params'),
});

export type FinderFilter = typeof finderFiltersTable.$inferSelect;
export type NewFinderFilter = typeof finderFiltersTable.$inferInsert;
