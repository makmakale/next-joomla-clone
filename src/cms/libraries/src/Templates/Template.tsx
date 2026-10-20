'use client';

import { useCMSApplication } from '@/libraries/src/Application/CMSApplication';
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import { renderTemplate } from './Template.actions';

const useContextValue = () => {
    return {};
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

    const RenderTemplate = dynamic(() => renderTemplate(clientId, template?.name), { ssr: false });

    return (
        <TemplateContext.Provider value={value}>
            <RenderTemplate>{children}</RenderTemplate>
        </TemplateContext.Provider>
    );
}
