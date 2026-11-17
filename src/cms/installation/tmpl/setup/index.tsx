'use client';

import { cn } from 'cn';

import { useInstallationContext } from '@/cms/installation';

import JForm from '@/libraries/src/Form/Form';

import setupFieldsConfig from '../../forms/setup.json';
import LanguageSelect from './languageSelect';
import SetupStep1 from './step1';
import SetupStep2 from './step2';
import SetupStep3 from './step3';

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
