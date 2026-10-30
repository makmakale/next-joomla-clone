'use client';

import { Button } from '@/libraries/shared/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import { useApplication } from '@/libraries/src/Application/Application';
import { signIn, signOut } from '@/libraries/src/Authentication';

export default () => {
    const { session, name } = useApplication();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                {session ? (
                    <div>
                        <p>Welcome</p>
                        <Button onClick={() => signOut(name)}>Log out</Button>
                    </div>
                ) : (
                    <Button onClick={() => signIn(name)}>Log in</Button>
                )}
            </CardContent>
        </Card>
    );
};
