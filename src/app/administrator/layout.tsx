import { redirect } from 'next/navigation';

import { isInstalled } from '@/libraries/services/configuration';
import { AdministratorApplication } from '@/libraries/src/Application';
import { SessionProvider, getAdminSession } from '@/libraries/src/Session';
import { TemplateProvider, getAdminTemplate } from '@/libraries/src/Template';

export default async function Layout({ defines }: LayoutProps<'/administrator'>) {
    if (!(await isInstalled())) redirect('/installation');

    const session = await getAdminSession();
    const template = await getAdminTemplate();

    return (
        <AdministratorApplication>
            <SessionProvider session={session}>
                {defines}
                <TemplateProvider template={template} />
            </SessionProvider>
        </AdministratorApplication>
    );
}
