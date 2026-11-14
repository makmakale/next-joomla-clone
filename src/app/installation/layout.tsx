import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { isInstalled } from '@/libraries/services/configuration';
import { ApplicationProvider } from '@/libraries/src/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import { LanguageProvider, getLanguage, loadMessages } from '@/libraries/src/Language';
import { SessionProvider } from '@/libraries/src/Session';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    icons: { other: linkedIcons },
};

export default async function Layout({ children }: LayoutProps<'/installation'>) {
    if (process.env.NODE_ENV === 'production') {
        if (await isInstalled()) redirect('/');
    }

    const locale = await getLanguage('installation');
    const messages = await loadMessages();
    const session = (await cookies()).get('web.session.installation')?.value;

    return (
        <LanguageProvider name="installation" defaultLocale={locale} defaultMessages={messages}>
            <ApplicationProvider clientId={2} name="installation">
                <SessionProvider cookieSession={session}>
                    <HTMLDocument>{children}</HTMLDocument>
                </SessionProvider>
            </ApplicationProvider>
        </LanguageProvider>
    );
}
