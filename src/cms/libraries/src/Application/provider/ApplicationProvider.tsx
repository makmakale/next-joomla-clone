'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import Wrapper from '@/libraries/src/Wrapper';

interface ApplicationProps {
    clientId: number;
    name: string;
    configuration?: Record<string, unknown>;
}

const useContextValue = (props: ApplicationProps) => {
    return {
        ...props,
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

    return (
        <Wrapper>
            <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
        </Wrapper>
    );
}
