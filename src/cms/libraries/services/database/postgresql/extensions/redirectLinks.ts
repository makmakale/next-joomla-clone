import * as p from 'drizzle-orm/pg-core';

export const redirectLinksTable = p.pgTable(
    'redirect_links',
    {
        id: p.serial('id').notNull().primaryKey(),
        oldUrl: p.varchar('old_url', { length: 2048 }).notNull(),
        newUrl: p.varchar('new_url', { length: 2048 }),
        referer: p.varchar('referer', { length: 2048 }).notNull(),
        comment: p.varchar('comment', { length: 255 }).default('').notNull(),
        hits: p.bigint('hits', { mode: 'number' }).default(0).notNull(),
        published: p.boolean('published').notNull(),
        createdDate: p.timestamp('created_date', { mode: 'date' }).notNull(),
        modifiedDate: p.timestamp('modified_date', { mode: 'date' }).notNull(),
        header: p.integer('header').default(301).notNull(),
    },
    table => [
        p.index('redirect_links_idx_old_url').on(table.oldUrl),
        p.index('redirect_links_idx_link_modified').on(table.modifiedDate),
    ],
);

export type RedirectLink = typeof redirectLinksTable.$inferSelect;
export type NewRedirectLink = typeof redirectLinksTable.$inferInsert;
