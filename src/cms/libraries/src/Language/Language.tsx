'use client';

import type { PropsWithChildren } from 'react';
import { use, createContext } from 'react';

interface LanguageProps {
    locale: string;
}

const useContextValue = (props: LanguageProps) => {
    return { ...props };
};

const LanguageContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useLanguage = () => {
    const context = use(LanguageContext);
    if (!context) throw new Error('useLanguage should be used within <LanguageProvider>');

    return context;
};

export default function LanguageProvider({ children, ...props }: PropsWithChildren<LanguageProps>) {
    const value = useContextValue(props);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
