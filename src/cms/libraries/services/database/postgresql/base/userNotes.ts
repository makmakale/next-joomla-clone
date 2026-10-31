import * as p from 'drizzle-orm/pg-core';

export const userNotesTable = p.pgTable(
    'user_notes',
    {
        id: p.serial('id').notNull().primaryKey(),
        userId: p.integer('user_id').default(0).notNull(),
        catid: p.integer('catid').default(0).notNull(),
        subject: p.varchar('subject', { length: 100 }).default('').notNull(),
        body: p.text('body').notNull(),
        state: p.smallint('state').default(0).notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        createdUserId: p.integer('created_user_id').default(0).notNull(),
        createdTime: p.timestamp('created_time', { mode: 'date' }).notNull(),
        modifiedUserId: p.integer('modified_user_id').default(0).notNull(),
        modifiedTime: p.timestamp('modified_time', { mode: 'date' }).notNull(),
        reviewTime: p.timestamp('review_time', { mode: 'date' }),
        publishUp: p.timestamp('publish_up', { mode: 'date' }),
        publishDown: p.timestamp('publish_down', { mode: 'date' }),
    },
    table => [p.index('user_notes_idx_user_id').on(table.userId), p.index('user_notes_idx_category_id').on(table.catid)],
);

export type UserNote = typeof userNotesTable.$inferSelect;
export type NewUserNote = typeof userNotesTable.$inferInsert;
