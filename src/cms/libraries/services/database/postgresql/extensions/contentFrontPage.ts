import * as p from 'drizzle-orm/pg-core';

export const contentFrontPageTable = p.pgTable('content_frontpage', {
    contentId: p.bigint('content_id', { mode: 'number' }).default(0).notNull().primaryKey(),
    ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
    featuredUp: p.timestamp('featured_up', { mode: 'date' }),
    featuredDown: p.timestamp('featured_down', { mode: 'date' }),
});

export type ContentFrontPage = typeof contentFrontPageTable.$inferSelect;
export type NewContentFrontPage = typeof contentFrontPageTable.$inferInsert;
