import { redirect } from 'next/navigation';

import {
    InstallProvider,
    InstallationApplication,
    getInstalledLangsAdministrator,
    getInstalledLangsFrontend,
    getLanguageOptions,
} from '@/cms/installation';

import { isInstalled } from '@/libraries/services/configuration';

export default async function Layout({ defines }: LayoutProps<'/installation'>) {
    if (await isInstalled()) redirect('/');

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
        <InstallationApplication>
            {defines}
            <InstallProvider languageOptions={languageOptions} installedLanguages={installedLanguages} />
        </InstallationApplication>
    );
}
