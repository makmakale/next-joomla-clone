'use client';

import { useApplication } from '@/libraries/src/Application/Application';
import { useLanguage } from '@/libraries/src/Language/Language';
import { createContext, use, useEffect } from 'react';
import { renderTemplate } from './Template.actions';
import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import get from 'lodash/get';

const useContextValue = () => {
    const { session } = useApplication();
    const pathname = usePathname();
    const { template } = useApplication();

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

const TemplateContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useTemplate = () => {
    const context = use(TemplateContext);
    if (!context) throw new Error('useTemplate should be used within <TemplateProvider>');

    return context;
};

export default function Template({ children }: PropsWithChildren) {
    const value = useContextValue();
    const { clientId, template, session } = useApplication();
    const { load } = useLanguage();

    useEffect(() => {
        if (!template?.template) return;

        load([`tpl_${template.template}`, `tpl_${template.template}.sys`]);
    }, [template]);

    const RenderTemplate = dynamic(() => renderTemplate(clientId, template?.template, session), { ssr: false });

    return (
        <TemplateContext.Provider value={value}>
            <RenderTemplate>{children}</RenderTemplate>
        </TemplateContext.Provider>
    );
}
