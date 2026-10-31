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

const InstTemplateContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useInstTemplate = () => {
    const context = use(InstTemplateContext);
    if (!context) throw new Error('useInstTemplate should be used within <InstTemplateProvider>');

    return context;
};

export default function InstTemplateProvider({ children }: PropsWithChildren) {
    const value = useCtxValue();

    return <InstTemplateContext.Provider value={value}>{children}</InstTemplateContext.Provider>;
}
