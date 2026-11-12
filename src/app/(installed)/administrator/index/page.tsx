import type { Metadata } from 'next';

import { getAdminTemplate } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';

import { getLocale } from '@/libraries/services/i18n';
import ApplicationProvider from '@/libraries/src/Application/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getAdminSession } from '@/libraries/src/Session';
import Template from '@/libraries/src/Templates/Template';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    icons: { other: linkedIcons },
};

const config = {
    clientId: 1,
    clientName: 'administrator',
};

export default async ({ searchParams }: PageProps<'/index'>) => {
    const locale = await getLocale(config.clientName);
    const session = await getAdminSession();
    const modules = await getModuleList(config.clientId);
    const template = await getAdminTemplate();

    const search = await searchParams;
    const option = (search['option'] as string) ?? 'com_cpanel';

    return (
        <HTMLDocument locale={locale}>
            <ApplicationProvider
                clientId={config.clientId}
                name={config.clientName}
                defaultOption={session ? option : 'com_login'}
                session={session}
                template={template}
                modules={modules}
            >
                <Template />
            </ApplicationProvider>
        </HTMLDocument>
    );
};
