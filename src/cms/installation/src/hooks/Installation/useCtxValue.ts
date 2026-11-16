'use client';

import { useLanguageModel } from '@/cms/installation/src/hooks/useLanguageModel';
import { useStepsModel } from '@/cms/installation/src/hooks/useStepsModel';

export const useCtxValue = () => {
    const languageModel = useLanguageModel();
    const stepsModel = useStepsModel();

    return { languageModel, stepsModel };
};
