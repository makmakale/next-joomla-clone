'use client';

import type { PropsWithChildren } from 'react';

import { Roboto } from 'next/font/google';
import Link from 'next/link';

import '@/libraries/shared/shadcn/globals.css';
import { WebApplication } from '@/libraries/src/Application';
import { useLanguage } from '@/libraries/src/Language';

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans-serif' });

export default function HTMLDocument({ children }: PropsWithChildren) {
    const { locale } = useLanguage();

    return (
        <html lang={locale.toLowerCase()} suppressHydrationWarning>
            <body className={roboto.className}>
                <div className="absolute top-0 z-50 flex w-full gap-4 bg-red-300 px-4">
                    <Link href="/">Site</Link>
                    <Link href="/administrator">Administrator</Link>
                    <Link href="/installation">Installation</Link>
                </div>

                <WebApplication>{children}</WebApplication>
            </body>
        </html>
    );
}
