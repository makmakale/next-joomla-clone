'use client';

import { useForm } from 'react-hook-form';

import { InstallationView, RemoveSteps, SetupSteps, useInstallationProgress } from '@/cms/installation';
import type { SetupSchema } from '@/cms/installation/forms';
import { formSteps, setupSchema } from '@/cms/installation/forms';

import { useApplication } from '@/libraries/src/Application';
import { useLanguageContext } from '@/libraries/src/Language';

import { zodResolver } from '@hookform/resolvers/zod';

export const useSetupModel = () => {
    const { getInput, changeInput } = useApplication();
    const { locale } = useLanguageContext();

    const input = getInput();
    const step = input.get('step');

    // TODO: clear form values before push
    const stepsForm = useForm<SetupSchema>({
        defaultValues: {
            language: locale,
            site_name: 'test',
            admin_user: 'test',
            admin_username: 'test',
            admin_password: 'testtesttesttest',
            admin_email: 'test@test.test',
        },
        resolver: zodResolver(setupSchema),
    });

    const goToStep = async (nextStep: string) => {
        const currentFields = formSteps[nextStep as keyof typeof formSteps]?.fields;
        if (currentFields) {
            const isValid = await stepsForm.trigger(currentFields);
            if (isValid) {
                changeInput('step', nextStep);
            }
        }
    };

    const { startInstallation, progressBar, installResults } = useInstallationProgress();

    const onSubmit = async (data: SetupSchema) => {
        changeInput('step', SetupSteps.Install);
        await startInstallation(data);
        // TODO: if !hasErrors
        changeInput('view', InstallationView.Remove);
        changeInput('step', RemoveSteps.Congrat);
    };

    return {
        step,
        stepsForm,
        onSubmit,
        goToStep,
        progressBar,
        installResults,
    };
};
