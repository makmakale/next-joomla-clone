'use client';

import { cn } from 'cn';

import { RemoveSteps, useInstallationContext } from '@/cms/installation';

import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardContent } from '@/libraries/shared/shadcn/ui/card';

const InstlRecommended = () => {
    const {
        setupModel: { step },
    } = useInstallationContext();

    return (
        <Card className={cn({ hidden: step !== RemoveSteps.Congrat })}>
            <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                    <p>
                        <JText text="INSTL_PRECHECK_RECOMMENDED_SETTINGS_DESC" />
                    </p>

                    <Button>
                        <JText text="INSTL_COMPLETE_SITE_BTN" />
                    </Button>
                    <Button>
                        <JText text="INSTL_COMPLETE_ADMIN_BTN" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default InstlRecommended;
