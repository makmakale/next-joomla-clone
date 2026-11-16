'use client';

import { cn } from 'cn';

import { useInstallationContext } from '@/cms/installation';

import JForm from '@/libraries/src/Form/Form';

import setupFieldsConfig from '../../forms/setup.json';
import LanguageSelect from './_languageSelect';
import SetupStep1 from './_step1';
import SetupStep2 from './_step2';
import SetupStep3 from './_step3';

const Setup = () => {
    const {
        stepsModel: { view, stepsForm, onSubmit },
    } = useInstallationContext();

    return (
        <div className={cn({ hidden: view !== 'setup' })}>
            <JForm form={stepsForm} fields={setupFieldsConfig} onSubmit={stepsForm.handleSubmit(onSubmit)}>
                <SetupStep1 />

                <SetupStep2 />

                <SetupStep3 />
            </JForm>

            <LanguageSelect />
        </div>
    );
};

export default Setup;
