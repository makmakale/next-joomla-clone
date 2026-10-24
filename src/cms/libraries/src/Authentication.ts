'use server';

import { setSession } from '@/libraries/src/Session';
import { cookies } from 'next/headers';
import JConfig from '@/configuration';

// TODO: signIn
export const signIn = async (clientName: string) => {
    const expiresAt = new Date(Date.now() + JConfig.lifetime * 60 * 1000);

    await setSession(clientName, new Date().getTime().toString(), expiresAt);
};

// TODO: signOut
export const signOut = async (clientName: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(`joomla.${clientName}.session`);
};
