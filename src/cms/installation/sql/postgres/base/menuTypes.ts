'use server';

import { db, menuTypesTable } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

export const seedMenuTypes = async () => {
    try {
        await db.insert(menuTypesTable).values({
            id: 1,
            assetId: 0,
            menuType: 'mainmenu',
            title: 'Main Menu',
            description: 'The main menu for the site',
            clientId: 0,
            ordering: 1,
        });
        await resetSerial('menu_types', 'id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
