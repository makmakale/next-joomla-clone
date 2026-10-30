import * as p from 'drizzle-orm/pg-core';

export const schedulerTasksTable = p.pgTable(
    'scheduler_tasks',
    {
        id: p.serial('id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        title: p.varchar('title', { length: 255 }).notNull(),
        type: p.varchar('type', { length: 128 }).notNull(),
        executionRules: p.jsonb('execution_rules'),
        cronRules: p.jsonb('cron_rules'),
        state: p.smallint('state').default(0).notNull(),
        lastExitCode: p.integer('last_exit_code').default(0).notNull(),
        lastExecution: p.timestamp('last_execution', { mode: 'date' }),
        nextExecution: p.timestamp('next_execution', { mode: 'date' }),
        timesExecuted: p.integer('times_executed').default(0).notNull(),
        timesFailed: p.integer('times_failed').default(0),
        locked: p.timestamp('locked', { mode: 'date' }),
        priority: p.smallint('priority').default(0).notNull(),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        cliExclusive: p.boolean('cli_exclusive').default(false).notNull(),
        params: p.jsonb('params').notNull().default({}),
        note: p.text('note'),
        created: p.timestamp('created', { mode: 'date' }).notNull(),
        createdBy: p.bigint('created_by', { mode: 'number' }).default(0).notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
    },
    table => [
        p.index('scheduler_tasks_idx_type').on(table.type),
        p.index('scheduler_tasks_idx_state').on(table.state),
        p.index('scheduler_tasks_idx_last_exit').on(table.lastExitCode),
        p.index('scheduler_tasks_idx_next_exec').on(table.nextExecution),
        p.index('scheduler_tasks_idx_locked').on(table.locked),
        p.index('scheduler_tasks_idx_priority').on(table.priority),
        p.index('scheduler_tasks_idx_cli_exclusive').on(table.cliExclusive),
        p.index('scheduler_tasks_idx_checked_out').on(table.checkedOut),
    ],
);

export type SchedulerTask = typeof schedulerTasksTable.$inferSelect;
export type NewSchedulerTask = typeof schedulerTasksTable.$inferInsert;
