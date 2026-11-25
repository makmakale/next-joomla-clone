'use server';

import * as orm from 'drizzle-orm';

import { db, extensionsTable, modulesTable } from '@/libraries/services/database';

export async function _load(moduleName: string) {
    const loader = async () =>
        await db
            .select({
                id: modulesTable.id,
                title: modulesTable.title,
                module: modulesTable.module,
                position: modulesTable.position,
                showTitle: modulesTable.showTitle,
                params: modulesTable.params,
            })
            .from(modulesTable)
            .leftJoin(
                extensionsTable,
                orm.and(
                    orm.eq(extensionsTable.element, modulesTable.module),
                    orm.eq(extensionsTable.clientId, modulesTable.clientId),
                ),
            )
            .where(
                orm.and(
                    orm.eq(modulesTable.module, moduleName),
                    orm.eq(modulesTable.clientId, 1),
                    orm.eq(extensionsTable.enabled, true),
                ),
            )
            .orderBy(modulesTable.position, modulesTable.ordering);

    // TODO
    try {
        return loader();
    } catch {
        return [];
    }
}
