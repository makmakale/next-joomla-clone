import * as p from 'drizzle-orm/pg-core';

export const workflowsTable = p.pgTable(
    'workflows',
    {
        id: p.serial('id').notNull().primaryKey(),
        assetId: p.bigint('asset_id', { mode: 'number' }).default(0).notNull(),
        published: p.smallint('published').default(0).notNull(),
        title: p.varchar('title', { length: 255 }).default('').notNull(),
        description: p.text('description').notNull(),
        extension: p.varchar('extension', { length: 50 }).notNull(),
        default: p.boolean('default').default(false).notNull(),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0).notNull(),
        created: p.timestamp('created', { mode: 'date' }).notNull(),
        createdBy: p.bigint('created_by', { mode: 'number' }).default(0).notNull(),
        modified: p.timestamp('modified', { mode: 'date' }).notNull(),
        modifiedBy: p.bigint('modified_by', { mode: 'number' }).default(0).notNull(),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        checkedOut: p.integer('checked_out'),
    },
    table => [
        p.index('workflows_idx_asset_id').on(table.assetId),
        p.index('workflows_idx_title').on(table.title),
        p.index('workflows_idx_extension').on(table.extension),
        p.index('workflows_idx_default').on(table.default),
        p.index('workflows_idx_created').on(table.created),
        p.index('workflows_idx_created_by').on(table.createdBy),
        p.index('workflows_idx_modified').on(table.modified),
        p.index('workflows_idx_modified_by').on(table.modifiedBy),
        p.index('workflows_idx_checked_out').on(table.checkedOut),
    ],
);

export type Workflow = typeof workflowsTable.$inferSelect;
export type NewWorkflow = typeof workflowsTable.$inferInsert;
