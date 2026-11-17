import { redirect } from 'next/navigation';

import { isInstalled } from '@/libraries/services/configuration';
import { AdministratorApplication } from '@/libraries/src/Application';

export default async function Layout({ children }: LayoutProps<'/administrator'>) {
    if (!(await isInstalled())) redirect('/installation');

    return <AdministratorApplication>{children}</AdministratorApplication>;
}
