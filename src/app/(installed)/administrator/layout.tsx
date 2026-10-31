import type { Metadata } from 'next';

import { getAdminTemplate } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';

import { getLocale } from '@/libraries/services/language';
import Application from '@/libraries/src/Application/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getAdminSession } from '@/libraries/src/Session';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    title: 'NJC - Administrator',
    icons: { other: linkedIcons },
};

export default async function RootAdministratorLayout() {
    const locale = await getLocale();
    const session = await getAdminSession();
    const modules = await getModuleList(1);
    const template = await getAdminTemplate();

    return (
        <HTMLDocument initLang={locale}>
            <Application
                initialValues={{
                    clientId: 1,
                    name: 'administrator',
                    locale,
                    session,
                    modules,
                    template,
                }}
            />
        </HTMLDocument>
    );
}
