'use client';

import { useLayoutEffect } from 'react';

import { useLanguageModel } from '@/cms/installation/src/hooks/useLanguageModel';
import { useStepsModel } from '@/cms/installation/src/hooks/useStepsModel';

import { useTranslations } from '@/libraries/src/Language';

export const useCtxValue = () => {
    const t = useTranslations();

    useLayoutEffect(() => {
        document.title = t('INSTL_PAGE_TITLE');
    }, [t]);

    const languageModel = useLanguageModel();
    const stepsModel = useStepsModel();

    return { languageModel, stepsModel };
};
