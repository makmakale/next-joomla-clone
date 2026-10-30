import { getSiteTemplates } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';

import { getLocale } from '@/libraries/services/language';
import ApplicationProvider from '@/libraries/src/Application/Application';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getSession } from '@/libraries/src/Session';

export default async function SiteLayout() {
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
