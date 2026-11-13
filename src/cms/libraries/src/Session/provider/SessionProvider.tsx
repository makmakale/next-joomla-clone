'use client';

import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { createContext, use, useState } from 'react';

import { useApplication } from '@/libraries/src/Application/Application';

interface Props {
    cookieSession?: string;
}

const defaultSession = {
    user: null,
    guest: true,
};

const useCtxValue = ({ cookieSession }: Props) => {
    const [session, setSession] = useState(cookieSession ? JSON.parse(cookieSession) : defaultSession);
    const { name } = useApplication();

    const fakeLogIn = useCallback(() => {
        const fakeUser = {
            user: {
                id: 1,
                name: 'Super Admin',
            },
            guest: false,
        };
        setSession(fakeUser);

        document.cookie = `web.session.${name}=${JSON.stringify(fakeUser)}; path=/; max-age=31560000`;
        window.location.reload();
    }, [name]);

    const fakeLogOut = useCallback(() => {
        setSession(defaultSession);
        document.cookie = `web.session.${name}=; max-age=0`;
        window.location.reload();
    }, [name]);

    return {
        session,
        fakeLogIn,
        fakeLogOut,
    };
};

const SessionContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useSessionContext = () => {
    const context = use(SessionContext);
    if (!context) throw new Error('useSession should be used within <SessionProvider>');

    return context;
};

export default function SessionProvider({ children, ...props }: PropsWithChildren<Props>) {
    const value = useCtxValue(props);

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
