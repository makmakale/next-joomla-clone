import { getInstalledLangsAdministrator, getInstalledLangsFrontend, getLanguageOptions, loadUpdates } from '@/cms/installation';

import { Application } from '@/libraries/src/Application';
import { getLanguageMetadata, getLocale, loadMessages } from '@/libraries/src/Language';
import Language from '@/libraries/src/Language/provider/Language';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

import { InstallProvider } from '../../includes/app';

export async function InstallationApplication() {
    // Language
    const locale = await getLocale('installation');
    const localeMetadata = await getLanguageMetadata('installation', locale);
    const messages = await loadMessages(undefined, locale);

    // check updates
    await loadUpdates();

    // language options
    const languageOptions = await getLanguageOptions();

    // Installed languages
    const siteLanguages = await getInstalledLangsFrontend();
    const adminLanguages = await getInstalledLangsAdministrator();
    const installedLanguages = {
        administrator: adminLanguages,
        frontend: siteLanguages,
    };

    return (
        <Application clientId={2} name="installation">
            <ThemeProvider storageKey="web.theme.installation" defaultTheme="light">
                <Language locale={locale} metadata={localeMetadata} messages={messages}>
                    <InstallProvider languageOptions={languageOptions} installedLanguages={installedLanguages} />
                </Language>
            </ThemeProvider>
        </Application>
    );
}
