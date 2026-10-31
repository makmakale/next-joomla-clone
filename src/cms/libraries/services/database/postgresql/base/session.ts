import * as p from 'drizzle-orm/pg-core';

export const sessionTable = p.pgTable(
    'session',
    {
        sessionId: p.text('session_id').notNull().primaryKey(),
        clientId: p.smallint('client_id'),
        guest: p.boolean('guest').default(true),
        time: p.integer('time').default(0).notNull(),
        data: p.text('data'),
        userid: p.bigint('userid', { mode: 'number' }).default(0),
        username: p.varchar('username', { length: 150 }).default(''),
    },
    table => [
        p.index('session_userid').on(table.userid),
        p.index('session_time').on(table.time),
        p.index('session_idx_client_id_guest').on(table.clientId, table.guest),
    ],
);

export type Session = typeof sessionTable.$inferSelect;
export type NewSession = typeof sessionTable.$inferInsert;
