'use server';

import { db, languagesTable } from '@/libraries/services/database';

import { resetSerial } from '../../resetSerial';

export const seedLanguages = async () => {
    try {
        await db.insert(languagesTable).values([
            {
                langId: 1,
                langCode: 'en-GB',
                title: 'English (en-GB)',
                titleNative: 'English (United Kingdom)',
                sef: 'en',
                image: 'en_gb',
                description: '',
                metaKey: '',
                metaDesc: '',
                published: 1,
                access: 1,
                ordering: 1,
            },
            {
                langId: 2,
                langCode: 'ru-RU',
                title: 'Russian (ru-RU)',
                titleNative: 'Русский (Россия)',
                sef: 'ru',
                image: 'ru_ru',
                description: '',
                metaKey: '',
                metaDesc: '',
                published: 1,
                access: 1,
                ordering: 2,
            },
        ]);
        await resetSerial('languages', 'lang_id');

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
