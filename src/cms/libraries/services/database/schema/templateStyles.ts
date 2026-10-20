import * as p from 'drizzle-orm/pg-core';

export const templateStyles = p.pgTable(
    'template_styles',
    {
        id: p.serial('id').notNull().primaryKey(),
        template: p.varchar('template', { length: 50 }).default('').notNull(),
        clientId: p.smallint('client_id').default(0).notNull(),
        home: p.varchar('home', { length: 7 }).default('0').notNull(),
        title: p.varchar('title', { length: 255 }).default('').notNull(),
        inheritable: p.smallint('inheritable').default(0).notNull(),
        parent: p.varchar('parent', { length: 50 }).default(''),
        params: p.jsonb('params').notNull().default({}),
    },
    table => ({
        templateIdx: p.index('template_styles_idx_template').on(table.template),
        clientIdIdx: p.index('template_styles_idx_client_id').on(table.clientId),
        clientIdHomeIdx: p.index('template_styles_idx_client_id_home').on(table.clientId, table.home),
    }),
);

export type TemplateStyle = typeof templateStyles.$inferSelect;
export type NewTemplateStyle = typeof templateStyles.$inferInsert;
