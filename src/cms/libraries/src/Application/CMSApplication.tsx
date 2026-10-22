'use client';

import type { ClientActiveTemplate } from '@/libraries/src/Templates/Template.types';
import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

interface CMSApplicationProps {
    clientId: number;
    name: string;
    template: ClientActiveTemplate;
}

const useContextValue = (props: CMSApplicationProps) => {
    return {
        ...props,
        session: null, // TODO
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
