import * as p from 'drizzle-orm/pg-core';

export const modulesMenuTable = p.pgTable(
    'modules_menu',
    {
        moduleid: p.bigint('moduleid', { mode: 'number' }).default(0).notNull(),
        menuid: p.bigint('menuid', { mode: 'number' }).default(0).notNull(),
    },
    table => [p.primaryKey({ columns: [table.moduleid, table.menuid] })],
);

export type ModulesMenu = typeof modulesMenuTable.$inferSelect;
export type NewModulesMenu = typeof modulesMenuTable.$inferInsert;
