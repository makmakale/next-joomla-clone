'use client';

import { useInstallationLanguage, useRemoveModel, useSetupModel } from '@/cms/installation';
import type { InstallApplicationProps } from '@/cms/installation';

export const useCtxValue = (props: InstallApplicationProps) => {
    const languageModel = useInstallationLanguage();
    const setupModel = useSetupModel();
    const removeModel = useRemoveModel();

    return { ...props, languageModel, setupModel, removeModel };
};
