import type { PropsWithChildren } from 'react';

import { Language, getLanguageMetadata, getLocale, loadMessages } from '@/libraries/src/Language';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

import { Application } from '../../provider/Application';

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
