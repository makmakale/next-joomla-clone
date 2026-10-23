'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use, useCallback, useState } from 'react';

export type AlertType = 'default' | 'info' | 'warning' | 'error';

export type MessageType = {
    type: AlertType;
    title: string;
    description?: string | string[];
};

const useContextValue = () => {
    const [message, setMessage] = useState<MessageType | undefined>();

    const setInfoMessage = useCallback((message: Omit<MessageType, 'type'>) => {
        setMessage({ ...message, type: 'info' });
    }, []);

    const setWarningMessage = useCallback((message: Omit<MessageType, 'type'>) => {
        setMessage({ ...message, type: 'warning' });
    }, []);

    const setErrorMessage = useCallback((message: Omit<MessageType, 'type'>) => {
        setMessage({ ...message, type: 'error' });
    }, []);

    const clearMessage = useCallback(() => {
        setMessage(undefined);
    }, []);

    return {
        message,
        setInfoMessage,
        setWarningMessage,
        setErrorMessage,
        clearMessage,
    };
};

const AlertContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useAlert = () => {
    const context = use(AlertContext);
    if (!context) throw new Error('useAlert should be used within <AlertProvider>');

    return context;
};

export default function AlertProvider({ children }: PropsWithChildren) {
    const value = useContextValue();

    return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}
