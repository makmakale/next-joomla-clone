'use client';

import { useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { SetupSchema } from '@/cms/installation/forms';
import { formSteps, setupSchema } from '@/cms/installation/forms';
import { useInstallationProgress } from '@/cms/installation/src/hooks/useInstallationProgress';
import { InstallationView } from '@/cms/installation/src/types';

import { useApplication } from '@/libraries/src/Application/Application';

export const useStepsModel = () => {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const view = useApplication().getInput().get('view');

    // TODO: clear form values before push
    const stepsForm = useForm<SetupSchema>({
        defaultValues: {
            site_name: 'test',
            admin_user: 'test',
            admin_username: 'test',
            admin_password: 'testtesttesttest',
            admin_email: 'test@test.test',
        },
        resolver: zodResolver(setupSchema),
    });

    const nextStep = async () => {
        const currentFields = formSteps[step - 1].fields;
        const isValid = await stepsForm.trigger(currentFields);
        if (isValid) {
            setStep(prevStep => prevStep + 1);
        }
    };

    const { startInstallation, progressBar, installResults } = useInstallationProgress();

    const onSubmit = async (data: SetupSchema) => {
        setStep(prevStep => prevStep + 1);
        await startInstallation(data);
        // TODO: if !hasErrors
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', InstallationView.Remove);
        router.push(pathname + '?' + params.toString());
    };

    return {
        view,
        step,
        stepsForm,
        onSubmit,
        nextStep,
        progressBar,
        installResults,
    };
};
