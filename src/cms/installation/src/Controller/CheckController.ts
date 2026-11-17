'use server';

import type { NewUpdate } from '@/libraries/services/database';
import { db, updatesTable } from '@/libraries/services/database';

const fakeData: NewUpdate[] = [
    {
        updateId: 3667,
        updateSiteId: 2,
        extensionId: 0,
        name: 'English, USA',
        description: '',
        element: 'pkg_en-US',
        type: 'package',
        folder: '',
        clientId: 0,
        version: '6.2.0.1',
        data: '',
        detailsurl: 'https:\/\/update.joomla.org\/language\/details6\/en-US_details.xml',
        infourl: '',
        changelogurl: '',
        extraQuery: '',
    },
    {
        updateId: 3696,
        updateSiteId: 2,
        extensionId: 254,
        name: 'Russian',
        description: '',
        element: 'pkg_ru-RU',
        type: 'package',
        folder: '',
        clientId: 0,
        version: '6.2.0.1',
        data: '',
        detailsurl: 'https:\/\/update.joomla.org\/language\/details6\/ru-RU_details.xml',
        infourl: '',
        changelogurl: '',
        extraQuery: '',
    },
];

export async function loadUpdates() {
    try {
        const results = await db.select().from(updatesTable);
        if (results.length > 0) {
            return;
        }
        await db.insert(updatesTable).values(fakeData);
    } catch (e) {
        console.error(e);
    }
}
