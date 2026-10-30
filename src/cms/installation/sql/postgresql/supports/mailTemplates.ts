import * as p from 'drizzle-orm/pg-core';

export const mailTemplatesTable = p.pgTable(
    'mail_templates',
    {
        templateId: p.varchar('template_id', { length: 127 }).default('').notNull(),
        extension: p.varchar('extension', { length: 127 }).default('').notNull(),
        language: p.char('language', { length: 7 }).default('').notNull(),
        subject: p.varchar('subject', { length: 255 }).default('').notNull(),
        body: p.text('body').notNull(),
        htmlbody: p.text('htmlbody').notNull(),
        attachments: p.jsonb('attachments').notNull().default([]),
        params: p.jsonb('params').notNull().default({}),
    },
    table => [
        p.uniqueIndex('mail_templates_idx_template_id_language').on(table.templateId, table.language),
        p.index('mail_templates_idx_template_id').on(table.templateId),
        p.index('mail_templates_idx_language').on(table.language),
    ],
);

export type MailTemplate = typeof mailTemplatesTable.$inferSelect;
export type NewMailTemplate = typeof mailTemplatesTable.$inferInsert;
