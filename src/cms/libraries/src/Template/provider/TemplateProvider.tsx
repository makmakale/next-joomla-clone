'use client';

import type { ComponentType, PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import get from 'lodash/get';

import { useApplication } from '@/libraries/src/Application/provider/ApplicationProvider';
import { useSessionContext } from '@/libraries/src/Session';
import type { getAdminTemplate, getSiteTemplate } from '@/libraries/src/Template';

export interface TemplateProps {
    template: Awaited<ReturnType<typeof getSiteTemplate>> | Awaited<ReturnType<typeof getAdminTemplate>>;
}

function useCtxValue({ template }: TemplateProps) {
    const session = useSessionContext();
    const pathname = usePathname();

    return {
        hiddenMenu: !session,
        cpanel: pathname === '/administrator',
        params: {
            get<Value = unknown>(name: string, defaultValue?: Value) {
                return get(template?.params, name, defaultValue);
            },
        },
    };
}

const TemplateContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export function useTemplateContext() {
    const context = use(TemplateContext);
    if (!context) throw new Error('useTemplate should be used within <TemplateProvider>');

    return context;
}

export function TemplateProvider({ children, ...props }: PropsWithChildren<TemplateProps>) {
    const { template } = props;
    const value = useCtxValue(props);
    const { clientId } = useApplication();

    const RenderTemplate: ComponentType<PropsWithChildren> =
        clientId === 1
            ? dynamic(() => import(`@/cms/administrator/templates/${template.template}`))
            : dynamic(() => import(`@/cms/templates/${template.template}`));

    if (!RenderTemplate) return null;

    return (
        <TemplateContext.Provider value={value}>
            <RenderTemplate>{children}</RenderTemplate>
        </TemplateContext.Provider>
    );
}
