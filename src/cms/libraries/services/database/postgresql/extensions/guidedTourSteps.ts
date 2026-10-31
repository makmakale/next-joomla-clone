import * as p from 'drizzle-orm/pg-core';

export const guidedTourStepsTable = p.pgTable(
    'guidedtour_steps',
    {
        id: p.serial('id').notNull().primaryKey(),
        tourId: p.bigint('tour_id', { mode: 'number' }).default(0).notNull(),
        title: p.varchar('title', { length: 255 }).notNull(),
        published: p.smallint('published').default(0).notNull(),
        description: p.text('description').notNull(),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        position: p.varchar('position', { length: 255 }).notNull(),
        target: p.varchar('target', { length: 255 }).notNull(),
        type: p.bigint('type', { mode: 'number' }).notNull(),
        interactiveType: p.bigint('interactive_type', { mode: 'number' }).default(1).notNull(),
        url: p.varchar('url', { length: 255 }).notNull(),
        created: p.timestamp('created', { mode: 'date' }).notNull(),
        createdBy: p.bigint('created_by', { mode: 'number' }).default(0).notNull(),
        modified: p.timestamp('modified', { mode: 'date' }).notNull(),
        modifiedBy: p.bigint('modified_by', { mode: 'number' }).default(0).notNull(),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        checkedOut: p.integer('checked_out'),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        note: p.varchar('note', { length: 255 }).default('').notNull(),
        params: p.jsonb('params'),
    },
    table => [
        p.index('guidedtour_steps_idx_tour_id').on(table.tourId),
        p.index('guidedtour_steps_idx_state').on(table.published),
        p.index('guidedtour_steps_idx_language').on(table.language),
    ],
);

export type GuidedTourStep = typeof guidedTourStepsTable.$inferSelect;
export type NewGuidedTourStep = typeof guidedTourStepsTable.$inferInsert;
