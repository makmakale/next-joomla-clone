'use server';

import { eq } from 'drizzle-orm';

import { cmsConfigTable, db, usersTable } from '@/libraries/services/database';

const GLOBAL_CONFIG_KEY = 'global-config';

let installed = false;

export const checkInstalled = async () => {
    const [config] = await db
        .select({ params: cmsConfigTable.params })
        .from(cmsConfigTable)
        .where(eq(cmsConfigTable.key, GLOBAL_CONFIG_KEY));

    const hasGlobalConfig =
        Boolean(config?.params) && typeof config!.params === 'object' && Object.keys(config!.params as object).length > 0;

    if (!hasGlobalConfig) return false;

    const [user] = await db.select({ id: usersTable.id }).from(usersTable).limit(1);

    return Boolean(user);
};

export const isInstalled = async () => {
    if (installed) return true;

    installed = await checkInstalled();

    return installed;
};
