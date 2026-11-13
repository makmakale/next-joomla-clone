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

async function Layout({ children }: LayoutProps<'/'>) {
    const defaultLocale = (await cookies()).get('web.locale.site')?.value;

    return (
        <LanguageProvider name="site" defaultLocale={defaultLocale}>
            <ApplicationProvider clientId={0} name="site">
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
