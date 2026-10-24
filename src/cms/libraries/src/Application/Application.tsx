'use client';

import type { ClientActiveTemplate } from '@/libraries/src/Templates/Template.types';
import type { JModuleType } from '@/libraries/src/Module/Module.types';
import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

interface ApplicationProps {
    initialValues: {
        clientId: number;
        name: string;
        locale: string;
        session?: unknown;
        modules: JModuleType[];
        template: ClientActiveTemplate;
    };
}

const useContextValue = ({ initialValues }: ApplicationProps) => {
    return {
        ...initialValues,
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

    return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}
