import type { PropsWithChildren } from 'react';

import { Application } from '@/libraries/src/Application';
import { Language, getLanguageMetadata, getLocale, loadMessages } from '@/libraries/src/Language';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

export async function InstallationApplication({ children }: PropsWithChildren) {
    // Language
    const locale = await getLocale('installation');
    const localeMetadata = await getLanguageMetadata('installation', locale);
    const messages = await loadMessages(undefined, locale);

    return (
        <Application clientId={2} name="installation">
            <ThemeProvider storageKey="web.theme.installation" defaultTheme="light">
                <Language locale={locale} metadata={localeMetadata} messages={messages}>
                    {children}
                </Language>
            </ThemeProvider>
        </Application>
    );
}
