import { redirect } from 'next/navigation';

import { isInstalled } from '@/libraries/services/configuration';
import { SiteApplication } from '@/libraries/src/Application';

export default async function Layout({ children }: LayoutProps<'/'>) {
    if (!(await isInstalled())) redirect('/installation');

    return <SiteApplication>{children}</SiteApplication>;
}
