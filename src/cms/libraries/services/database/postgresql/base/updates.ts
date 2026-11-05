import * as p from 'drizzle-orm/pg-core';

export const updatesTable = p.pgTable('updates', {
    updateId: p.serial('update_id').notNull().primaryKey(),
    updateSiteId: p.bigint('update_site_id', { mode: 'number' }).default(0),
    extensionId: p.bigint('extension_id', { mode: 'number' }).default(0),
    name: p.varchar('name', { length: 100 }).default(''),
    description: p.text('description').notNull(),
    element: p.varchar('element', { length: 100 }).default(''),
    type: p.varchar('type', { length: 20 }).default(''),
    folder: p.varchar('folder', { length: 20 }).default(''),
    clientId: p.smallint('client_id').default(0),
    version: p.varchar('version', { length: 32 }).default(''),
    data: p.text('data').notNull(),
    detailsurl: p.text('detailsurl').notNull(),
    infourl: p.text('infourl').notNull(),
    changelogurl: p.text('changelogurl'),
    extraQuery: p.varchar('extra_query', { length: 1000 }).default(''),
});

export type Update = typeof updatesTable.$inferSelect;
export type NewUpdate = typeof updatesTable.$inferInsert;
