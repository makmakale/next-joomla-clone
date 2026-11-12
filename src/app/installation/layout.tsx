import { redirect } from 'next/navigation';

import { isInstalled } from '@/libraries/services/installation/installation';

export default async function InstallationLayout({ children }: { children: React.ReactNode }) {
    if (process.env.NODE_ENV === 'production') {
        if (await isInstalled()) redirect('/');
    }

    return children;
}
