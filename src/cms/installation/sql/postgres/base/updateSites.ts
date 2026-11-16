'use server';

import { db, updateSitesTable } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

export const seedUpdateSites = async () => {
    try {
        await db.insert(updateSitesTable).values([
            {
                updateSiteId: 1,
                name: 'Joomla! Core',
                type: 'tuf',
                location: 'https://update.joomla.org/cms/',
                enabled: true,
                lastCheckTimestamp: 0,
            },
            {
                updateSiteId: 2,
                name: 'Accredited Joomla! Translations',
                type: 'collection',
                location: 'https://update.joomla.org/language/translationlist_6.xml',
                enabled: true,
                lastCheckTimestamp: 0,
            },
            {
                updateSiteId: 3,
                name: 'Joomla! Update Component',
                type: 'extension',
                location: 'https://update.joomla.org/core/extensions/com_joomlaupdate.xml',
                enabled: true,
                lastCheckTimestamp: 0,
            },
        ]);
        await resetSerial('update_sites', 'update_site_id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
