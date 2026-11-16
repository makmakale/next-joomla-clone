'use server';

import { eq } from 'drizzle-orm';

import { db, extensionsTable, updateSitesExtensionsTable } from '@/libraries/services/database';

// Mirrors the stock `INSERT ... SELECT ... FROM extensions WHERE name = X` — our curated
// extensions table doesn't carry any of these yet, so every link is expected to be skipped for now.
export const seedUpdateSitesExtensions = async () => {
    const LINKS = [
        { updateSiteId: 1, extensionName: 'files_joomla' },
        { updateSiteId: 2, extensionName: 'English (en-GB) Language Pack' },
        { updateSiteId: 3, extensionName: 'com_joomlaupdate' },
    ];

    try {
        const skipped: string[] = [];

        for (const link of LINKS) {
            const [extension] = await db
                .select({ extensionId: extensionsTable.extensionId })
                .from(extensionsTable)
                .where(eq(extensionsTable.name, link.extensionName));

            if (!extension) {
                skipped.push(link.extensionName);
                continue;
            }

            await db
                .insert(updateSitesExtensionsTable)
                .values({ updateSiteId: link.updateSiteId, extensionId: extension.extensionId });
        }

        return skipped.length > 0
            ? { success: true, message: `Пропущено (расширения не установлены): ${skipped.join(', ')}` }
            : { success: true };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
};
