'use server';

import { eq } from 'drizzle-orm';

import { cmsConfigTable, db, dbErrorHandler, usersTable } from '@/libraries/services/database';

import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

const GLOBAL_CONFIG_KEY = 'global-config';

let installed = false;

export const getConfiguration = async () => {
    try {
        const [config] = await db
            .select({ params: cmsConfigTable.params })
            .from(cmsConfigTable)
            .where(eq(cmsConfigTable.key, GLOBAL_CONFIG_KEY));

        return (config?.params ?? {}) as Record<string, unknown>;
    } catch (err) {
        dbErrorHandler(err);
    }
};

export const checkInstalled = async () => {
    try {
        const config = await getConfiguration();

        const hasGlobalConfig = isObject(config) && !isEmpty(config);

        if (!hasGlobalConfig) return false;

        const [user] = await db.select({ id: usersTable.id }).from(usersTable).limit(1);

        return Boolean(user);
    } catch (err) {
        dbErrorHandler(err);

        return false;
    }
};

export const isInstalled = async () => {
    if (installed) return true;

    installed = await checkInstalled();

    return installed;
};
