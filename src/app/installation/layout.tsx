import { redirect } from 'next/navigation';

import { InstallApplication } from '@/cms/installation';

import { isInstalled } from '@/libraries/services/configuration';

export default async function Layout({ children }: LayoutProps<'/'>) {
    // if (process.env.NODE_ENV === 'production') {
    if (await isInstalled()) redirect('/');
    // }

    return <InstallApplication>{children}</InstallApplication>;
}
