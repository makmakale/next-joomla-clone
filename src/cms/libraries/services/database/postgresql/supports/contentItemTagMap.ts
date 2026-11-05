import * as p from 'drizzle-orm/pg-core';

export const contentItemTagMapTable = p.pgTable(
    'contentitem_tag_map',
    {
        typeAlias: p.varchar('type_alias', { length: 255 }).default('').notNull(),
        coreContentId: p.integer('core_content_id').notNull(),
        contentItemId: p.integer('content_item_id').notNull(),
        tagId: p.integer('tag_id').notNull(),
        tagDate: p.timestamp('tag_date', { mode: 'date' }).default(new Date('1970-01-01T00:00:00Z')).notNull(),
        typeId: p.integer('type_id').notNull(),
    },
    table => [
        p.primaryKey({ columns: [table.typeId, table.contentItemId, table.tagId] }),
        p.index('contentitem_tag_map_idx_tag_type').on(table.tagId, table.typeId),
        p.index('contentitem_tag_map_idx_date_id').on(table.tagDate, table.tagId),
        p.index('contentitem_tag_map_idx_core_content_id').on(table.coreContentId),
    ],
);

export type ContentItemTagMap = typeof contentItemTagMapTable.$inferSelect;
export type NewContentItemTagMap = typeof contentItemTagMapTable.$inferInsert;
