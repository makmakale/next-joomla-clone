'use client';

import { useLayoutEffect } from 'react';

import { RemoveSteps } from '@/cms/installation';

import { useApplication } from '@/libraries/src/Application';

export const useRemoveModel = () => {
    const { getInput, changeInput } = useApplication();

    const input = getInput();
    const view = input.get('view');
    const step = input.get('step');

    useLayoutEffect(() => {
        if (!view) {
            return;
        }
        if (!step) {
            changeInput('step', RemoveSteps.Congrat); // TODO: what to show
        }
    }, [view, step]);

    const goToStep = async (nextStep: string) => {
        changeInput('step', nextStep);
    };

    return {
        view,
        step,
        goToStep,
    };
};
