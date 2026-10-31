import * as p from 'drizzle-orm/pg-core';

export const webAuthnCredentialsTable = p.pgTable(
    'webauthn_credentials',
    {
        id: p.varchar('id', { length: 1000 }).notNull().primaryKey(),
        userId: p.varchar('user_id', { length: 128 }).notNull(),
        label: p.varchar('label', { length: 190 }).notNull(),
        credential: p.jsonb('credential').notNull(),
    },
    table => [p.index('webauthn_credentials_user_id').on(table.userId)],
);

export type WebAuthnCredential = typeof webAuthnCredentialsTable.$inferSelect;
export type NewWebAuthnCredential = typeof webAuthnCredentialsTable.$inferInsert;
