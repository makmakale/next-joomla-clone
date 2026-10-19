'use client';

import { cn } from '@/libraries/shared/shadcn/utils';
import { useLanguage } from '@/libraries/src/Language/Language';
import ThemeProvider from '@/libraries/src/Styles/ThemeProvider';
import { Roboto } from 'next/font/google';
import type { PropsWithChildren } from 'react';

import '@/libraries/shared/shadcn/globals.css';

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans' });

const WebApplication = ({ children }: PropsWithChildren) => {
    const { locale } = useLanguage();

    return (
        <html lang={locale} suppressHydrationWarning className={cn('min-h-full flex flex-col', roboto.className)}>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
};

export default WebApplication;
