'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import type { ApplicationProps } from '@/libraries/src/Application/Application.types';
import Wrapper from '@/libraries/src/Wrapper';

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

export default function ApplicationProvider({ children, ...props }: PropsWithChildren<ApplicationProps>) {
    const value = useContextValue(props);

    return (
        <Wrapper>
            <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
        </Wrapper>
    );
}
