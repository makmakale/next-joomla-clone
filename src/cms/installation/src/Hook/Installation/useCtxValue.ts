'use client';

import { useLayoutEffect } from 'react';

import { InstallationView, SetupSteps, useInstallationLanguage, useRemoveModel, useSetupModel } from '@/cms/installation';
import type { InstallApplicationProps } from '@/cms/installation';

import { useApplication } from '@/libraries/src/Application';

export const useCtxValue = (props: InstallApplicationProps) => {
    const { getInput, changeInput } = useApplication();

    const input = getInput();
    const view = input.get('view');
    const step = input.get('step');

    useLayoutEffect(() => {
        if (!view) {
            changeInput('view', InstallationView.Setup);
            if (!step) {
                changeInput('step', SetupSteps.Step1);
            }
        }
    }, [view, step]);

    const languageModel = useInstallationLanguage();
    const setupModel = useSetupModel();
    const removeModel = useRemoveModel();

    return { ...props, languageModel, setupModel, removeModel };
};
