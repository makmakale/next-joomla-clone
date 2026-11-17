import type { Metadata } from 'next';

import {
    InstallApplication,
    getInstalledLangsAdministrator,
    getInstalledLangsFrontend,
    getLanguageOptions,
    loadUpdates,
} from '@/cms/installation';
import InstallWizard from '@/cms/installation/template';

import { getTranslations } from '@/libraries/src/Language';

export const generateMetadata = async (): Promise<Metadata> => {
    const t = await getTranslations();

    return {
        title: t('INSTL_PAGE_TITLE'),
    };
};

export default async () => {
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
        <InstallApplication languageOptions={languageOptions} installedLanguages={installedLanguages}>
            <InstallWizard />
        </InstallApplication>
    );
};
