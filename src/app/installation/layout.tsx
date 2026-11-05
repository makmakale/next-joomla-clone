import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { isInstalled } from '@/libraries/services/installation/installation';
import ApplicationProvider from '@/libraries/src/Application/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import { linkedIcons } from '@/libraries/vendor/icons';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'NJC - Installation',
    icons: { other: linkedIcons },
};

export default async function InstallationLayout({ children }: { children: React.ReactNode }) {
    if (await isInstalled()) redirect('/');

    return (
        <HTMLDocument>
            <ApplicationProvider clientId={2} name="installation">
                {children}
            </ApplicationProvider>
        </HTMLDocument>
    );
}
