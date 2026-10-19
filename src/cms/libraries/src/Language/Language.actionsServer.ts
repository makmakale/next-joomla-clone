'use server';

import { cookies, headers } from 'next/headers';

import type { Locale } from './Language.constants';
import { defaultLocale } from './Language.constants';
import { locales } from './Language.constants';

export const getLocaleFromHeaders = async (): Promise<Locale> => {
    const acceptLanguage = (await headers()).get('accept-language') || '';
    const browserLocale = acceptLanguage.split(',')[0]?.split('-')[0] || '';

    return browserLocale as Locale;
};

export const getLocaleFromCookies = async (name: string): Promise<Locale> => {
    const cookie = (await cookies()).get(`joomla.${name}.locale`);

    return (cookie?.value ?? '') as Locale;
};

export const isValidLocale = async (locale: string): Promise<boolean> => {
    return locales.includes(locale as Locale);
};

export const getLocale = async (name: string) => {
    const cookieLocale = await getLocaleFromCookies(name);

    if (cookieLocale && (await isValidLocale(cookieLocale))) {
        return cookieLocale;
    }

    const headersLocale = await getLocaleFromHeaders();

    if (headersLocale && (await isValidLocale(headersLocale))) {
        return headersLocale;
    }

    return defaultLocale;
};

export const setLocale = async (name: string, locale: string): Promise<void> => {
    const cookieStore = await cookies();

    cookieStore.set(`joomla.${name}.locale`, locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
    });
};
