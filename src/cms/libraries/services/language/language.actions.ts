'use server';

import { cookies, headers } from 'next/headers';

import { and, eq } from 'drizzle-orm';

import { db, extensionsTable } from '@/libraries/services/database';

async function getInstalledLanguageTags() {
    const appClientId = (await headers()).get('x-client-id') ?? '0';

    const res = await db
        .select({ element: extensionsTable.element })
        .from(extensionsTable)
        .where(
            and(
                eq(extensionsTable.type, 'language'),
                eq(extensionsTable.enabled, true),
                eq(extensionsTable.clientId, +appClientId),
            ),
        )
        .groupBy(extensionsTable.element);

    return res?.map(({ element }) => element) ?? [];
}

async function getLocaleFromHeaders(): Promise<string> {
    const acceptLanguage = (await headers()).get('accept-language') || '';
    const tags = acceptLanguage.match(/[a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?/g) ?? [];

    const installedLanguages = await getInstalledLanguageTags();

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

async function getLocaleFromCookies(): Promise<string> {
    const appClientName = (await headers()).get('x-client-name') ?? 'site';
    const cookie = (await cookies()).get(`joomla.${appClientName}.locale`);

    return cookie?.value ?? '';
}

export async function getLocale() {
    const cookieLocale = await getLocaleFromCookies();
    if (cookieLocale) return cookieLocale;

    const headersLocale = await getLocaleFromHeaders();
    if (headersLocale) return headersLocale;

    return 'en-GB';
}

export async function setLocale(locale: string): Promise<void> {
    const appClientName = (await headers()).get('x-client-name') ?? 'site';
    const cookieStore = await cookies();

    cookieStore.set(`joomla.${appClientName}.locale`, locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
        secure: true,
    });
}
