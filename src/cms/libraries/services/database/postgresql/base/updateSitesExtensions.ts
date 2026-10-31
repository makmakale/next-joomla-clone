import * as p from 'drizzle-orm/pg-core';

export const updateSitesExtensionsTable = p.pgTable(
    'update_sites_extensions',
    {
        updateSiteId: p.bigint('update_site_id', { mode: 'number' }).default(0).notNull(),
        extensionId: p.bigint('extension_id', { mode: 'number' }).default(0).notNull(),
    },
    table => [p.primaryKey({ columns: [table.updateSiteId, table.extensionId] })],
);

export type UpdateSitesExtension = typeof updateSitesExtensionsTable.$inferSelect;
export type NewUpdateSitesExtension = typeof updateSitesExtensionsTable.$inferInsert;
