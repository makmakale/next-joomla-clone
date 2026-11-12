'use server';

import { headers } from 'next/headers';

export const getClientId = async () => {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') ?? '';

    return pathname.startsWith('/administrator') ? 1 : 0;
};

export const getClientName = async () => {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') ?? '';

    return pathname.startsWith('/administrator')
        ? 'administrator'
        : pathname.startsWith('/installation')
          ? 'installation'
          : 'site';
};
