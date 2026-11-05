import * as p from 'drizzle-orm/pg-core';

export const schedulerLogsTable = p.pgTable(
    'scheduler_logs',
    {
        id: p.serial('id').notNull().primaryKey(),
        taskname: p.varchar('taskname', { length: 255 }).default('').notNull(),
        tasktype: p.varchar('tasktype', { length: 128 }).notNull(),
        duration: p.numeric('duration', { precision: 5, scale: 3 }).notNull(),
        jobid: p.integer('jobid').notNull(),
        taskid: p.integer('taskid').notNull(),
        exitcode: p.integer('exitcode').notNull(),
        lastdate: p.timestamp('lastdate', { mode: 'date' }),
        nextdate: p.timestamp('nextdate', { mode: 'date' }),
    },
    table => [
        p.index('scheduler_logs_idx_taskname').on(table.taskname),
        p.index('scheduler_logs_idx_tasktype').on(table.tasktype),
        p.index('scheduler_logs_idx_lastdate').on(table.lastdate),
        p.index('scheduler_logs_idx_nextdate').on(table.nextdate),
    ],
);

export type SchedulerLog = typeof schedulerLogsTable.$inferSelect;
export type NewSchedulerLog = typeof schedulerLogsTable.$inferInsert;
