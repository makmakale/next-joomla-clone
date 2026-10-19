import { cn } from '@/libraries/shared/shadcn/utils';
import { Roboto } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import React from 'react';

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans' });

interface HTMLProviderProps extends PropsWithChildren {
    locale: string;
}

const WebApplication = ({ locale, children }: HTMLProviderProps) => {
    return (
        <html lang={locale} suppressHydrationWarning className={cn('min-h-full flex flex-col', roboto.className)}>
            <body>{children}</body>
        </html>
    );
};

export default WebApplication;
