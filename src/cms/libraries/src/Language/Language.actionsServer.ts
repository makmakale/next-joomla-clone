'use server';

import { administratorRouting } from '@/libraries/services/i18n/administrator/routing';
import { siteRouting } from '@/libraries/services/i18n/site/routing';
import { cookies, headers } from 'next/headers';

export const getLocaleFromHeaders = async (): Promise<string> => {
    const acceptLanguage = (await headers()).get('accept-language') || '';
    const tags = acceptLanguage.match(/[a-zA-Z]{2}-[a-zA-Z]{2}/g) ?? [];

    return tags[0] || '';
};

export const getLocaleFromCookies = async (name: string): Promise<string> => {
    const cookie = (await cookies()).get(`joomla.${name}.locale`);

    return cookie?.value ?? '';
};

export const isValidLocale = async (locale: string, name: string): Promise<boolean> => {
    if (name === 'administrator') {
        return administratorRouting.locales.includes(locale);
    }

    return siteRouting.locales.includes(locale);
};

export const getLocale = async (name: string) => {
    const cookieLocale = await getLocaleFromCookies(name);

    if (cookieLocale && (await isValidLocale(cookieLocale, name))) {
        return cookieLocale;
    }

    const headersLocale = await getLocaleFromHeaders();

    if (headersLocale && (await isValidLocale(headersLocale, name))) {
        return headersLocale;
    }

    if (name === 'administrator') {
        return administratorRouting.defaultLocale;
    }

    return siteRouting.defaultLocale;
};

export const getAdminLocale = async () => getLocale('administrator');

export const setLocale = async (name: string, locale: string): Promise<void> => {
    const cookieStore = await cookies();
    const cookieName = name === 'administrator' ? administratorRouting.localeCookie.name : siteRouting.localeCookie.name;

    cookieStore.set(cookieName, locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
    });
};

export const loadLanguageFile = async (clientId: number, locale: string, langPath: string) => {
    try {
        const res =
            clientId === 1
                ? await import(`@/cms/administrator/language/${locale}/${langPath}.json`)
                : await import(`@/cms/language/${locale}/${langPath}.json`);

        return res?.default;
    } catch {
        return {};
    }
};
