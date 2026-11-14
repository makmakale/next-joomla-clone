'use client';

import { createContext, useCallback, useLayoutEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

import type { Locale, Messages } from '@/libraries/src/Language';
import { useLanguage } from '@/libraries/src/Language';

interface Props {
    name: string;
    defaultLocale?: string;
    defaultMessages?: Messages;
}

const useContextValue = ({ name, defaultLocale, defaultMessages = {} }: Props) => {
    const [locale, setLocale] = useState<Locale>(defaultLocale ?? navigator.language);
    const [messages, setMessages] = useState<Messages>(defaultMessages);

    useLayoutEffect(() => {
        if (!defaultLocale) {
            document.cookie = `web.locale.${name}=${navigator.language}; path=/; max-age=31560000`;
            window.location.reload();
        }
    }, [name, locale]);

    const changeLanguage = useCallback(
        (newLocale: string) => {
            setLocale(newLocale);
            document.cookie = `web.locale.${name}=${newLocale}; path=/; max-age=31560000`;
            window.location.reload();
        },
        [name],
    );

    const mergeMessages = useCallback((newMessages: Messages) => {
        setMessages(prev => ({ ...prev, ...newMessages }));
    }, []);

    return { locale, changeLanguage, messages, mergeMessages };
};

export const LanguageContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export function LanguageProvider({ children, ...props }: PropsWithChildren<Props>) {
    const value = useContextValue(props);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function LoadMessages({ messages }: { messages: Messages }) {
    const { mergeMessages } = useLanguage();

    useLayoutEffect(() => {
        mergeMessages(messages);
    }, [messages]);

    return null;
}
