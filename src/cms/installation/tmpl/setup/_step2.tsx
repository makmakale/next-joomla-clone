'use client';

import { cn } from 'cn';

import { useInstallationWizard } from '@/cms/installation/src/context/InstallationContext';
import { Installation } from '@/cms/installation/template/ui';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { FieldGroup, FieldLegend, FieldSet } from '@/libraries/shared/shadcn/ui/field';
import FormField from '@/libraries/src/Form/FormField';

const SetupStep2 = () => {
    const { step } = useInstallationWizard();

    return (
        <Installation.Step className={cn({ hidden: step !== 2 })}>
            <FieldSet>
                <FieldLegend>
                    <JIcon icon="lock" className="me-1" />
                    <JText text="INSTL_LOGIN_DATA" />
                </FieldLegend>

                <FieldGroup>
                    <FormField name="admin_user" />
                    <FormField name="admin_username" />
                    <FormField name="admin_password" />
                    <FormField name="admin_email" />
                </FieldGroup>

                <Button type="submit" size="lg" className="w-full">
                    <JText text="INSTL_INSTALL_JOOMLA" />
                    <JIcon icon="chevron-right" />
                </Button>
            </FieldSet>
        </Installation.Step>
    );
};

export default SetupStep2;
