import { redirect } from 'next/navigation';

import { getSiteTemplates } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';

import { isInstalled } from '@/libraries/services/installation/installation';
import { getLocale } from '@/libraries/services/language';
import ApplicationProvider from '@/libraries/src/Application/Application';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getSession } from '@/libraries/src/Session';

export const dynamic = 'force-dynamic';

export default async function SiteLayout() {
    if (!(await isInstalled())) redirect('/installation');

    const locale = await getLocale();
    const session = await getSession('site');
    const modules = await getModuleList(0);
    const template = await getSiteTemplates();

    return (
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
    );
}
