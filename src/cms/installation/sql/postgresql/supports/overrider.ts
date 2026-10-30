import * as p from 'drizzle-orm/pg-core';

export const overriderTable = p.pgTable('overrider', {
    id: p.serial('id').notNull().primaryKey(),
    constant: p.varchar('constant', { length: 255 }).notNull(),
    string: p.text('string').notNull(),
    file: p.varchar('file', { length: 255 }).notNull(),
});

export type Overrider = typeof overriderTable.$inferSelect;
export type NewOverrider = typeof overriderTable.$inferInsert;
