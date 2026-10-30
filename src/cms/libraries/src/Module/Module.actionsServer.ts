'use server';

import { and, eq, inArray } from 'drizzle-orm';

import { db, extensionsTable, modulesTable } from '@/libraries/services/database';
import { getAdminSession } from '@/libraries/src/Session';

export async function getModuleList(clientId: number) {
    const session = await getAdminSession();
    const groups = session ? [1, 3] : [1]; //TODO

    return db
        .select({
            id: modulesTable.id,
            title: modulesTable.title,
            module: modulesTable.module,
            position: modulesTable.position,
            content: modulesTable.content,
            showTitle: modulesTable.showTitle,
            params: modulesTable.params,
            // 'mm.menuid': modulesTable.menuid
        })
        .from(modulesTable)
        .leftJoin(
            extensionsTable,
            and(eq(extensionsTable.element, modulesTable.module), eq(extensionsTable.clientId, modulesTable.clientId)),
        )
        .where(
            and(
                eq(modulesTable.published, true),
                eq(extensionsTable.enabled, true),
                eq(modulesTable.clientId, clientId),
                inArray(modulesTable.access, groups),
            ),
        )
        .orderBy(modulesTable.position, modulesTable.ordering);

    // TODO: menu
    // TODO: access
    // TODO: language
}
