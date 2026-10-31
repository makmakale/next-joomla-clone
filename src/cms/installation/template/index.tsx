'use client';

import { cn } from 'cn';

import { useInstTemplate } from '@/cms/installation/src/context/InstallationContext';
import { LanguageForm } from '@/cms/installation/template/ui';
import { Installation } from '@/cms/installation/template/ui/installation';

import JIcon from '@/libraries/shared/components/Icon';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { FieldGroup, FieldLegend, FieldSet } from '@/libraries/shared/shadcn/ui/field';
import JForm from '@/libraries/src/Form/Form';
import FormField from '@/libraries/src/Form/FormField';
import { useLanguage } from '@/libraries/src/Language/Language';

import setupFieldsConfig from '../forms/setup.json';

const InstallWizard = () => {
    const { step, stepsForm, onSubmit, nextStep } = useInstTemplate();
    const { t } = useLanguage();

    return (
        <Installation.Body>
            <Installation.Header />

            <Installation.Content>
                <JForm form={stepsForm} noValidate fields={setupFieldsConfig} onSubmit={stepsForm.handleSubmit(onSubmit)}>
                    <Installation.Card className={cn({ hidden: step !== 1 })}>
                        <FieldSet id="installStep1">
                            <FieldLegend>
                                <JIcon icon="cog" className="me-1" />
                                {t('INSTL_SETUP_SITE_NAME')}
                            </FieldLegend>

                            <FieldGroup>
                                <FormField name="site_name" />
                            </FieldGroup>

                            <Button size="lg" className="w-full" onClick={nextStep}>
                                {t('INSTL_SETUP_LOGIN_DATA')}
                                <JIcon icon="chevron-right" />
                            </Button>
                        </FieldSet>
                    </Installation.Card>

                    <Installation.Card className={cn({ hidden: step !== 2 })}>
                        <FieldSet>
                            <FieldLegend>
                                <JIcon icon="lock" className="me-1" />
                                {t('INSTL_LOGIN_DATA')}
                            </FieldLegend>

                            <FieldGroup>
                                <FormField name="admin_user" />
                                <FormField name="admin_username" />
                                <FormField name="admin_password" />
                                <FormField name="admin_email" />
                            </FieldGroup>

                            <Button type="submit" size="lg" className="w-full">
                                {t('INSTL_INSTALL_JOOMLA')}
                                <JIcon icon="chevron-right" />
                            </Button>
                        </FieldSet>
                    </Installation.Card>

                    <Installation.Card className={cn({ hidden: step !== 3 })}>TODO: Installation process</Installation.Card>
                </JForm>

                <LanguageForm />
            </Installation.Content>
        </Installation.Body>
    );
};

export default InstallWizard;
