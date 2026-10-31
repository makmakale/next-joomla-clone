'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use, useCallback } from 'react';

import { useSearchParams } from 'next/navigation';

import type { ApplicationProps } from '@/libraries/src/Application/Application.types';
import WebApplication from '@/libraries/src/Application/WebApplication';
import { useHTMLDocument } from '@/libraries/src/HTML/HTMLDocument';
import LanguageProvider from '@/libraries/src/Language/Language';

const useContextValue = (props: ApplicationProps) => {
    const { defaultOption, defaultView } = props;
    const searchParams = useSearchParams();
    const { locale } = useHTMLDocument();

    const option = searchParams.get('option') || defaultOption || '';
    const view = searchParams.get('view') || defaultView || option.replace('com_', '');
    const layout = searchParams.get('layout') || 'default';

    const getInput = useCallback(
        () =>
            new Map([
                ['option', option.toLowerCase()],
                ['view', view.toLowerCase()],
                ['layout', layout.toLowerCase()],
            ]),
        [option, view, layout],
    );

    return {
        ...props,
        locale,
        getInput,
    };
};

const ApplicationContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useApplication = () => {
    const context = use(ApplicationContext);
    if (!context) throw new Error('useApplication should be used within <ApplicationProvider>');

    return context;
};

export default function ApplicationProvider({ children, ...props }: PropsWithChildren<ApplicationProps>) {
    const value = useContextValue(props);

    return (
        <ApplicationContext.Provider value={value}>
            <WebApplication>
                <LanguageProvider>{children}</LanguageProvider>
            </WebApplication>
        </ApplicationContext.Provider>
    );
}
