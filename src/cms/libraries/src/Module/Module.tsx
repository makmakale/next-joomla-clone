'use client';

import type { JModuleProps } from '@/libraries/src/Module/Module.types';
import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

const useCtxValue = ({ module }: JModuleProps) => {
    return { module };
};

const JModuleContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useModule = () => {
    const context = use(JModuleContext);
    if (!context) throw new Error('useJModule should be used within <JModuleProvider>');

    return context;
};

export default function JModuleProvider({ children, ...props }: PropsWithChildren<JModuleProps>) {
    const value = useCtxValue(props);

    return <JModuleContext.Provider value={value}>{children}</JModuleContext.Provider>;
}
