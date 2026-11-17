'use client';

import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';

const InstlInstallLanguages = () => {
    return (
        <div className="flex flex-col gap-4">
            <Button>
                <JText text="INSTL_COMPLETE_ADD_EXTRA_LANGUAGE" />
            </Button>
        </div>
    );
};

export default InstlInstallLanguages;
