import * as p from 'drizzle-orm/pg-core';

export const tufMetadataTable = p.pgTable('tuf_metadata', {
    id: p.serial('id').notNull().primaryKey(),
    updateSiteId: p.bigint('update_site_id', { mode: 'number' }).default(0).notNull(),
    root: p.jsonb('root'),
    targets: p.jsonb('targets'),
    snapshot: p.jsonb('snapshot'),
    timestamp: p.jsonb('timestamp'),
    mirrors: p.jsonb('mirrors'),
});

export type TufMetadata = typeof tufMetadataTable.$inferSelect;
export type NewTufMetadata = typeof tufMetadataTable.$inferInsert;
