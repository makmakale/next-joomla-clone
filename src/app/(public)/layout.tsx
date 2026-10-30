import { Roboto } from 'next/font/google';

import type { Metadata } from 'next';

import { getLocale } from '@/libraries/services/language';
import '@/libraries/shared/shadcn/globals.css';

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans-serif' });

export const metadata: Metadata = {
    title: 'NJC - Site',
    icons: {
        other: {
            rel: 'stylesheet',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
        },
    },
};

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
