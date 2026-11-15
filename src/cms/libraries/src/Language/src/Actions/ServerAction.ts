'use server';

import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';

async function getLocaleFromHeaders() {
    const acceptLanguage = (await headers()).get('Accept-Language') ?? '';
    const tags = acceptLanguage.match(/[a-zA-Z]{2,3}-[a-zA-Z]{2,4}?/g) ?? [];

    return tags[0] ?? 'en-GB';
}

export const getLocale = async (clientName: string): Promise<string> => {
    return (await cookies()).get(`web.locale.${clientName}`)?.value ?? (await getLocaleFromHeaders());
};

export const setLocale = async (clientName: string, value: string): Promise<void> => {
    (await cookies()).set(`web.locale.${clientName}`, value);
    revalidatePath(clientName === 'site' ? '/' : `/${clientName}`);
};
