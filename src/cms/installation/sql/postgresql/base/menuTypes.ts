import * as p from 'drizzle-orm/pg-core';

export const menuTypesTable = p.pgTable(
    'menu_types',
    {
        id: p.serial('id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        menutype: p.varchar('menutype', { length: 24 }).notNull(),
        title: p.varchar('title', { length: 48 }).notNull(),
        description: p.varchar('description', { length: 255 }).default('').notNull(),
        clientId: p.integer('client_id').default(0).notNull(),
        ordering: p.integer('ordering').default(0).notNull(),
    },
    table => [p.uniqueIndex('menu_types_idx_menutype').on(table.menutype)],
);

export type MenuType = typeof menuTypesTable.$inferSelect;
export type NewMenuType = typeof menuTypesTable.$inferInsert;
