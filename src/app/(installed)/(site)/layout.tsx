import { cookies } from 'next/headers';

import type { Metadata } from 'next';

import { getConfiguration } from '@/libraries/services/configuration';
import { ApplicationProvider } from '@/libraries/src/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import { LanguageProvider, getLanguage, loadMessages } from '@/libraries/src/Language';
import { SessionProvider } from '@/libraries/src/Session';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    icons: { other: linkedIcons },
};

export default async function Layout({ children }: LayoutProps<'/'>) {
    const configuration = await getConfiguration();
    const locale = await getLanguage('site');
    const messages = await loadMessages();
    const session = (await cookies()).get('web.session.site')?.value;

    return (
        <LanguageProvider name="site" defaultLocale={locale} defaultMessages={messages}>
            <ApplicationProvider clientId={0} name="site" configuration={configuration}>
                <SessionProvider cookieSession={session}>
                    <HTMLDocument>{children}</HTMLDocument>
                </SessionProvider>
            </ApplicationProvider>
        </LanguageProvider>
    );
}
