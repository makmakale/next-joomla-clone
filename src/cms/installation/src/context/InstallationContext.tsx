'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import { useLanguageModel } from '@/cms/installation/src/hooks/useLanguageModel';
import { useStepsModel } from '@/cms/installation/src/hooks/useStepsModel';

interface InstallationWizardProps {
    languageMeta: Record<string, unknown>;
}

const useCtxValue = ({ languageMeta }: InstallationWizardProps) => {
    const languageModel = useLanguageModel();
    const stepsModel = useStepsModel();

    return { languageMeta, ...languageModel, ...stepsModel };
};

const InstallationWizardContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useInstallationWizard = () => {
    const context = use(InstallationWizardContext);
    if (!context) throw new Error('useInstallationWizard should be used within <InstallationWizardProvider>');

    return context;
};

export default function InstallationWizardProvider({ children, ...props }: PropsWithChildren<InstallationWizardProps>) {
    const value = useCtxValue(props);

    return <InstallationWizardContext.Provider value={value}>{children}</InstallationWizardContext.Provider>;
}
