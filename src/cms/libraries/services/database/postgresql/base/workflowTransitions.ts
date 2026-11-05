import * as p from 'drizzle-orm/pg-core';

export const workflowTransitionsTable = p.pgTable(
    'workflow_transitions',
    {
        id: p.serial('id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        workflowId: p.bigint('workflow_id', { mode: 'number' }).default(0).notNull(),
        published: p.smallint('published').default(0).notNull(),
        title: p.varchar('title', { length: 255 }).notNull(),
        description: p.text('description').notNull(),
        fromStageId: p.bigint('from_stage_id', { mode: 'number' }).default(0).notNull(),
        toStageId: p.bigint('to_stage_id', { mode: 'number' }).default(0).notNull(),
        options: p.jsonb('options').notNull().default({}),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        checkedOut: p.integer('checked_out'),
    },
    table => [
        p.index('workflow_transitions_idx_title').on(table.title),
        p.index('workflow_transitions_idx_asset_id').on(table.assetId),
        p.index('workflow_transitions_idx_from_stage_id').on(table.fromStageId),
        p.index('workflow_transitions_idx_to_stage_id').on(table.toStageId),
        p.index('workflow_transitions_idx_workflow_id').on(table.workflowId),
        p.index('workflow_transitions_idx_checked_out').on(table.checkedOut),
    ],
);

export type WorkflowTransition = typeof workflowTransitionsTable.$inferSelect;
export type NewWorkflowTransition = typeof workflowTransitionsTable.$inferInsert;
