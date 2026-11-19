import type { PropsWithChildren } from 'react';

import { Application } from '@/libraries/src/Application';
import { getLanguageMetadata, getLocale, loadMessages } from '@/libraries/src/Language';
import Language from '@/libraries/src/Language/provider/Language';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

export async function AdministratorApplication({ children }: PropsWithChildren) {
    // Language
    const locale = await getLocale('administrator');
    const metadata = await getLanguageMetadata('administrator', locale);
    const messages = await loadMessages(undefined, locale);

    return (
        <Application clientId={1} name="administrator">
            <ThemeProvider storageKey="web.theme.administrator" defaultTheme="dark">
                <Language locale={locale} messages={messages} metadata={metadata}>
                    {children}
                </Language>
            </ThemeProvider>
        </Application>
    );
}
