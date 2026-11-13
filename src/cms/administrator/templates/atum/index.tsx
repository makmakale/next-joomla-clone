import type { PropsWithChildren } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';

const Atum = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-background flex h-dvh flex-col items-center justify-center gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Atum</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    );
};

export default Atum;
