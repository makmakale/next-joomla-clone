'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import type { InstLangTag } from '@/cms/installation/language';
import { instlLangConfig } from '@/cms/installation/language';
import { useLanguageModel } from '@/cms/installation/src/hooks/useLanguageModel';
import { useStepsModel } from '@/cms/installation/src/hooks/useStepsModel';

import { useHTMLDocument } from '@/libraries/src/HTML/HTMLDocument';

const useCtxValue = () => {
    const { locale } = useHTMLDocument();

    const languageMeta = instlLangConfig[locale as InstLangTag].metadata;

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

export default function InstallationWizardProvider({ children }: PropsWithChildren) {
    const value = useCtxValue();

    return <InstallationWizardContext.Provider value={value}>{children}</InstallationWizardContext.Provider>;
}
