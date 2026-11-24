'use client';

import { useLayoutEffect } from 'react';

import { InstallationView, SetupSteps } from '@/cms/installation';

import { useApplication } from '@/libraries/src/Application';

export default function () {
    const { getInput, changeInput } = useApplication();

    const input = getInput();
    const view = input.get('view') ?? '';
    const step = input.get('step') ?? '';

    useLayoutEffect(() => {
        if (!view) {
            changeInput('view', InstallationView.Setup);
            if (!step) {
                changeInput('step', SetupSteps.Step1);
            }
        }
    }, [view, step]);

    return null;
}
