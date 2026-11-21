'use server';

import { eq } from 'drizzle-orm';

import { db, extensionsTable, languagesTable } from '@/libraries/services/database';

import { transformExtension } from './Fakers/helpers';

async function downloadPackage(packageUrl: string) {
    try {
        // TODO: 1. download archive from {packageUrl}
        // TODO: 2. unzip it to tmp folder
        // TODO: 3. move files to site/admin languages
        // TODO: 4. add to DB

        await db
            .insert(extensionsTable)
            .values(
                transformExtension(
                    0,
                    'Russian (ru-RU) Language Pack',
                    'package',
                    'pkg_ru-RU',
                    '',
                    0,
                    1,
                    1,
                    1,
                    1,
                    '{"name":"Russian (ru-RU) Language Pack","type":"package","creationDate":"2025-11","author":"Russian Translation Team","copyright":"Copyright (C) 2005 - 2025 Open Source Matters, Inc.","authorEmail":"smart@joomlaportal.ru","authorUrl":"https:\\/\\/joomlaportal.ru","version":"6.0.1.1","description":"<h3 style=\'font-weight: 400\'>Joomla 6.0.1 Russian Language Pack<\\/h3><div style=\'font-weight: 400\'><p>\u041e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u043b\u043e\u043a\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f Joomla, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u0440\u0443\u0441\u0441\u043a\u043e\u044f\u0437\u044b\u0447\u043d\u044b\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e\u043c.<br>\u041c\u044b \u0440\u0430\u0434\u044b \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u043c \u0438 \u043f\u043e\u043c\u043e\u0449\u0438 \u0432 \u043b\u043e\u043a\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438 Joomla. \u0415\u0441\u043b\u0438 \u0432\u044b \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0438\u043b\u0438 \u043e\u0448\u0438\u0431\u043a\u0443 \u0438\u043b\u0438 \u0445\u043e\u0442\u0438\u0442\u0435 \u0432\u043d\u0435\u0441\u0442\u0438 \u0438\u0441\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0441\u043e\u0437\u0434\u0430\u0439\u0442\u0435 <a href=\'https:\\/\\/github.com\\/JPathRu\\/localisation\\/issues\\/new\' target=\'_blank\'>Issue<\\/a> \u043d\u0430 Github.<\\/p><ul><li><a href=\'https:\\/\\/joomlaportal.ru\' target=\'_blank\'>\u041f\u043e\u0440\u0442\u0430\u043b Joomla \u043f\u043e-\u0440\u0443\u0441\u0441\u043a\u0438<\\/a>,<\\/li><li><a href=\'https:\\/\\/joomlaforum.ru\' target=\'_blank\'>\u0424\u043e\u0440\u0443\u043c \u0440\u0443\u0441\u0441\u043a\u043e\u0439 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438 Joomla<\\/a>,<\\/li><li><a href=\'https:\\/\\/forum.joomla.org\\/viewforum.php?f=26\' target=\'_blank\'>\u041e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439 \u0444\u043e\u0440\u0443\u043c \u0440\u0443\u0441\u0441\u043a\u043e\u0439 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438 \u043d\u0430 Joomla.org<\\/a>,<\\/li><li><a href=\'https:\\/\\/joomlaportal.ru\\/russian-joomla\' target=\'_blank\'>\u041e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043b\u043e\u043a\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438<\\/a>,<\\/li><li><a href=\'https:\\/\\/t.me\\/joomlafeed\' target=\'_blank\'>\u041a\u0430\u043d\u0430\u043b \u043d\u043e\u0432\u043e\u0441\u0442\u0435\u0439 Joomla \u0432 Telegram<\\/a>,<\\/li><li><a href=\'https:\\/\\/t.me\\/joomlaru\' target=\'_blank\'>\u0427\u0430\u0442 Joomla \u043f\u043e-\u0440\u0443\u0441\u0441\u043a\u0438 \u0432 Telegram<\\/a>,<\\/li><li><a href=\'https:\\/\\/t.me\\/projoomla\' target=\'_blank\'>\u0427\u0430\u0442 Joomla \u0434\u043b\u044f \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u043e\u0432 \u0432 Telegram<\\/a>,<\\/li><li><a href=\'https:\\/\\/t.me\\/yoothemepro_joomla\' target=\'_blank\'>\u0427\u0430\u0442 Joomla YOOtheme Pro \u0432 Telegram<\\/a>.<\\/li><\\/ul><\\/div>","group":"","changelogurl":"","filename":"pkg_ru-RU"}',
                    '',
                    '',
                    0,
                    0,
                ),
            )
            .onConflictDoNothing();

        await db.transaction(async tx => {
            const [pkgRu] = await tx
                .select({ extension_id: extensionsTable.extensionId })
                .from(extensionsTable)
                .where(eq(extensionsTable.name, 'Russian (ru-RU) Language Pack'))
                .limit(1);

            if (!pkgRu) throw new Error('Package "Russian (ru-RU) Language Pack" not found');

            await tx
                .insert(extensionsTable)
                .values(
                    [0, 1, 3].map(client_id =>
                        transformExtension(
                            pkgRu.extension_id,
                            'Russian (ru-RU)',
                            'language',
                            'ru-RU',
                            '',
                            client_id,
                            1,
                            0,
                            0,
                            0,
                            '{"name":"Russian (ru-RU)","type":"language","creationDate":"2025-11","author":"Russian Translation Team","copyright":"Copyright (C) 2005 - 2025 Open Source Matters, Inc.","authorEmail":"smart@joomlaportal.ru","authorUrl":"https:\\/\\/joomlaportal.ru","version":"6.0.1","description":"<p>Russian language pack (administrator) for Joomla!<\\/p>","group":"","changelogurl":"","filename":"install"}',
                            '',
                            '',
                            0,
                            0,
                        ),
                    ),
                )
                .onConflictDoNothing();
        });

        await db.insert(languagesTable).values([
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

        return { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
}
