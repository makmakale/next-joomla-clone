'use server';

import { db, extensionsTable } from '@/libraries/services/database';
import { and, eq } from 'drizzle-orm';

const defaultTemplates = {
    0: {
        element: 'cassiopeia',
        name: 'cassiopeia',
        enabled: true,
    },
    1: {
        element: 'atum',
        name: 'atum',
        enabled: true,
    },
} as const;

export async function getTemplates(clientId: number, state?: boolean, template?: string) {
    const [activeTemplate] = await db
        .select({
            element: extensionsTable.element,
            name: extensionsTable.name,
            enabled: extensionsTable.enabled,
        })
        .from(extensionsTable)
        .where(
            and(
                eq(extensionsTable.clientId, clientId),
                eq(extensionsTable.type, 'template'),
                state ? eq(extensionsTable.enabled, state) : undefined,
                template ? eq(extensionsTable.element, template) : undefined,
            ),
        );

    return activeTemplate ?? defaultTemplates[clientId as keyof typeof defaultTemplates];
}
