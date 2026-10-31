import type { Metadata } from 'next';

import { getSiteTemplates } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';

import { getLocale } from '@/libraries/services/language';
import ApplicationProvider from '@/libraries/src/Application/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getSession } from '@/libraries/src/Session';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    title: 'NJC - Site',
    icons: { other: linkedIcons },
};

export default async function SiteLayout() {
    const locale = await getLocale();
    const session = await getSession('site');
    const modules = await getModuleList(0);
    const template = await getSiteTemplates();

    return (
        <HTMLDocument initLang={locale}>
            <ApplicationProvider
                initialValues={{
                    clientId: 0,
                    name: 'site',
                    locale,
                    session,
                    modules,
                    template,
                }}
            />
        </HTMLDocument>
    );
}
