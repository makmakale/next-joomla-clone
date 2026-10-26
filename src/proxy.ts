import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAdmin = pathname.startsWith('/administrator');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-client-id', isAdmin ? '1' : '0');
    requestHeaders.set('x-client-name', isAdmin ? 'administrator' : 'site');

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
