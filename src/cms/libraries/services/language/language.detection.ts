import { and, eq } from 'drizzle-orm';

import { db, extensionsTable } from '@/libraries/services/database';

export function parseAcceptLanguageTags(acceptLanguage: string): string[] {
    return acceptLanguage.match(/[a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?/g) ?? [];
}

export function matchInstalledLocale(tags: string[], installedLanguages: string[]): string {
    if (!tags.length || !installedLanguages.length) return '';

    for (const tag of tags) {
        const exact = installedLanguages.find(lang => lang.toLowerCase() === tag.toLowerCase());
        if (exact) return exact;
    }

    for (const tag of tags) {
        const base = tag.split('-')[0].toLowerCase();
        const partial = installedLanguages.find(lang => lang.split('-')[0].toLowerCase() === base);
        if (partial) return partial;
    }

    return '';
}

export async function getInstalledLanguageTags(clientId: number) {
    const res = await db
        .select({ element: extensionsTable.element })
        .from(extensionsTable)
        .where(
            and(
                eq(extensionsTable.type, 'language'),
                eq(extensionsTable.enabled, true),
                eq(extensionsTable.clientId, clientId),
            ),
        )
        .groupBy(extensionsTable.element);

    return res?.map(({ element }) => element) ?? [];
}

export async function detectLocale(clientId: number, acceptLanguage: string): Promise<string> {
    const tags = parseAcceptLanguageTags(acceptLanguage);
    const installedLanguages = await getInstalledLanguageTags(clientId);

    return matchInstalledLocale(tags, installedLanguages);
}
