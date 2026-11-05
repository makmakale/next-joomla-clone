import * as p from 'drizzle-orm/pg-core';

export const contentRatingTable = p.pgTable('content_rating', {
    contentId: p.bigint('content_id', { mode: 'number' }).default(0).notNull().primaryKey(),
    ratingSum: p.bigint('rating_sum', { mode: 'number' }).default(0).notNull(),
    ratingCount: p.bigint('rating_count', { mode: 'number' }).default(0).notNull(),
    lastip: p.varchar('lastip', { length: 50 }).default('').notNull(),
});

export type ContentRating = typeof contentRatingTable.$inferSelect;
export type NewContentRating = typeof contentRatingTable.$inferInsert;
