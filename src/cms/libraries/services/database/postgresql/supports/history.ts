import * as p from 'drizzle-orm/pg-core';

export const historyTable = p.pgTable(
    'history',
    {
        versionId: p.serial('version_id').notNull().primaryKey(),
        itemId: p.varchar('item_id', { length: 50 }).notNull(),
        versionNote: p.varchar('version_note', { length: 255 }).default('').notNull(),
        saveDate: p.timestamp('save_date', { mode: 'date', withTimezone: true }).notNull(),
        editorUserId: p.integer('editor_user_id').default(0).notNull(),
        characterCount: p.integer('character_count').default(0).notNull(),
        sha1Hash: p.varchar('sha1_hash', { length: 50 }).default('').notNull(),
        versionData: p.jsonb('version_data').notNull().default({}),
        keepForever: p.boolean('keep_forever').default(false).notNull(),
        isCurrent: p.boolean('is_current').default(false).notNull(),
        isLegacy: p.boolean('is_legacy').default(false).notNull(),
    },
    table => [p.index('history_idx_ucm_item_id').on(table.itemId), p.index('history_idx_save_date').on(table.saveDate)],
);

export type History = typeof historyTable.$inferSelect;
export type NewHistory = typeof historyTable.$inferInsert;
