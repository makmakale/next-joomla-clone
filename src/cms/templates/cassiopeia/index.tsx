'use client';

import type { PropsWithChildren } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import { useTranslations } from '@/libraries/src/Language';

const Cassiopeia = ({ children }: PropsWithChildren) => {
    const t = useTranslations();

    return (
        <div className="bg-background flex h-dvh flex-col items-center justify-center gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>{t('CASSIOPEIA')}</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    );
};

export default Cassiopeia;
