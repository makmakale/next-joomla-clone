import type { Metadata } from 'next';

import { getLocaleFromHeaders } from '@/libraries/services/language';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    title: 'NJC - Installation',
    icons: { other: linkedIcons },
};

export default async function InstallationLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocaleFromHeaders();

    return <HTMLDocument initLang={locale}>{children}</HTMLDocument>;
}
