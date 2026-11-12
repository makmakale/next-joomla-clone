import { cookies } from 'next/headers';

import type { Metadata } from 'next';

import ApplicationProvider from '@/libraries/src/Application/Application';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import LanguageProvider from '@/libraries/src/Language/Language';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    icons: { other: linkedIcons },
};

export default async ({ children }: LayoutProps<'/installation'>) => {
    const defaultLocale = (await cookies()).get('web.locale.installation')?.value;

    return (
        <LanguageProvider name="installation" defaultLocale={defaultLocale}>
            <ApplicationProvider clientId={2} name="installation">
                <HTMLDocument>{children}</HTMLDocument>
            </ApplicationProvider>
        </LanguageProvider>
    );
};
