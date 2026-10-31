import * as p from 'drizzle-orm/pg-core';

export const privacyRequestsTable = p.pgTable('privacy_requests', {
    id: p.serial('id').notNull().primaryKey(),
    email: p.varchar('email', { length: 100 }).default('').notNull(),
    requestedAt: p.timestamp('requested_at', { mode: 'date' }).notNull(),
    status: p.smallint('status').default(0).notNull(),
    requestType: p.varchar('request_type', { length: 25 }).default('').notNull(),
    confirmToken: p.varchar('confirm_token', { length: 100 }).default('').notNull(),
    confirmTokenCreatedAt: p.timestamp('confirm_token_created_at', { mode: 'date' }),
});

export type PrivacyRequest = typeof privacyRequestsTable.$inferSelect;
export type NewPrivacyRequest = typeof privacyRequestsTable.$inferInsert;
