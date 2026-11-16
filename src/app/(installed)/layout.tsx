import { redirect } from 'next/navigation';

import { isInstalled } from '@/libraries/services/configuration';

export const dynamic = 'force-dynamic';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    // if (process.env.NODE_ENV === 'production') {
    if (!(await isInstalled())) redirect('/installation');
    // }

    return children;
}
