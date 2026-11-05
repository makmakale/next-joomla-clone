import * as p from 'drizzle-orm/pg-core';

export const usersTable = p.pgTable(
    'users',
    {
        id: p.serial('id').notNull().primaryKey(),
        name: p.varchar('name', { length: 255 }).default('').notNull(),
        username: p.varchar('username', { length: 150 }).default('').notNull(),
        email: p.varchar('email', { length: 100 }).default('').notNull(),
        password: p.varchar('password', { length: 100 }).default('').notNull(),
        block: p.boolean('block').default(false).notNull(),
        sendEmail: p.boolean('sendEmail').default(false),
        registerDate: p.timestamp('registerDate', { mode: 'date' }).notNull(),
        lastvisitDate: p.timestamp('lastvisitDate', { mode: 'date' }),
        activation: p.varchar('activation', { length: 100 }).default('').notNull(),
        params: p.jsonb('params').notNull().default({}),
        lastResetTime: p.timestamp('lastResetTime', { mode: 'date' }),
        resetCount: p.bigint('resetCount', { mode: 'number' }).default(0).notNull(),
        otpKey: p.varchar('otpKey', { length: 1000 }).default('').notNull(),
        otep: p.varchar('otep', { length: 1000 }).default('').notNull(),
        requireReset: p.boolean('requireReset').default(false),
        authProvider: p.varchar('authProvider', { length: 100 }).default('').notNull(),
    },
    table => [
        p.uniqueIndex('users_idx_username').on(table.username),
        p.index('users_idx_name').on(table.name),
        p.index('users_idx_block').on(table.block),
        p.index('users_email').on(table.email),
    ],
);

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
