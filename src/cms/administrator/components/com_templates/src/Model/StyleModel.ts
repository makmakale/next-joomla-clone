'use server';

import { db, extensionsTable, templateStyles } from '@/libraries/services/database';
import { and, eq } from 'drizzle-orm';

export const getAdminTemplate = async () => {
    const [template] = await db
        .select({
            template: templateStyles.template,
            params: templateStyles.params,
            inheritable: templateStyles.inheritable,
            parent: templateStyles.parent,
        })
        .from(templateStyles)
        .where(and(eq(templateStyles.clientId, 1), eq(templateStyles.home, '1')))
        .leftJoin(
            extensionsTable,
            and(
                eq(extensionsTable.type, 'template'),
                eq(extensionsTable.element, templateStyles.template),
                eq(extensionsTable.clientId, templateStyles.clientId),
            ),
        )
        .orderBy(templateStyles.home);

    return template;
};

export const getSiteTemplates = async () => {
    const [template] = await db
        .select({
            id: templateStyles.id,
            home: templateStyles.home,
            template: templateStyles.template,
            params: templateStyles.params,
            inheritable: templateStyles.inheritable,
            parent: templateStyles.parent,
        })
        .from(templateStyles)
        .where(and(eq(templateStyles.clientId, 0), eq(templateStyles.home, '1')))
        .leftJoin(
            extensionsTable,
            and(
                eq(extensionsTable.enabled, true),
                eq(extensionsTable.element, templateStyles.template),
                eq(extensionsTable.type, 'template'),
                eq(extensionsTable.clientId, templateStyles.clientId),
            ),
        );

    return template;
};
