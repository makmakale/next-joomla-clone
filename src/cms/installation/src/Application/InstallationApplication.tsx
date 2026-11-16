'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import { useCtxValue } from '@/cms/installation';

const InstallationContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useInstallationContext = () => {
    const context = use(InstallationContext);
    if (!context) throw new Error('useInstallation should be used within <InstallApplication>');

    return context;
};

export function InstallApplication({ children }: PropsWithChildren) {
    const value = useCtxValue();

    return <InstallationContext.Provider value={value}>{children}</InstallationContext.Provider>;
}
