'use server';

import { and, eq } from 'drizzle-orm';

import { db, extensionsTable } from '@/libraries/services/database';
import type { InstalledLanguageWithMetadata, LanguageMetadata } from '@/libraries/src/Language/Language.types';

export const loadLanguageFile = async (clientId: number, locale: string, langPath: string) => {
    try {
        return clientId === 1
            ? (await import(`@/cms/administrator/language/${locale}/${langPath}.json`)).default
            : (await import(`@/cms/language/${locale}/${langPath}.json`)).default;
    } catch {
        return undefined;
    }
};

export const getInstalledLanguages = async ({
    clientId,
    processMetaData = false,
    processManifest = false,
}: {
    clientId: number;
    processMetaData?: boolean;
    processManifest?: boolean;
}) => {
    const installedLanguages = await db
        .select({
            element: extensionsTable.element,
            name: extensionsTable.name,
            clientId: extensionsTable.clientId,
            extensionId: extensionsTable.extensionId,
        })
        .from(extensionsTable)
        .where(
            and(
                eq(extensionsTable.type, 'language'),
                eq(extensionsTable.state, 0),
                eq(extensionsTable.enabled, true),
                eq(extensionsTable.clientId, clientId),
            ),
        );

    const languages: InstalledLanguageWithMetadata[] = [];

    for (let language of installedLanguages) {
        if (processMetaData) {
            const metadata = await loadLanguageMetadata(clientId, language.element);

            language = {
                ...language,
                metadata: metadata?.metadata ?? { tag: language.element, nativeName: language.name },
            } as InstalledLanguageWithMetadata;
        }

        languages.push(language as InstalledLanguageWithMetadata);
    }

    return languages;
};

// TODO: caching
export const createLanguageList = async (clientId: number, caching: boolean = false, installed: boolean = false) => {
    const languages = installed
        ? await getInstalledLanguages({
              clientId,
              processMetaData: true,
          })
        : [];

    const list = [];

    for (const language of languages) {
        const metadata = (installed ? language.metadata : language) as LanguageMetadata; // TODO bad typing

        list.push({
            label: metadata.nativeName ?? metadata.name,
            value: metadata.tag,
        });
    }

    return list;
};

async function loadLanguageMetadata(clientId: number, language: string) {
    try {
        return clientId === 1
            ? (await import(`@/cms/administrator/language/${language}/langmetadata.json`)).default
            : (await import(`@/cms/language/${language}/langmetadata.json`)).default;
    } catch {
        return undefined;
    }
}
