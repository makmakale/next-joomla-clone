'use client';

import { cn } from 'cn';

import { useInstallationContext } from '@/cms/installation';
import { Installation } from '@/cms/installation/template/ui';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { FieldLegend, FieldSet } from '@/libraries/shared/shadcn/ui/field';
import { Progress, ProgressLabel, ProgressValue } from '@/libraries/shared/shadcn/ui/progress';

const SetupStep3 = () => {
    const {
        stepsModel: { step, progressBar },
    } = useInstallationContext();

    return (
        <Installation.Step className={cn({ hidden: step !== 3 })}>
            <FieldSet>
                <FieldLegend>
                    <JIcon icon="cogs" className="me-1" />
                    <JText text="INSTL_PROGRESS" />
                </FieldLegend>
            </FieldSet>

            <Progress {...progressBar} className="w-full">
                <ProgressLabel>
                    <JText text="INSTL_IN_PROGRESS" />
                </ProgressLabel>
                <ProgressValue />
            </Progress>
        </Installation.Step>
    );
};

export default SetupStep3;
