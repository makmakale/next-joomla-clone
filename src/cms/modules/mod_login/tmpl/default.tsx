'use client';

import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import { useApplication } from '@/libraries/src/Application/Application';

export default () => {
    const { session } = useApplication();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                {session ? (
                    <div>
                        <p>Welcome</p>
                        <Button>Log out</Button>
                    </div>
                ) : (
                    <Button>Log in</Button>
                )}
            </CardContent>
        </Card>
    );
};
