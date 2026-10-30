import * as p from 'drizzle-orm/pg-core';

export const userUserGroupMapTable = p.pgTable(
    'user_usergroup_map',
    {
        userId: p.bigint('user_id', { mode: 'number' }).default(0).notNull(),
        groupId: p.bigint('group_id', { mode: 'number' }).default(0).notNull(),
    },
    table => [p.primaryKey({ columns: [table.userId, table.groupId] })],
);

export type UserUserGroupMap = typeof userUserGroupMapTable.$inferSelect;
export type NewUserUserGroupMap = typeof userUserGroupMapTable.$inferInsert;
