import * as p from 'drizzle-orm/pg-core';

export const userGroupsTable = p.pgTable(
    'usergroups',
    {
        id: p.serial('id').notNull().primaryKey(),
        parentId: p.bigint('parent_id', { mode: 'number' }).default(0).notNull(),
        lft: p.bigint('lft', { mode: 'number' }).default(0).notNull(),
        rgt: p.bigint('rgt', { mode: 'number' }).default(0).notNull(),
        title: p.varchar('title', { length: 100 }).default('').notNull(),
    },
    table => [
        p.uniqueIndex('usergroups_idx_usergroup_parent_title_lookup').on(table.parentId, table.title),
        p.index('usergroups_idx_usergroup_title_lookup').on(table.title),
        p.index('usergroups_idx_usergroup_adjacency_lookup').on(table.parentId),
        p.index('usergroups_idx_usergroup_nested_set_lookup').on(table.lft, table.rgt),
    ],
);

export type UserGroup = typeof userGroupsTable.$inferSelect;
export type NewUserGroup = typeof userGroupsTable.$inferInsert;
