'use client';

import type { PropsWithChildren } from 'react';
import { use, createContext } from 'react';

interface CMSApplicationProps {
    clientId: number;
    name: string;
}

const useContextValue = (props: CMSApplicationProps) => {
    return {
        ...props,
    };
};

const CMSApplicationContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useCMSApplication = () => {
    const context = use(CMSApplicationContext);
    if (!context) throw new Error('useCMSApplication should be used within <CMSApplicationProvider>');

    return context;
};

export default function CMSApplicationProvider({ children, ...props }: PropsWithChildren<CMSApplicationProps>) {
    const value = useContextValue(props);

    return <CMSApplicationContext.Provider value={value}>{children}</CMSApplicationContext.Provider>;
}
