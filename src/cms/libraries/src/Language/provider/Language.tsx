'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import { useCtxValue } from '@/libraries/src/Language';

const LanguageContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useLanguageContext = () => {
    const context = use(LanguageContext);
    if (!context) throw new Error('useLanguageContext should be used within <Language>');

    return context;
};

export default function Language({ children }: PropsWithChildren) {
    const value = useCtxValue();

    if (value.isLoading) return null;

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
