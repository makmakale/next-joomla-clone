'use client';

import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { createContext, use } from 'react';

import { useSearchParams } from 'next/navigation';

import { getConfiguration } from '@/libraries/services/configuration';
import type { AppInputType } from '@/libraries/src/Application';
import { getModuleList } from '@/libraries/src/Module';
import { TanstackQuery } from '@/libraries/vendor/wrappers';

import { useQuery } from '@tanstack/react-query';

interface ApplicationProps {
    clientId: number;
    name: string;
}

const useContextValue = (props: ApplicationProps) => {
    const { data: config } = useQuery({
        queryKey: ['get_config'],
        queryFn: getConfiguration,
    });

    const searchParams = useSearchParams();
    const [input, setInput] = useState<AppInputType>({
        layout: 'default',
        ...Object.fromEntries(searchParams.entries()),
    });

    const changeInput = useCallback((key: string, val: unknown) => {
        setInput(prev => ({ ...prev, [key]: val }));
    }, []);

    const { data: modules = [] } = useQuery({
        queryKey: ['get_client_modules', props.clientId],
        queryFn: () => getModuleList(props.clientId),
    });

    return {
        ...props,
        config: config!,
        getInput: () => new Map(Object.entries(input)),
        changeInput,
        modules,
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
