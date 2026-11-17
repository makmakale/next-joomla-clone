import { redirect } from 'next/navigation';

import { InstallApplication } from '@/cms/installation';

import { isInstalled } from '@/libraries/services/configuration';
import { Application } from '@/libraries/src/Application';
import { getLanguageMetadata, getLocale, loadMessages } from '@/libraries/src/Language';
import Language from '@/libraries/src/Language/provider/Language';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

export default async function Layout({ children }: LayoutProps<'/installation'>) {
    if (process.env.NODE_ENV === 'production') {
        if (await isInstalled()) redirect('/');
    }

    // Language
    const locale = await getLocale('installation');
    const localeMetadata = await getLanguageMetadata('installation', locale);
    const messages = await loadMessages(undefined, locale);

    return (
        <Application clientId={2} name="installation">
            <ThemeProvider storageKey="web.theme.installation" defaultTheme="light">
                <Language locale={locale} metadata={localeMetadata} messages={messages}>
                    <InstallApplication>{children}</InstallApplication>
                </Language>
            </ThemeProvider>
        </Application>
    );
}
