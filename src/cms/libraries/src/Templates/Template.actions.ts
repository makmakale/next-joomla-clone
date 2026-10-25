import { TemplateNoFound } from '@/libraries/src/Templates/Template.not-found';
import type { ComponentType, PropsWithChildren } from 'react';

export const renderTemplate = (
    clientId: number,
    name?: string,
    session?: unknown,
): Promise<ComponentType<PropsWithChildren>> => {
    try {
        return clientId === 1
            ? import(`@/cms/administrator/templates/${name}${!session ? '/login' : ''}`).catch(() => TemplateNoFound)
            : import(`@/cms/templates/${name}`).catch(() => TemplateNoFound);
    } catch {
        return Promise.resolve(TemplateNoFound);
    }
};
