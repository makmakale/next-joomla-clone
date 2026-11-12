'use client';

import { createContext, use, useCallback, useLayoutEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

import type { Locale } from '@/libraries/src/Language/Language.types';

interface Props {
    name: string;
    defaultLocale?: string;
}

const useContextValue = ({ name, defaultLocale }: Props) => {
    const [locale, setLocale] = useState<Locale>(defaultLocale ?? navigator.language);

    useLayoutEffect(() => {
        if (!defaultLocale) {
            document.cookie = `web.locale.${name}=${navigator.language}; path=/; max-age=31560000`;
        }
    }, [name, locale]);

    const changeLanguage = useCallback(
        (newLocale: string) => {
            setLocale(newLocale);
            document.cookie = `web.locale.${name}=${newLocale}; path=/; max-age=31560000`;
        },
        [name],
    );

    return { locale, changeLanguage };
};

const LanguageContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useLanguage = () => {
    const context = use(LanguageContext);
    if (!context) throw new Error('useLanguage should be used within <LanguageProvider>');

    return context;
};

export default function LanguageProvider({ children, ...props }: PropsWithChildren<Props>) {
    const value = useContextValue(props);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
