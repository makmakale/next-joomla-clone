import * as orm from 'drizzle-orm';

import { db, extensionsTable, templateStyles } from '@/libraries/services/database';

import type { Template } from '../types';

export async function getAdminTemplate(): Promise<Template> {
    const [template] = await db
        .select({
            template: templateStyles.template,
            params: templateStyles.params,
            inheritable: templateStyles.inheritable,
            parent: templateStyles.parent,
        })
        .from(templateStyles)
        .where(orm.and(orm.eq(templateStyles.clientId, 1), orm.eq(templateStyles.home, '1')))
        .leftJoin(
            extensionsTable,
            orm.and(
                orm.eq(extensionsTable.type, 'template'),
                orm.eq(extensionsTable.element, templateStyles.template),
                orm.eq(extensionsTable.clientId, templateStyles.clientId),
            ),
        )
        .orderBy(templateStyles.home);

    return template;
}
