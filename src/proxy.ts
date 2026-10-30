import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAdmin = pathname.startsWith('/administrator');
    const clientId = isAdmin ? 1 : 0;
    const clientName = isAdmin ? 'administrator' : 'site';

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-client-id', String(clientId));
    requestHeaders.set('x-client-name', clientName);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
