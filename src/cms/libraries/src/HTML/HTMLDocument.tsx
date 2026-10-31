'use client';

import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

import { Roboto } from 'next/font/google';

import '@/libraries/shared/shadcn/globals.css';

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans-serif' });

interface HTMLDocumentProps extends PropsWithChildren {
    locale?: string;
}

const useContextValue = ({ locale }: Omit<HTMLDocumentProps, 'children'>) => {
    return {
        locale: locale ?? navigator.language,
    };
};

const HTMLDocumentContext = createContext<ReturnType<typeof useContextValue> | null>(null);

export const useHTMLDocument = () => {
    const context = use(HTMLDocumentContext);
    if (!context) throw new Error('useHTMLDocument should be used within <HTMLDocumentProvider>');

    return context;
};

export default function HTMLDocument({ children, ...props }: HTMLDocumentProps) {
    const value = useContextValue(props);

    return (
        <HTMLDocumentContext.Provider value={value}>
            <html lang={value.locale} suppressHydrationWarning>
                <body className={roboto.className}>{children}</body>
            </html>
        </HTMLDocumentContext.Provider>
    );
}
