import * as p from 'drizzle-orm/pg-core';

export const messagesCfgTable = p.pgTable(
    'messages_cfg',
    {
        userId: p.bigint('user_id', { mode: 'number' }).default(0).notNull(),
        cfgName: p.varchar('cfg_name', { length: 100 }).default('').notNull(),
        cfgValue: p.varchar('cfg_value', { length: 255 }).default('').notNull(),
    },
    table => [p.uniqueIndex('messages_cfg_idx_user_var_name').on(table.userId, table.cfgName)],
);

export type MessagesCfg = typeof messagesCfgTable.$inferSelect;
export type NewMessagesCfg = typeof messagesCfgTable.$inferInsert;
