import * as p from 'drizzle-orm/pg-core';

export const guidedToursTable = p.pgTable(
    'guidedtours',
    {
        id: p.serial('id').notNull().primaryKey(),
        title: p.varchar('title', { length: 255 }).default('').notNull(),
        uid: p.varchar('uid', { length: 255 }).default('').notNull(),
        description: p.text('description').notNull(),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        extensions: p.jsonb('extensions').notNull().default([]),
        url: p.varchar('url', { length: 255 }).notNull(),
        created: p.timestamp('created', { mode: 'date' }).notNull(),
        createdBy: p.bigint('created_by', { mode: 'number' }).default(0).notNull(),
        modified: p.timestamp('modified', { mode: 'date' }).notNull(),
        modifiedBy: p.bigint('modified_by', { mode: 'number' }).default(0).notNull(),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        checkedOut: p.integer('checked_out'),
        published: p.smallint('published').default(0).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        note: p.varchar('note', { length: 255 }).default('').notNull(),
        access: p.bigint('access', { mode: 'number' }).default(0).notNull(),
        autostart: p.integer('autostart').default(0).notNull(),
    },
    table => [
        p.index('guidedtours_idx_access').on(table.access),
        p.index('guidedtours_idx_state').on(table.published),
        p.index('guidedtours_idx_language').on(table.language),
        p.index('guidedtours_idx_uid').on(table.uid),
    ],
);

export type GuidedTour = typeof guidedToursTable.$inferSelect;
export type NewGuidedTour = typeof guidedToursTable.$inferInsert;
