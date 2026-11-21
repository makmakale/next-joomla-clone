import { Language, getLanguageMetadata, getLocale, loadMessages } from '@/libraries/src/Language';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

import { Application } from './Application';

export async function SiteApplication({ children }: LayoutProps<'/'>) {
    // Language
    const locale = await getLocale('site');
    const metadata = await getLanguageMetadata('site', locale);
    const messages = await loadMessages(undefined, locale);

    return (
        <Application clientId={0} name="site">
            <ThemeProvider storageKey="web.theme.site" defaultTheme="light">
                <Language locale={locale} messages={messages} metadata={metadata}>
                    {children}
                </Language>
            </ThemeProvider>
        </Application>
    );
}
