'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import { useLanguageContextValue } from '@/libraries/src/Language';

const LanguageContext = createContext<ReturnType<typeof useLanguageContextValue> | null>(null);

export const useLanguageContext = () => {
    const context = use(LanguageContext);
    if (!context) throw new Error('useLanguage should be used within <Language>');

    return context;
};

export default function Language({ children }: PropsWithChildren) {
    const value = useLanguageContextValue();

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
