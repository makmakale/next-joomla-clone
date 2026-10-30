import * as p from 'drizzle-orm/pg-core';

export const postInstallMessagesTable = p.pgTable('postinstall_messages', {
    postinstallMessageId: p.serial('postinstall_message_id').notNull().primaryKey(),
    extensionId: p.bigint('extension_id', { mode: 'number' }).default(700).notNull(),
    titleKey: p.varchar('title_key', { length: 255 }).default('').notNull(),
    descriptionKey: p.varchar('description_key', { length: 255 }).default('').notNull(),
    actionKey: p.varchar('action_key', { length: 255 }).default('').notNull(),
    languageExtension: p.varchar('language_extension', { length: 255 }).default('com_postinstall').notNull(),
    languageClientId: p.smallint('language_client_id').default(1).notNull(),
    type: p.varchar('type', { length: 10 }).default('link').notNull(),
    actionFile: p.varchar('action_file', { length: 255 }).default(''),
    action: p.varchar('action', { length: 255 }).default(''),
    conditionFile: p.varchar('condition_file', { length: 255 }),
    conditionMethod: p.varchar('condition_method', { length: 255 }),
    versionIntroduced: p.varchar('version_introduced', { length: 255 }).default('3.2.0').notNull(),
    enabled: p.boolean('enabled').default(true).notNull(),
});

export type PostInstallMessage = typeof postInstallMessagesTable.$inferSelect;
export type NewPostInstallMessage = typeof postInstallMessagesTable.$inferInsert;
