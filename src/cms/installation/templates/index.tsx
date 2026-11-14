import type { PropsWithChildren } from 'react';

import JText from '@/libraries/shared/components/Text';
import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';

const InstallationTemplate = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-background flex h-dvh flex-col items-center justify-center gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <JText text="INSTL_PAGE_TITLE" />
                    </CardTitle>
                    <CardAction>
                        <Button variant="ghost" size="icon">
                            ?
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    );
};

export default InstallationTemplate;
