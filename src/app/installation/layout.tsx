import { redirect } from 'next/navigation';

import { isInstalled } from '@/libraries/services/configuration';

export default async function Layout({ children }: LayoutProps<'/installation'>) {
    if (await isInstalled()) redirect('/installation?view=setup&step=installCongrat');

    return children;
}
