import { getAdminTemplate } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';

import ApplicationProvider from '@/libraries/src/Application/Application';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getAdminSession } from '@/libraries/src/Session';

export default async function AdministratorApplication() {
    const session = await getAdminSession();
    const modules = await getModuleList(1);
    const template = await getAdminTemplate();

    return (
        <ApplicationProvider
            clientId={1}
            name="administrator"
            defaultOption={session ? 'com_cpanel' : 'com_login'}
            session={session}
            template={template}
            modules={modules}
        />
    );
}
