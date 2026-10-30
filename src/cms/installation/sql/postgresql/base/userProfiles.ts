import * as p from 'drizzle-orm/pg-core';

export const userProfilesTable = p.pgTable(
    'user_profiles',
    {
        userId: p.bigint('user_id', { mode: 'number' }).notNull(),
        profileKey: p.varchar('profile_key', { length: 100 }).notNull(),
        profileValue: p.text('profile_value').notNull(),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
    },
    table => [p.uniqueIndex('user_profiles_idx_user_id_profile_key').on(table.userId, table.profileKey)],
);

export type UserProfile = typeof userProfilesTable.$inferSelect;
export type NewUserProfile = typeof userProfilesTable.$inferInsert;
