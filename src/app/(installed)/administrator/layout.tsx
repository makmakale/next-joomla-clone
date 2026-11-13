import { Suspense } from 'react';

import { cookies } from 'next/headers';

import type { Metadata } from 'next';

import { getConfiguration } from '@/libraries/services/configuration';
import { ApplicationProvider } from '@/libraries/src/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import LanguageProvider from '@/libraries/src/Language/Language';
import SessionProvider from '@/libraries/src/Session/provider/SessionProvider';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    icons: { other: linkedIcons },
};

async function Layout({ children }: LayoutProps<'/administrator'>) {
    const configuration = await getConfiguration();
    const defaultLocale = (await cookies()).get('web.locale.administrator')?.value;
    const session = (await cookies()).get('web.session.administrator')?.value;

    return (
        <LanguageProvider name="administrator" defaultLocale={defaultLocale}>
            <ApplicationProvider clientId={1} name="administrator" configuration={configuration}>
                <SessionProvider cookieSession={session}>
                    <HTMLDocument>{children}</HTMLDocument>
                </SessionProvider>
            </ApplicationProvider>
        </LanguageProvider>
    );
}

export default (props: LayoutProps<'/administrator'>) => {
    return (
        <Suspense fallback={null}>
            <Layout {...props} />
        </Suspense>
    );
};
