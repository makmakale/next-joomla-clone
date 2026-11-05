import * as p from 'drizzle-orm/pg-core';

export const cmsConfigTable = p.pgTable('cms_config', {
    key: p.varchar('key', { length: 100 }).notNull().primaryKey(),
    params: p.jsonb('params').notNull().default({}),
});

export type CmsConfig = typeof cmsConfigTable.$inferSelect;
export type NewCmsConfig = typeof cmsConfigTable.$inferInsert;
