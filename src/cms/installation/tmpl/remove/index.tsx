'use client';

import { cn } from 'cn';

import { useInstallationContext } from '@/cms/installation';
import { Installation } from '@/cms/installation/template/ui/installation';
import InstlDefaultLanguages from '@/cms/installation/tmpl/remove/defaultLanguages';
import InstlInstallLanguages from '@/cms/installation/tmpl/remove/installLanguages';
import InstlRecommended from '@/cms/installation/tmpl/remove/recommended';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';

const Remove = () => {
    const {
        stepsModel: { view },
    } = useInstallationContext();

    return (
        <div className={cn('space-y-6', { hidden: view !== 'remove' })}>
            <Installation.Step>
                <CardHeader>
                    <CardTitle>
                        <JIcon icon="trophy" className="me-1" />
                        <JText text="INSTL_COMPLETE_CONGRAT" />
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <h2 className="mt-6 mb-4 text-[calc(1.275rem+0.3vw)] font-semibold">
                        <JText text="INSTL_COMPLETE_TITLE" />
                    </h2>

                    <div className="flex flex-col gap-4">
                        <InstlInstallLanguages />

                        <InstlDefaultLanguages />
                    </div>
                </CardContent>
            </Installation.Step>

            <InstlRecommended />
        </div>
    );
};

export default Remove;
