'use server';

import { cookies, headers } from 'next/headers';

import { promises as fs } from 'fs';
import path from 'path';

import { getClientName } from '@/libraries/services/application';
import type { Messages } from '@/libraries/src/Language';
import { createTranslator } from '@/libraries/src/Language';

export async function getLocaleFromHeaders() {
    const acceptLanguage = (await headers()).get('Accept-Language') ?? '';
    const tags = acceptLanguage.match(/[a-zA-Z]{2,3}-[a-zA-Z]{2,4}?/g) ?? [];

    return tags[0] ?? 'en-GB';
}

export async function getLanguage(client: string) {
    const defaultLanguage = await getLocaleFromHeaders();
    const cookieLanguage = (await cookies()).get(`web.locale.${client}`)?.value ?? '';

    return cookieLanguage || defaultLanguage;
}

export async function loadMessages(namespace?: string): Promise<Messages> {
    const client = await getClientName();
    const defaultLocale = await getLocaleFromHeaders();
    const locale = (await getLanguage(client)) ?? defaultLocale;

    const basePath = path.join(process.cwd(), 'src/cms', client === 'site' ? 'language' : `${client}/language`);

    // joomla
    const filePathDefault = path.join(basePath, locale, `joomla.json`);
    const contentDefault = await fs.readFile(filePathDefault, 'utf-8');
    const messagesDefault = JSON.parse(contentDefault) as Messages;

    if (!namespace) return messagesDefault;

    // namespace
    const filePath = path.join(basePath, locale, `${namespace}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    const messages = JSON.parse(content) as Messages;

    return { ...messagesDefault, ...messages };
}

export async function getTranslations(namespace?: string) {
    const messages = await loadMessages(namespace);

    return createTranslator(messages);
}
