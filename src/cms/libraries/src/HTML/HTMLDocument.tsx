'use client';

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { createContext, use } from 'react';

import { Roboto } from 'next/font/google';
import Link from 'next/link';

import { getClientName } from '@/libraries/services/application';
import '@/libraries/shared/shadcn/globals.css';
import { TanstackQuery } from '@/libraries/vendor/wrappers';

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans-serif' });

interface HTMLDocumentProps extends PropsWithChildren {
    locale?: string;
}

const useContextValue = ({ locale }: Omit<HTMLDocumentProps, 'children'>) => {
    const [docLang, setDocLang] = useState<string>(locale ?? navigator.language);

    useEffect(() => {
        if (!locale) {
            getClientName().then(clientName => {
                document.cookie = `web.locale.${clientName}=${navigator.language}; path=/; max-age=3600`;
            });
        }
    }, [locale]);

    const changeLanguage = useCallback((lang: string) => {
        setDocLang(lang);
    }, []);

    return {
        locale: docLang,
        changeLanguage,
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
            <html lang={value.locale.toLowerCase()} suppressHydrationWarning>
                <body className={roboto.className}>
                    <div className="absolute top-0 z-50 flex w-full gap-4 bg-red-300 px-4">
                        <Link href="/">Site</Link>
                        <Link href="/administrator">Administrator</Link>
                        <Link href="/installation">Installation</Link>
                    </div>

                    <TanstackQuery>{children}</TanstackQuery>
                </body>
            </html>
        </HTMLDocumentContext.Provider>
    );
}
