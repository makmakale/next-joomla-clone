'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

const useCtxValue = (session: unknown | null | undefined) => {
    return { session };
};

const SessionContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useSessionContext = () => {
    const context = use(SessionContext);
    if (!context) throw new Error('useSession should be used within <SessionProvider>');

    return context;
};

export function SessionProvider({ children, session }: PropsWithChildren<{ session: unknown | null | undefined }>) {
    const value = useCtxValue(session);

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
