import * as p from 'drizzle-orm/pg-core';

export const workflowStagesTable = p.pgTable(
    'workflow_stages',
    {
        id: p.serial('id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        workflowId: p.bigint('workflow_id', { mode: 'number' }).default(0).notNull(),
        published: p.smallint('published').default(0).notNull(),
        title: p.varchar('title', { length: 255 }).notNull(),
        description: p.text('description').notNull(),
        default: p.boolean('default').default(false).notNull(),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        checkedOut: p.integer('checked_out'),
    },
    table => [
        p.index('workflow_stages_idx_workflow_id').on(table.workflowId),
        p.index('workflow_stages_idx_title').on(table.title),
        p.index('workflow_stages_idx_asset_id').on(table.assetId),
        p.index('workflow_stages_idx_default').on(table.default),
        p.index('workflow_stages_idx_checked_out').on(table.checkedOut),
    ],
);

export type WorkflowStage = typeof workflowStagesTable.$inferSelect;
export type NewWorkflowStage = typeof workflowStagesTable.$inferInsert;
