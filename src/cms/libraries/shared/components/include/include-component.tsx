'use client';

import { Fragment } from 'react';

import dynamic from 'next/dynamic';

import { useApplication } from '@/libraries/src/Application';

export interface JIncludeComponentType {
    type: 'component';
}

export function JIncludeComponent() {
    const { name, getInput } = useApplication();

    const input = getInput();

    const RenderComponent = dynamic(() => getComponent(name, input), { ssr: false });

    return <RenderComponent />;
}

async function getComponent(name: string, query: Map<string, string>) {
    const option = query.get('option') ?? '';
    const view = query.get('view') ?? option.replace('com_', '');
    const layout = query.get('layout') ?? 'default';

    switch (name) {
        case 'installation': {
            try {
                const layoutRes = await import(`@/cms/installation/tmpl/${view}/${layout}.tsx`);

                return layoutRes?.default;
            } catch {
                throw new Error(`Component "${view}/${layout}" not found`);
            }
        }
        case 'administrator': {
            try {
                const Provider = (
                    await import(`@/cms/administrator/components/${option}/services/provider.tsx`).catch(() => ({
                        default: Fragment,
                    }))
                ).default;
                const layoutRes = await import(`@/cms/administrator/components/${option}/tmpl/${view}/${layout}.tsx`);

                const Layout = layoutRes?.default;

                return () => (
                    <Provider>
                        <Layout />
                    </Provider>
                );
            } catch {
                throw new Error(`Component "${option}/tmpl/${view}/${layout}" not found`);
            }
        }
        case 'site': {
            try {
                const Provider = (
                    await import(`@/cms/components/${option}/services/provider.tsx`).catch(() => ({
                        default: Fragment,
                    }))
                ).default;
                const layoutRes = await import(`@/cms/components/${option}/tmpl/${view}/${layout}.tsx`);

                const Layout = layoutRes?.default;

                return () => (
                    <Provider>
                        <Layout />
                    </Provider>
                );
            } catch {
                throw new Error(`Component "${option}/tmpl/${view}/${layout}" not found`);
            }
        }

        default:
            return null;
    }
}
