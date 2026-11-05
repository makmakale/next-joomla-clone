'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/libraries/shared/shadcn/ui/card';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';

export default function GlobalError({ error }: { error: Error; retry: () => void }) {
    let message = error?.message ?? '';

    if (message.startsWith('Failed query: select')) {
        message = 'DB_ERROR';
    }

    return (
        <HTMLDocument>
            <main className="flex h-dvh w-full items-center justify-center bg-red-100">
                <Card className="min-w-96">
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{message}</p>
                    </CardContent>
                </Card>
            </main>
        </HTMLDocument>
    );
}
