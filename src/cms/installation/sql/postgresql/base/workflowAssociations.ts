import * as p from 'drizzle-orm/pg-core';

export const workflowAssociationsTable = p.pgTable(
    'workflow_associations',
    {
        itemId: p.bigint('item_id', { mode: 'number' }).default(0).notNull(),
        stageId: p.bigint('stage_id', { mode: 'number' }).default(0).notNull(),
        extension: p.varchar('extension', { length: 50 }).notNull(),
    },
    table => [
        p.primaryKey({ columns: [table.itemId, table.extension] }),
        p.index('workflow_associations_idx_item_stage_extension').on(table.itemId, table.stageId, table.extension),
        p.index('workflow_associations_idx_item_id').on(table.itemId),
        p.index('workflow_associations_idx_stage_id').on(table.stageId),
        p.index('workflow_associations_idx_extension').on(table.extension),
    ],
);

export type WorkflowAssociation = typeof workflowAssociationsTable.$inferSelect;
export type NewWorkflowAssociation = typeof workflowAssociationsTable.$inferInsert;
