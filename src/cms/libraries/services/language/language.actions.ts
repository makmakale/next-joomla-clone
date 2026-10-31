'use server';

import { cookies, headers } from 'next/headers';

import { detectLocale } from './language.detection';

export async function getLocaleFromHeaders(): Promise<string> {
    const appClientId = (await headers()).get('x-client-id') ?? '0';
    const acceptLanguage = (await headers()).get('accept-language') || '';

    return detectLocale(+appClientId, acceptLanguage);
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
