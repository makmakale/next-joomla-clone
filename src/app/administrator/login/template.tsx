'use client';

import { useApplication } from '@/libraries/src/Application/Application';
import type { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

export default function Template({ children }: PropsWithChildren) {
    const { session } = useApplication();

    if (session) {
        return redirect('/administrator');
    }

    return <>{children}</>;
}
