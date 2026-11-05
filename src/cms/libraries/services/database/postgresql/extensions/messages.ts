import * as p from 'drizzle-orm/pg-core';

export const messagesTable = p.pgTable(
    'messages',
    {
        messageId: p.serial('message_id').notNull().primaryKey(),
        userIdFrom: p.bigint('user_id_from', { mode: 'number' }).default(0).notNull(),
        userIdTo: p.bigint('user_id_to', { mode: 'number' }).default(0).notNull(),
        folderId: p.smallint('folder_id').default(0).notNull(),
        dateTime: p.timestamp('date_time', { mode: 'date' }).notNull(),
        state: p.smallint('state').default(0).notNull(),
        priority: p.smallint('priority').default(0).notNull(),
        subject: p.varchar('subject', { length: 255 }).default('').notNull(),
        message: p.text('message').notNull(),
    },
    table => [p.index('messages_useridto_state').on(table.userIdTo, table.state)],
);

export type Message = typeof messagesTable.$inferSelect;
export type NewMessage = typeof messagesTable.$inferInsert;
