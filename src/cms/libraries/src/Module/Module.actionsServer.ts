'use server';

import { db, extensionsTable, modulesTable } from '@/libraries/services/database';
import { and, eq } from 'drizzle-orm';

export async function getModuleList(clientId: number) {
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
        .where(and(eq(modulesTable.published, true), eq(extensionsTable.enabled, true), eq(modulesTable.clientId, clientId)));

    // TODO: menu
    // TODO: access
    // TODO: language
}
