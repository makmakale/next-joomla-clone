'use client';

import { useCMSApplication } from '@/libraries/src/Application/CMSApplication';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { createContext, use, useEffect } from 'react';
import { renderTemplate } from './Template.actions';
import { useLanguage } from '@/libraries/src/Language/Language';
import get from 'lodash/get';

const useContextValue = () => {
    const { session } = useCMSApplication();
    const pathname = usePathname();
    const { template } = useCMSApplication();

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
    const { clientId, template } = useCMSApplication();
    const { load } = useLanguage();

    useEffect(() => {
        if (!template?.template) return;

        load([`tpl_${template.template}`, `tpl_${template.template}.sys`]);
    }, [template]);

    const RenderTemplate = dynamic(() => renderTemplate(clientId, template?.template), { ssr: false });

    return (
        <TemplateContext.Provider value={value}>
            <RenderTemplate>{children}</RenderTemplate>
        </TemplateContext.Provider>
    );
}
