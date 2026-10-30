import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isInstalled } from '@/libraries/services/installation/installation';
import { detectLocale } from '@/libraries/services/language/language.detection';

const INSTALLATION_PATH = '/installation';

// Once true the app can't become uninstalled again, so skip the DB round-trip on every later request.
let installed = false;

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!installed && pathname !== INSTALLATION_PATH) {
        installed = await isInstalled();

        if (!installed) {
            return NextResponse.redirect(new URL(INSTALLATION_PATH, request.url));
        }
    }

    const isAdmin = pathname.startsWith('/administrator');
    const clientId = isAdmin ? 1 : 0;
    const clientName = isAdmin ? 'administrator' : 'site';

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-client-id', String(clientId));
    requestHeaders.set('x-client-name', clientName);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    const localeCookieName = `joomla.${clientName}.locale`;

    if (!request.cookies.has(localeCookieName)) {
        try {
            const locale = await detectLocale(clientId, request.headers.get('accept-language') ?? '');

            if (locale) {
                response.cookies.set(localeCookieName, locale, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 365,
                    sameSite: 'lax',
                    secure: true,
                });
            }
        } catch (err) {
            console.error('[proxy] locale detection failed', err);
        }
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
