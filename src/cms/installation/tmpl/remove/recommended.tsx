'use client';

import Link from 'next/link';

import { cn } from 'cn';

import { RemoveSteps, useInstallationContext } from '@/cms/installation';

import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardContent } from '@/libraries/shared/shadcn/ui/card';

const Recommended = () => {
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

                    <Button
                        nativeButton={false}
                        render={
                            <Link href="/" target="_blank">
                                <JText text="INSTL_COMPLETE_SITE_BTN" />
                            </Link>
                        }
                    />
                    <Button
                        nativeButton={false}
                        render={
                            <Link href="/administrator" target="_blank">
                                <JText text="INSTL_COMPLETE_ADMIN_BTN" />
                            </Link>
                        }
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default Recommended;
