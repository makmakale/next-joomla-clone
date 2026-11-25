'use client';

import { createContext, use } from 'react';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { useApplication } from '@/libraries/src/Application';
import { useSessionContext } from '@/libraries/src/Session/provider/Session';

import { loadTemplate } from '../src/actions/loadTemplate';
import type { Template } from '../src/types';
import get from 'lodash/get';

const useCtxValue = (template: Template | undefined) => {
    const { session } = useSessionContext();
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
};

const TemplateContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useTemplateContext = () => {
    const context = use(TemplateContext);
    if (!context) throw new Error('useTemplate should be used within <TemplateProvider>');

    return context;
};

export function TemplateProvider({ template }: { template: Template | undefined }) {
    const value = useCtxValue(template);
    const { clientId } = useApplication();
    const { session } = useSessionContext();

    const RenderTemplate = template ? dynamic(() => loadTemplate(clientId, template.template, session), { ssr: false }) : null;

    if (!RenderTemplate) return null;

    return (
        <TemplateContext.Provider value={value}>
            <RenderTemplate />
        </TemplateContext.Provider>
    );
}
