'use server';

import { cookies } from 'next/headers';

export const getSiteTheme = async () => {
    const cookieStore = await cookies();

    return cookieStore.get('joomla.site.theme')?.value ?? 'light';
};

export const getAdminTheme = async () => {
    const cookieStore = await cookies();

    return cookieStore.get('joomla.administrator.theme')?.value ?? 'dark';
};
