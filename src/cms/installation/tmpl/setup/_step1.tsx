'use client';

import { cn } from 'cn';

import { useInstallationWizard } from '@/cms/installation/src/context/InstallationContext';
import { Installation } from '@/cms/installation/template/ui';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { FieldGroup, FieldLegend, FieldSet } from '@/libraries/shared/shadcn/ui/field';
import FormField from '@/libraries/src/Form/FormField';

const SetupStep1 = () => {
    const { step, nextStep } = useInstallationWizard();

    return (
        <Installation.Step className={cn({ hidden: step !== 1 })}>
            <FieldSet id="installStep1">
                <FieldLegend>
                    <JIcon icon="cog" className="me-1" />
                    <JText text="INSTL_SETUP_SITE_NAME" />
                </FieldLegend>

                <FieldGroup>
                    <FormField name="site_name" />
                </FieldGroup>

                <Button size="lg" className="w-full" onClick={nextStep}>
                    <JText text="INSTL_SETUP_LOGIN_DATA" />
                    <JIcon icon="chevron-right" />
                </Button>
            </FieldSet>
        </Installation.Step>
    );
};

export default SetupStep1;
