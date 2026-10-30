import * as p from 'drizzle-orm/pg-core';

export const ucmBaseTable = p.pgTable(
    'ucm_base',
    {
        ucmId: p.serial('ucm_id').notNull().primaryKey(),
        ucmItemId: p.bigint('ucm_item_id', { mode: 'number' }).notNull(),
        ucmTypeId: p.bigint('ucm_type_id', { mode: 'number' }).notNull(),
        ucmLanguageId: p.bigint('ucm_language_id', { mode: 'number' }).notNull(),
    },
    table => [
        p.index('ucm_base_ucm_item_id').on(table.ucmItemId),
        p.index('ucm_base_ucm_type_id').on(table.ucmTypeId),
        p.index('ucm_base_ucm_language_id').on(table.ucmLanguageId),
    ],
);

export type UcmBase = typeof ucmBaseTable.$inferSelect;
export type NewUcmBase = typeof ucmBaseTable.$inferInsert;
