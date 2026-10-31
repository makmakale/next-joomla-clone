import { getSiteTemplates } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';

import ApplicationProvider from '@/libraries/src/Application/Application';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getSession } from '@/libraries/src/Session';

export default async function SiteApplication() {
    const session = await getSession('site');
    const modules = await getModuleList(0);
    const template = await getSiteTemplates();

    return (
        <ApplicationProvider
            clientId={0}
            name="site"
            defaultOption="com_content"
            session={session}
            template={template}
            modules={modules}
        />
    );
}
