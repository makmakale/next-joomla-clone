'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

const useCtxValue = () => {
    return {};
};

const ComLoginContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useComLoginContext = () => {
    const context = use(ComLoginContext);
    if (!context) throw new Error('useComLogin should be used within <ComLoginProvider>');

    return context;
};

export default function ComLoginProvider({ children }: PropsWithChildren) {
    const value = useCtxValue();

    return <ComLoginContext.Provider value={value}>{children}</ComLoginContext.Provider>;
}
