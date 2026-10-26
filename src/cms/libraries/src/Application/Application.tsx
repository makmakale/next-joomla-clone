'use client';

import { createContext, use } from 'react';

import { useSearchParams } from 'next/navigation';

import { authenticate } from '@/libraries/services/auth/auth';
import type { AuthCredentialsSchema } from '@/libraries/services/auth/auth.types';
import WebApplication from '@/libraries/src/Application/WebApplication';
import LanguageProvider from '@/libraries/src/Language/Language';
import Template from '@/libraries/src/Templates/Template';

import type { ApplicationProps } from './Application.types';

const useContextValue = ({ initialValues }: ApplicationProps) => {
    const { clientId, session } = initialValues;
    const searchParams = useSearchParams();

    const defaultOption = clientId === 1 ? (session ? 'com_cpanel' : 'com_login') : 'com_content';
    const option = searchParams.get('option') || defaultOption;
    const view = searchParams.get('view') || option.replace('com_', '');
    const layout = searchParams.get('layout') || 'default';

    const login = async (data: AuthCredentialsSchema, params?: object) => {
        return authenticate(data, params);
    };

    return {
        ...initialValues,
        getInput: () =>
            new Map([
                ['option', option.toLowerCase()],
                ['view', view.toLowerCase()],
                ['layout', layout.toLowerCase()],
            ]),
        login,
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
                <LanguageProvider>
                    <Template />
                </LanguageProvider>
            </WebApplication>
        </ApplicationContext.Provider>
    );
}
