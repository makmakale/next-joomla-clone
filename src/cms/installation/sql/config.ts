'use server';

import configurationDist from '@/cms/installation/configuration-dist';

import { cmsConfigTable, db } from '@/libraries/services/database';

const GLOBAL_CONFIG_KEY = 'global-config';

export const setGlobalConfig = async (siteName?: string) => {
    try {
        await db
            .insert(cmsConfigTable)
            .values({
                key: GLOBAL_CONFIG_KEY,
                params: {
                    ...configurationDist,
                    siteName: siteName,
                },
            })
            .onConflictDoNothing();

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
