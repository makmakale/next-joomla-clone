'use client';

import { Installation } from '@/cms/installation/template/ui';

import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { CardContent } from '@/libraries/shared/shadcn/ui/card';

const InstlRecommended = () => {
    return (
        <Installation.Step>
            <CardContent>
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
        </Installation.Step>
    );
};

export default InstlRecommended;
