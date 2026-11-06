import * as p from 'drizzle-orm/pg-core';

export const modulesMenuTable = p.pgTable(
    'modules_menu',
    {
        moduleId: p.bigint('moduleid', { mode: 'number' }).default(0).notNull(),
        menuId: p.bigint('menuid', { mode: 'number' }).default(0).notNull(),
    },
    table => [p.primaryKey({ columns: [table.moduleId, table.menuId] })],
);

export type ModulesMenu = typeof modulesMenuTable.$inferSelect;
export type NewModulesMenu = typeof modulesMenuTable.$inferInsert;
