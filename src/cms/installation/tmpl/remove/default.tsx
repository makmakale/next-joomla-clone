'use client';

import { cn } from 'cn';

import { InstallationView, RemoveSteps, useInstallationContext } from '@/cms/installation';
import SetDefaultLanguages from '@/cms/installation/tmpl/remove/defaultLanguages';
import InstlRecommended from '@/cms/installation/tmpl/remove/recommended';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import { useApplication } from '@/libraries/src/Application';
import { useLanguageContext } from '@/libraries/src/Language';

import InstallAdditionalLanguages from './components/installLanguages';

const Remove = () => {
    const { getInput } = useApplication();
    const { metadata } = useLanguageContext();
    const {
        setupModel: { step, goToStep },
    } = useInstallationContext();

    const input = getInput();
    const view = input.get('view');

    const direction = metadata.rtl ? 'left' : 'right';

    return (
        <div className={cn('space-y-6', { hidden: view !== InstallationView.Remove })}>
            <Card className={cn({ hidden: step !== RemoveSteps.Congrat })}>
                <CardHeader>
                    <CardTitle>
                        <JIcon icon="trophy" className="me-1" />
                        <JText text="INSTL_COMPLETE_CONGRAT" />
                    </CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                    <h2 className="mt-6 mb-4 text-[calc(1.275rem+0.3vw)] font-semibold">
                        <JText text="INSTL_COMPLETE_TITLE" />
                    </h2>

                    <div className="flex flex-col gap-4">
                        <Button onClick={() => goToStep('installAddFeatures')}>
                            <JText text="INSTL_COMPLETE_ADD_EXTRA_LANGUAGE" />
                            <JIcon icon={`chevron-${direction}`} className="me-1" />
                        </Button>

                        <SetDefaultLanguages />
                    </div>
                </CardContent>
            </Card>

            <InstlRecommended />

            <InstallAdditionalLanguages />
        </div>
    );
};

export default Remove;
