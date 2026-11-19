'use client';

import { RemoveSteps, useInstallationContext } from '@/cms/installation';

import JIcon from '@/libraries/shared/components/Icon';
import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';

export const NoInternet = () => {
    const {
        setupModel: { goToStep },
    } = useInstallationContext();

    return (
        <>
            <p>
                <JText text="INSTL_LANGUAGES_WARNING_NO_INTERNET" />
            </p>
            <p>
                <Button onClick={() => goToStep(RemoveSteps.Congrat)}>
                    <JIcon icon="arrow-left" className="me-1" />
                    <JText text="INSTL_LANGUAGES_WARNING_BACK_BUTTON" />
                </Button>
            </p>
            <p>
                <JText text="INSTL_LANGUAGES_WARNING_NO_INTERNET2" />
            </p>
        </>
    );
};
