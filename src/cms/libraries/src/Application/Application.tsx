'use client';

import WebApplication from '@/libraries/src/Application/WebApplication';
import type { ApplicationProps } from './Application.types';
import Template from '@/libraries/src/Templates/Template';
import { useSearchParams } from 'next/navigation';
import { createContext, use } from 'react';

const useContextValue = ({ initialValues }: ApplicationProps) => {
    const { clientId, session } = initialValues;
    const searchParams = useSearchParams();

    const defaultOption = clientId === 1 ? (session ? 'com_cpanel' : 'com_login') : 'com_content';
    const option = searchParams.get('option') || defaultOption;
    const view = searchParams.get('view') || option.replace('com_', '');
    const layout = searchParams.get('layout') || 'default';

    return {
        ...initialValues,
        getInput: () =>
            new Map([
                ['option', option.toLowerCase()],
                ['view', view.toLowerCase()],
                ['layout', layout.toLowerCase()],
            ]),
    };
};

const ApplicationContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useApplication = () => {
    const context = use(ApplicationContext);
    if (!context) throw new Error('useApplication should be used within <ApplicationProvider>');

    return context;
};

export default function ApplicationProvider(props: ApplicationProps) {
    const value = useContextValue(props);

    return (
        <ApplicationContext.Provider value={value}>
            <WebApplication>
                <Template />
            </WebApplication>
        </ApplicationContext.Provider>
    );
}
