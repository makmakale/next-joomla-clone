import { Roboto } from 'next/font/google';

import type { Metadata } from 'next';

import { TooltipProvider } from '@/libraries/shared/shadcn/ui/tooltip';
import { getLocale } from '@/libraries/src/Language';
import { linkedIcons } from '@/libraries/vendor/icons';
import { TanstackQuery } from '@/libraries/vendor/wrappers';

import '@/libraries/shared/shadcn/globals.css';

export const metadata: Metadata = {
    icons: { other: linkedIcons },
};

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans-serif' });

export default async function Layout({ children }: LayoutProps<'/'>) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={roboto.className}>
                <TanstackQuery>
                    <TooltipProvider>{children}</TooltipProvider>
                </TanstackQuery>
            </body>
        </html>
    );
}
