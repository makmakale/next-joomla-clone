import * as p from 'drizzle-orm/pg-core';

export const privacyConsentsTable = p.pgTable(
    'privacy_consents',
    {
        id: p.serial('id').notNull().primaryKey(),
        userId: p.bigint('user_id', { mode: 'number' }).default(0).notNull(),
        state: p.smallint('state').default(1).notNull(),
        created: p.timestamp('created', { mode: 'date' }).notNull(),
        subject: p.varchar('subject', { length: 255 }).default('').notNull(),
        body: p.text('body').notNull(),
        remind: p.boolean('remind').default(false).notNull(),
        token: p.varchar('token', { length: 100 }).default('').notNull(),
    },
    table => [p.index('privacy_consents_idx_user_id').on(table.userId)],
);

export type PrivacyConsent = typeof privacyConsentsTable.$inferSelect;
export type NewPrivacyConsent = typeof privacyConsentsTable.$inferInsert;
