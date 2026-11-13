import type { PropsWithChildren } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';

const Cassiopeia = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-background flex h-dvh flex-col items-center justify-center gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Cassiopeia</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    );
};

export default Cassiopeia;
