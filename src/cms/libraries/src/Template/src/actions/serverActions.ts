'use server';

import * as p from 'drizzle-orm';

import { db, extensionsTable, templateStyles } from '@/libraries/services/database';

export async function getSiteTemplate() {
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
        .where(p.and(p.eq(templateStyles.clientId, 0), p.eq(templateStyles.home, '1')))
        .leftJoin(
            extensionsTable,
            p.and(
                p.eq(extensionsTable.enabled, true),
                p.eq(extensionsTable.element, templateStyles.template),
                p.eq(extensionsTable.type, 'template'),
                p.eq(extensionsTable.clientId, templateStyles.clientId),
            ),
        );

    return template;
}

export async function getAdminTemplate() {
    const [template] = await db
        .select({
            template: templateStyles.template,
            params: templateStyles.params,
            inheritable: templateStyles.inheritable,
            parent: templateStyles.parent,
        })
        .from(templateStyles)
        .where(p.and(p.eq(templateStyles.clientId, 1), p.eq(templateStyles.home, '1')))
        .leftJoin(
            extensionsTable,
            p.and(
                p.eq(extensionsTable.type, 'template'),
                p.eq(extensionsTable.element, templateStyles.template),
                p.eq(extensionsTable.clientId, templateStyles.clientId),
            ),
        );

    return template;
}
