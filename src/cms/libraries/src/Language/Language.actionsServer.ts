'use server';

import { and, eq } from 'drizzle-orm';
import fs from 'node:fs';
import path from 'node:path';

import { db, extensionsTable } from '@/libraries/services/database';
import type { InstalledLanguageWithMetadata, LanguageMetadata } from '@/libraries/src/Language/Language.types';

export const loadLanguageFile = async (clientId: number, locale: string, langPath: string) => {
    const clientPath = clientId === 0 ? '' : 'administrator';
    const modLangFile = getLanguagePath(clientPath, locale) + `/${langPath}.json`;

    return parseJsonLanguageFile(modLangFile);
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
        if (processMetaData || processManifest) {
            const clientPath = clientId === 0 ? '' : 'administrator';
            const metafile = getLanguagePath(clientPath, language.element) + '/langmetadata.json';

            if (processMetaData) {
                language = {
                    ...language,
                    metadata: parseJsonLanguageFile(metafile)?.metadata ?? { tag: language.element, nativeName: language.name },
                } as InstalledLanguageWithMetadata;
            }
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

function getLanguagePath(basePath: string = '', language: string) {
    return path.join(process.cwd(), 'src/cms', basePath, 'language', language);
}

function parseJsonLanguageFile(metafile: string) {
    if (!fs.existsSync(metafile)) {
        console.error('File not found or not readable');

        return undefined;
    }

    try {
        const json = fs.readFileSync(path.join(metafile), 'utf-8');

        return JSON.parse(json);
    } catch {
        return undefined;
    }
}
