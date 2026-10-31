import { redirect } from 'next/navigation';

import { isInstalled } from '@/libraries/services/installation/installation';

export const dynamic = 'force-dynamic';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    if (!(await isInstalled())) redirect('/installation');

    return children;
}
