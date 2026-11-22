'use client';

import dynamic from 'next/dynamic';

import { useApplication } from '@/libraries/src/Application';

export interface JIncludeComponentType {
    type: 'component';
}

export function JIncludeComponent() {
    const { name, getInput } = useApplication();

    const input = getInput();
    const option = input.get('option') ?? '';
    const view = input.get('view') ?? '';
    const layout = input.get('layout') ?? 'default';

    if (!view) return null;

    const filePath = option ? `${option}/${view}/${layout}` : `${view}/${layout}`;

    const RenderComponent = dynamic(() => getComponent(name, filePath), { ssr: false });

    return <RenderComponent />;
}

export const getComponent = async (name: string, filePath: string) => {
    switch (name) {
        case 'installation':
            try {
                return await import(`@/cms/installation/tmpl/${filePath}`);
            } catch {
                return () => `@/cms/installation/tmpl/${filePath} not found`;
            }

        case 'administrator':
            try {
                return await import(`@/cms/administrator/components/${filePath}`);
            } catch {
                return () => `@/cms/administrator/components/${filePath} not found`;
            }

        case 'site':
            try {
                return await import(`@/cms/components/${filePath}`);
            } catch {
                return () => `@/cms/components/${filePath} not found`;
            }

        default:
            return () => `${filePath} not found for ${name}`;
    }
};
