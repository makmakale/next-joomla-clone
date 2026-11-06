import type { ComponentType, PropsWithChildren } from 'react';

export const renderTemplate = (
    clientId: number,
    name?: string,
    session?: unknown,
): Promise<ComponentType<PropsWithChildren>> => {
    if (!name) {
        throw new Error('Template not defined');
    }

    try {
        return clientId === 1
            ? import(`@/cms/administrator/templates/${name}${!session ? '/login' : ''}`)
            : import(`@/cms/templates/${name}`);
    } catch (err) {
        throw new Error(`Template ${name} not found`, { cause: err });
    }
};
