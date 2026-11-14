'use client';

import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { createContext, use } from 'react';

import { useSearchParams } from 'next/navigation';

interface ApplicationProps {
    clientId: number;
    name: string;
    configuration?: Record<string, unknown>;
}

const useContextValue = (props: ApplicationProps) => {
    const searchParams = useSearchParams();

    const option = searchParams.get('option') || '';
    const view = searchParams.get('view') || option.replace('com_', '');
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
        getInput,
    };
};

const ApplicationContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useApplication = () => {
    const context = use(ApplicationContext);
    if (!context) throw new Error('useApplication should be used within <ApplicationProvider>');

    return context;
};

export function ApplicationProvider({ children, ...props }: PropsWithChildren<ApplicationProps>) {
    const value = useContextValue(props);

    return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}
