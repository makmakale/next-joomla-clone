'use server';

import { cookies } from 'next/headers';

import { jwtVerify } from 'jose';

import JConfig from '@/configuration';

const secretKey = JConfig.sessionSecret;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });

        return payload;
    } catch (error) {
        console.log('Failed to verify session');

        return null;
    }
}

export const getAdminSession = async () => {
    const cookie = (await cookies()).get('web.session.administrator')?.value;

    return await decrypt(cookie);
};
