'use client';

import { createContext, use } from 'react';

import { useCtxValue } from '@/cms/installation';
import type { InstallApplicationProps } from '@/cms/installation';
import InstallWizard from '@/cms/installation/template';

const InstallationContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useInstallationContext = () => {
    const context = use(InstallationContext);
    if (!context) throw new Error('useInstallation should be used within <InstallApplication>');

    return context;
};

export function InstallProvider(props: InstallApplicationProps) {
    const value = useCtxValue(props);

    return <InstallationContext.Provider value={value}><InstallWizard /></InstallationContext.Provider>;
}