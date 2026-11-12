import type { Metadata } from 'next';

import { type InstLangTag, instlLangConfig } from '@/cms/installation/language';
import InstallationWizardProvider from '@/cms/installation/src/context/InstallationContext';
import { InstallationView } from '@/cms/installation/src/types';
import InstallWizard from '@/cms/installation/template';

import { getLocale } from '@/libraries/services/i18n';
import ApplicationProvider from '@/libraries/src/Application/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    icons: { other: linkedIcons },
};

const config = {
    clientId: 2,
    clientName: 'installation',
};

export default async ({ searchParams }: PageProps<'/installation/index'>) => {
    const locale = await getLocale(config.clientName);

    const search = await searchParams;
    const view = (search['view'] as InstallationView) ?? InstallationView.Setup;

    const languageMeta = instlLangConfig[locale as InstLangTag].metadata;

    return (
        <HTMLDocument locale={locale}>
            <ApplicationProvider clientId={config.clientId} name={config.clientName} defaultView={view}>
                <InstallationWizardProvider languageMeta={languageMeta}>
                    <InstallWizard />
                </InstallationWizardProvider>
            </ApplicationProvider>
        </HTMLDocument>
    );
};
