'use server';

import { db, modulesMenuTable } from '@/libraries/services/database';

// "menuid: 0" is Joomla's convention for "assigned to all pages" — independent of which menu items actually exist.
const MODULE_IDS_ON_ALL_PAGES = [
    1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 79, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102,
    103, 104, 105, 106, 107, 108, 109,
];

export const seedModulesMenu = async () => {
    try {
        await db.insert(modulesMenuTable).values(MODULE_IDS_ON_ALL_PAGES.map(moduleId => ({ moduleId, menuId: 0 })));

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
