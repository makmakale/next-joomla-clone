import { redirect } from 'next/navigation';

import { isInstalled } from '@/libraries/services/configuration';

export default async function Layout({ children }: { children: React.ReactNode }) {
    if (process.env.NODE_ENV === 'production') {
        if (!(await isInstalled())) redirect('/installation');
    }

    return children;
}
