import { Suspense } from 'react';

import { cookies } from 'next/headers';

import type { Metadata } from 'next';

import ApplicationProvider from '@/libraries/src/Application/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import LanguageProvider from '@/libraries/src/Language/Language';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    icons: { other: linkedIcons },
};

async function Layout({ children }: LayoutProps<'/administrator'>) {
    const defaultLocale = (await cookies()).get('web.locale.administrator')?.value;

    return (
        <LanguageProvider name="administrator" defaultLocale={defaultLocale}>
            <ApplicationProvider clientId={1} name="administrator">
                <HTMLDocument>{children}</HTMLDocument>
            </ApplicationProvider>
        </LanguageProvider>
    );
}

export default (props: LayoutProps<'/'>) => {
    return (
        <Suspense fallback={null}>
            <Layout {...props} />
        </Suspense>
    );
};
