'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setSession(clientName: string, sessionId: string, expiresAt: Date) {
    const cookieStore = await cookies();

    cookieStore.set(`joomla.${clientName}.session`, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresAt,
    });

    if (clientName === 'administrator') {
        redirect('/administrator');
    }
}

export async function getSession(clientName: string) {
    const cookie = (await cookies()).get(`joomla.${clientName}.session`);

    // TODO: check/validate session
    return cookie?.value ?? '';
}

export const getAdminSession = async () => getSession('administrator');
