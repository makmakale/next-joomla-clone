import { Roboto } from 'next/font/google';

import type { Metadata } from 'next';

import '@/libraries/shared/shadcn/globals.css';
import { linkedIcons } from '@/libraries/vendor/icons';
import { TanstackQuery } from '@/libraries/vendor/wrappers';

export const metadata: Metadata = {
    icons: { other: linkedIcons },
};

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans-serif' });

export default async function Layout({ children }: LayoutProps<'/'>) {
    return (
        <html suppressHydrationWarning>
            <body className={roboto.className}>
                <TanstackQuery>{children}</TanstackQuery>
            </body>
        </html>
    );
}
