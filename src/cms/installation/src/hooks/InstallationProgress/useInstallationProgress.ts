'use client';

import { useCallback, useState } from 'react';

import type { Progress as ProgressPrimitive } from '@base-ui/react/progress';

import type { SetupSchema } from '@/cms/installation/forms';
import { INSTALL_STEPS, getInstallSteps } from '@/cms/installation/src/controller/InstallationController';

export const useInstallationProgress = () => {
    const [progress, setProgress] = useState(0);
    const [installResults, setInstallResults] = useState<{ success: boolean; message?: string }[]>([]);

    const startInstallation = useCallback(async (data: SetupSchema) => {
        const queue = getInstallSteps(data);

        for (const action of queue) {
            const result = await action.run();
            setInstallResults(prev => [...prev, result]);
            setProgress(s => s + 1);
        }
    }, []);

    return {
        startInstallation,
        progressBar: {
            value: progress,
            min: 0,
            max: INSTALL_STEPS.length,
        } satisfies ProgressPrimitive.Root.Props,
        installResults,
    };
};
