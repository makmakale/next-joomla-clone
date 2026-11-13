'use client';

import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import { useSessionContext } from '@/libraries/src/Session';

export default () => {
    const { fakeLogIn } = useSessionContext();

    return (
        <Card className="min-w-96">
            <CardHeader>
                <CardTitle>Login Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={() => fakeLogIn()}>Log in</Button>
            </CardContent>
        </Card>
    );
};
