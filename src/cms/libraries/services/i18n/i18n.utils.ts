'use server';

import { cookies } from 'next/headers';

import fs from 'node:fs';
import path from 'node:path';
import { createTranslator } from 'use-intl/core';

import { getClientName } from '@/libraries/services/application';
import type { Locale } from '@/libraries/services/i18n/i18n.types';

export const getLocale = async (clientName: string): Promise<Locale | undefined> => {
    return (await cookies()).get(`web.locale.${clientName}`)?.value;
};

const DIRS: Record<string, string> = {
    Site: 'cms/language',
    Administrator: 'cms/administrator/language',
    Installation: 'cms/installation/language',
};

function tryReadMessages(clientName: string, locale: Locale, file?: string) {
    const filePath = path.join(process.cwd(), DIRS[clientName], locale, file ? `${file}.json` : '');
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
        throw err;
    }
}

function readMessages(clientName: string, locale: Locale, defaultLocale: Locale, file?: string) {
    const messages = tryReadMessages(clientName, locale, file) ?? tryReadMessages(clientName, defaultLocale, file);
    if (!messages) {
        throw new Error(
            `Missing "${file}.json" for section "${clientName}" in both "${locale}" and default "${defaultLocale}"`,
        );
    }

    return messages;
}

export async function getTranslations(component?: string) {
    const clientName = await getClientName();
    const defaultLocale = 'en-GB'; // TODO
    const resolvedLocale = (await getLocale(clientName)) ?? defaultLocale;
    const common = readMessages(clientName, resolvedLocale, defaultLocale, 'common');
    const componentMessages = readMessages(clientName, resolvedLocale, defaultLocale, component);

    return createTranslator({
        locale: resolvedLocale,
        messages: { ...common, ...componentMessages },
    });
}
