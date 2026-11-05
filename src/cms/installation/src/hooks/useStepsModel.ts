'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import configurationDist from '@/cms/installation/configuration-dist';
import type { SetupSchema } from '@/cms/installation/forms';
import { formSteps, setupSchema } from '@/cms/installation/forms';

import { useLanguage } from '@/libraries/src/Language/Language';

export const useStepsModel = () => {
    const [step, setStep] = useState(1);
    const { t } = useLanguage();

    const stepsForm = useForm<SetupSchema>({
        defaultValues: {
            site_name: '',
            admin_user: '',
            admin_username: '',
            admin_password: '',
            admin_email: '',
        },
        resolver: zodResolver(setupSchema),
    });

    const onSubmit = async (data: SetupSchema) => {
        console.log('onSubmit:step', step);
        console.log('save configuration', {
            ...configurationDist,
            sitename: data.site_name,
            fromname: data.site_name,
            mailfrom: data.admin_email,
            offline_message: t('offline_message'),
        });
        console.log('save admin user', {
            name: data.admin_user,
            username: data.admin_username,
            password: data.admin_password,
            email: data.admin_email,
        });
    };

    const nextStep = async () => {
        const currentFields = formSteps[step - 1].fields;
        const isValid = await stepsForm.trigger(currentFields);
        if (isValid) {
            setStep(prevStep => prevStep + 1);
        }
    };

    return {
        step,
        stepsForm,
        onSubmit,
        nextStep,
    };
};
