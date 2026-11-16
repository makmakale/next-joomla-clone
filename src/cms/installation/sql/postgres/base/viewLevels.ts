'use server';

import { db, viewLevelsTable } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

export const seedViewLevels = async () => {
    try {
        await db.insert(viewLevelsTable).values([
            { id: 1, title: 'Public', ordering: 0, rules: [1] },
            { id: 2, title: 'Registered', ordering: 2, rules: [6, 2, 8] },
            { id: 3, title: 'Special', ordering: 3, rules: [6, 3, 8] },
            { id: 5, title: 'Guest', ordering: 1, rules: [9] },
            { id: 6, title: 'Super Users', ordering: 4, rules: [8] },
        ]);
        await resetSerial('viewlevels', 'id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
