'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getConfiguration } from '@/libraries/services/configuration';
import { TanstackQuery } from '@/libraries/vendor/wrappers';

interface ApplicationProps {
    clientId: number;
    name: string;
}

const useContextValue = (props: ApplicationProps) => {
    const { data: config } = useQuery({
        queryKey: ['get_config'],
        queryFn: getConfiguration,
    });

    return {
        ...props,
        config,
    };
};

const ApplicationContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useApplication = () => {
    const context = use(ApplicationContext);
    if (!context) throw new Error('useApplication should be used within <Application>');

    return context;
};

export function Application({ children, ...props }: PropsWithChildren<ApplicationProps>) {
    const value = useContextValue(props);

    return (
        <TanstackQuery>
            <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
        </TanstackQuery>
    );
}
