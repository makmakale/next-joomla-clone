'use server';

import { db, userGroupsTable } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

export const seedUserGroups = async () => {
    try {
        await db.insert(userGroupsTable).values([
            { id: 1, parentId: 0, lft: 1, rgt: 18, title: 'Public' },
            { id: 2, parentId: 1, lft: 8, rgt: 15, title: 'Registered' },
            { id: 3, parentId: 2, lft: 9, rgt: 14, title: 'Author' },
            { id: 4, parentId: 3, lft: 10, rgt: 13, title: 'Editor' },
            { id: 5, parentId: 4, lft: 11, rgt: 12, title: 'Publisher' },
            { id: 6, parentId: 1, lft: 4, rgt: 7, title: 'Manager' },
            { id: 7, parentId: 6, lft: 5, rgt: 6, title: 'Administrator' },
            { id: 8, parentId: 1, lft: 16, rgt: 17, title: 'Super Users' },
            { id: 9, parentId: 1, lft: 2, rgt: 3, title: 'Guest' },
        ]);
        await resetSerial('usergroups', 'id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
