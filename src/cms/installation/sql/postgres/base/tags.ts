'use server';

import { db, tagsTable } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

export const seedTags = async () => {
    try {
        const now = new Date();

        await db.insert(tagsTable).values({
            id: 1,
            parentId: 0,
            lft: 0,
            rgt: 1,
            level: 0,
            path: '',
            title: 'ROOT',
            alias: 'root',
            note: '',
            description: '',
            published: 1,
            access: 1,
            metaDesc: '',
            metaKey: '',
            createdUserId: 42,
            createdTime: now,
            createdByAlias: '',
            modifiedUserId: 42,
            modifiedTime: now,
            hits: 0,
            language: '*',
            version: 1,
        });
        await resetSerial('tags', 'id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
