'use client';

import { cn } from '@/libraries/shared/shadcn/utils';
import { useLanguage } from '@/libraries/src/Language/Language';
import ThemeProvider from '@/libraries/src/Styles/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Roboto } from 'next/font/google';
import type { PropsWithChildren } from 'react';

import '@/libraries/shared/shadcn/globals.css';
import AlertProvider from '@/libraries/src/Alert/Alert';

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans' });
let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
    if (typeof window === 'undefined') return new QueryClient();
    browserQueryClient ??= new QueryClient();

    return browserQueryClient;
}

const WebApplication = ({ children }: PropsWithChildren) => {
    const { locale } = useLanguage();

    return (
        <html lang={locale} suppressHydrationWarning className={cn('flex min-h-full flex-col', roboto.className)}>
            <body>
                <ThemeProvider>
                    <QueryClientProvider client={getQueryClient()}>
                        <AlertProvider>{children}</AlertProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default WebApplication;
