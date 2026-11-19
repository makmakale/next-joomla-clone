import type { PropsWithChildren } from 'react';

import { Application } from '@/libraries/src/Application';
import { getLanguageMetadata, getLocale, loadMessages } from '@/libraries/src/Language';
import Language from '@/libraries/src/Language/provider/Language';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

export async function SiteApplication({ children }: PropsWithChildren) {
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
