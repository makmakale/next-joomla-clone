'use server';

import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';

import { promises as fs } from 'node:fs';
import path from 'node:path';

import { getClientName } from '@/libraries/services/application';
import type { Locale, LocaleMetadata, Messages } from '@/libraries/src/Language';
import { createTranslator } from '@/libraries/src/Language';

export async function getLocaleFromHeaders() {
    const acceptLanguage = (await headers()).get('Accept-Language') ?? '';
    const tags = acceptLanguage.match(/[a-zA-Z]{2,3}-[a-zA-Z]{2,4}?/g) ?? [];

    return tags[0] ?? 'en-GB';
}

export const getLocale = async (clientName?: string): Promise<string> => {
    const name = clientName ?? (await getClientName());

    return (await cookies()).get(`web.locale.${name}`)?.value ?? (await getLocaleFromHeaders());
};

export const setLocaleAsync = async (clientName: string, value: string): Promise<void> => {
    (await cookies()).set(`web.locale.${clientName}`, value);
    revalidatePath(clientName === 'site' ? '/' : `/${clientName}`);
};

export async function loadMessages(namespace?: string | string[], lang?: Locale): Promise<Messages> {
    const client = await getClientName();
    const locale = lang ?? (await getLocale(client));

    const basePath = path.join(process.cwd(), 'src/cms', client === 'site' ? 'language' : `${client}/language`);

    // joomla
    const filePathDefault = path.join(basePath, locale, `joomla.json`);
    const contentDefault = await fs.readFile(filePathDefault, 'utf-8');
    const messagesDefault = JSON.parse(contentDefault) as Messages;

    if (!namespace?.length) return messagesDefault;

    // namespace
    const namespaceArr = Array.isArray(namespace) ? namespace : [namespace];
    let result = messagesDefault;
    for (const name of namespaceArr) {
        const filePath = path.join(basePath, locale, `${name}.json`);
        const content = await fs.readFile(filePath, 'utf-8');
        const messages = JSON.parse(content) as Messages;
        result = { ...result, ...messages };
    }

    return result;
}

export async function getTranslations(namespace?: string) {
    const messages = await loadMessages(namespace);

    return createTranslator(messages);
}

export async function getLanguageMetadata(clientName: string, locale: string): Promise<LocaleMetadata | undefined> {
    try {
        const res = await import(
            `@/cms/${clientName === 'site' ? 'language' : `${clientName}/language`}/${locale}/langmetadata.json`
        );

        return res?.default?.metadata;
    } catch {
        try {
            const res = await import(
                `@/cms/${clientName === 'site' ? 'language' : `${clientName}/language`}/en-GB/langmetadata.json`
            );

            return res?.default?.metadata;
        } catch {
            return undefined;
        }
    }
}
