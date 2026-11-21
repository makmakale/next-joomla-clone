'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import type { LanguageProps } from '@/libraries/src/Language';
import { useCtxValue } from '@/libraries/src/Language';

const LanguageContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useLanguageContext = () => {
    const context = use(LanguageContext);
    if (!context) throw new Error('useLanguageContext should be used within <Language>');

    return context;
};

export function Language({ children, ...props }: PropsWithChildren<LanguageProps>) {
    const value = useCtxValue(props);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
