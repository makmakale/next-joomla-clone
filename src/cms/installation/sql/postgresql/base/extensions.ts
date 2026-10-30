import * as p from 'drizzle-orm/pg-core';

export const extensionsTable = p.pgTable(
    'extensions',
    {
        extensionId: p.serial('extension_id').notNull().primaryKey(),
        packageId: p.bigint('package_id', { mode: 'number' }).default(0).notNull(),
        name: p.varchar('name', { length: 100 }).notNull(),
        type: p.varchar('type', { length: 20 }).notNull(),
        element: p.varchar('element', { length: 100 }).notNull(),
        changelogUrl: p.text('changelogurl'),
        folder: p.varchar('folder', { length: 100 }).notNull(),
        clientId: p.smallint('client_id').notNull(),
        enabled: p.boolean('enabled').default(false).notNull(),
        access: p.bigint('access', { mode: 'number' }).default(1).notNull(),
        protected: p.boolean('protected').default(false).notNull(),
        locked: p.boolean('locked').default(false).notNull(),
        manifestCache: p.jsonb('manifest_cache').notNull().default({}),
        params: p.jsonb('params').notNull().default({}),
        customData: p.text('custom_data').notNull(),
        checkedOut: p.integer('checked_out'),
        checkedOutTime: p.timestamp('checked_out_time', { mode: 'date' }),
        ordering: p.bigint('ordering', { mode: 'number' }).default(0),
        state: p.bigint('state', { mode: 'number' }).default(0),
        note: p.varchar('note', { length: 255 }),
    },
    table => [
        p.index('extensions_element_clientid').on(table.element, table.clientId),
        p.index('extensions_element_folder_clientid').on(table.element, table.folder, table.clientId),
        p.index('extensions_extension').on(table.type, table.element, table.folder, table.clientId),
    ],
);

export type Extension = typeof extensionsTable.$inferSelect;
export type NewExtension = typeof extensionsTable.$inferInsert;
