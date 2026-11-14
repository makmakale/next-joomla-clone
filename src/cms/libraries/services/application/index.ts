import { headers } from 'next/headers';

export async function getClientName() {
    const pathname = (await headers()).get('x-pathname') ?? '';
    const client = pathname.startsWith('/administrator')
        ? 'administrator'
        : pathname.startsWith('/installation')
          ? 'installation'
          : 'site';

    return client;
}
