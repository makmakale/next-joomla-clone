import * as p from 'drizzle-orm/pg-core';

export const bannerClientsTable = p.pgTable(
    'banner_clients',
    {
        id: p.serial('id').notNull().primaryKey(),
        name: p.varchar('name', { length: 255 }).default('').notNull(),
        contact: p.varchar('contact', { length: 255 }).default('').notNull(),
        email: p.varchar('email', { length: 255 }).default('').notNull(),
        extrainfo: p.text('extrainfo').notNull(),
        state: p.smallint('state').default(0).notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        metakey: p.text('metakey'),
        ownPrefix: p.boolean('own_prefix').default(false).notNull(),
        metakeyPrefix: p.varchar('metakey_prefix', { length: 255 }).default('').notNull(),
        purchaseType: p.smallint('purchase_type').default(-1).notNull(),
        trackClicks: p.smallint('track_clicks').default(-1).notNull(),
        trackImpressions: p.smallint('track_impressions').default(-1).notNull(),
    },
    table => [
        p.index('banner_clients_idx_own_prefix').on(table.ownPrefix),
        p.index('banner_clients_idx_metakey_prefix').on(table.metakeyPrefix),
    ],
);

export type BannerClient = typeof bannerClientsTable.$inferSelect;
export type NewBannerClient = typeof bannerClientsTable.$inferInsert;
