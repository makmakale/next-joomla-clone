import * as p from 'drizzle-orm/pg-core';

export const finderLinksTable = p.pgTable(
    'finder_links',
    {
        linkId: p.serial('link_id').notNull().primaryKey(),
        url: p.varchar('url', { length: 255 }).notNull(),
        route: p.varchar('route', { length: 400 }).notNull(),
        title: p.varchar('title', { length: 400 }),
        description: p.text('description'),
        indexdate: p.timestamp('indexdate', { mode: 'date' }).notNull(),
        md5sum: p.varchar('md5sum', { length: 32 }),
        published: p.boolean('published').default(true).notNull(),
        state: p.integer('state').default(1).notNull(),
        access: p.integer('access').default(0).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        publishStartDate: p.timestamp('publish_start_date', { mode: 'date' }),
        publishEndDate: p.timestamp('publish_end_date', { mode: 'date' }),
        startDate: p.timestamp('start_date', { mode: 'date' }),
        endDate: p.timestamp('end_date', { mode: 'date' }),
        listPrice: p.numeric('list_price', { precision: 8, scale: 2 }).default('0').notNull(),
        salePrice: p.numeric('sale_price', { precision: 8, scale: 2 }).default('0').notNull(),
        typeId: p.bigint('type_id', { mode: 'number' }).notNull(),
        object: p.text('object'),
    },
    table => [
        p.index('finder_links_idx_type').on(table.typeId),
        p.index('finder_links_idx_title').on(table.title),
        p.index('finder_links_idx_md5').on(table.md5sum),
        p.index('finder_links_idx_language').on(table.language),
        p.index('finder_links_idx_url').on(table.url),
        p
            .index('finder_links_idx_published_list')
            .on(table.published, table.state, table.access, table.publishStartDate, table.publishEndDate, table.listPrice),
        p
            .index('finder_links_idx_published_sale')
            .on(table.published, table.state, table.access, table.publishStartDate, table.publishEndDate, table.salePrice),
    ],
);

export type FinderLink = typeof finderLinksTable.$inferSelect;
export type NewFinderLink = typeof finderLinksTable.$inferInsert;
