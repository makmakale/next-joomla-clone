import * as p from 'drizzle-orm/pg-core';

export const updateSitesTable = p.pgTable('update_sites', {
    updateSiteId: p.serial('update_site_id').notNull().primaryKey(),
    name: p.varchar('name', { length: 100 }).default(''),
    type: p.varchar('type', { length: 20 }).default(''),
    location: p.text('location').notNull(),
    enabled: p.boolean('enabled').default(false),
    lastCheckTimestamp: p.bigint('last_check_timestamp', { mode: 'number' }).default(0),
    extraQuery: p.varchar('extra_query', { length: 1000 }).default(''),
    checkedOut: p.integer('checked_out'),
    checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
});

export type UpdateSite = typeof updateSitesTable.$inferSelect;
export type NewUpdateSite = typeof updateSitesTable.$inferInsert;
