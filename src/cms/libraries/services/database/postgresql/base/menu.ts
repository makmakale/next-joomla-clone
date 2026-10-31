import * as p from 'drizzle-orm/pg-core';

export const menuTable = p.pgTable(
    'menu',
    {
        id: p.serial('id').notNull().primaryKey(),
        menutype: p.varchar('menutype', { length: 24 }).notNull(),
        title: p.varchar('title', { length: 255 }).notNull(),
        alias: p.varchar('alias', { length: 255 }).notNull(),
        note: p.varchar('note', { length: 255 }).default('').notNull(),
        path: p.varchar('path', { length: 1024 }).default('').notNull(),
        link: p.varchar('link', { length: 1024 }).notNull(),
        type: p.varchar('type', { length: 16 }).notNull(),
        published: p.smallint('published').default(0).notNull(),
        parentId: p.integer('parent_id').default(1).notNull(),
        level: p.integer('level').default(0).notNull(),
        componentId: p.integer('component_id').default(0).notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        browserNav: p.smallint('browserNav').default(0).notNull(),
        access: p.bigint('access', { mode: 'number' }).default(0).notNull(),
        img: p.varchar('img', { length: 255 }).default('').notNull(),
        templateStyleId: p.integer('template_style_id').default(0).notNull(),
        params: p.jsonb('params').notNull().default({}),
        lft: p.bigint('lft', { mode: 'number' }).default(0).notNull(),
        rgt: p.bigint('rgt', { mode: 'number' }).default(0).notNull(),
        home: p.boolean('home').default(false).notNull(),
        language: p.varchar('language', { length: 7 }).default('').notNull(),
        clientId: p.smallint('client_id').default(0).notNull(),
        publishUp: p.timestamp('publish_up', { mode: 'date' }),
        publishDown: p.timestamp('publish_down', { mode: 'date' }),
    },
    table => [
        p
            .uniqueIndex('menu_idx_client_id_parent_id_alias_language')
            .on(table.clientId, table.parentId, table.alias, table.language),
        p.index('menu_idx_componentid').on(table.componentId, table.menutype, table.published, table.access),
        p.index('menu_idx_menutype').on(table.menutype),
        p.index('menu_idx_left_right').on(table.lft, table.rgt),
        p.index('menu_idx_alias').on(table.alias),
        p.index('menu_idx_path').on(table.path),
        p.index('menu_idx_language').on(table.language),
    ],
);

export type Menu = typeof menuTable.$inferSelect;
export type NewMenu = typeof menuTable.$inferInsert;
