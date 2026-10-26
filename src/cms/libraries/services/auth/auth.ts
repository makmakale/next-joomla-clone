'use server';

import { cookies, headers } from 'next/headers';

import JConfig from '@/configuration';

import { setSession } from '@/libraries/src/Session';

import type { AuthCredentialsSchema } from './auth.types';

// TODO: options
export const authenticate = async (data: AuthCredentialsSchema, options?: object) => {
    await signIn(data);

    return {
        success: true,
        message: 'Authentication successfully',
    };
};

// TODO: credentials
async function signIn(credentials: AuthCredentialsSchema) {
    const headersStore = await headers();
    const appClientName = headersStore.get('x-client-name')!;
    const expiresAt = new Date(Date.now() + JConfig.lifetime * 60 * 1000);

    await setSession(appClientName, new Date().getTime().toString(), expiresAt);
}

export const signOut = async () => {
    const headersStore = await headers();
    const appClientName = headersStore.get('x-client-name')!;

    const cookieStore = await cookies();
    cookieStore.delete(`joomla.${appClientName}.session`);
};
