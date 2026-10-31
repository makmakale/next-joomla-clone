import type { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

import { getLocale } from '@/libraries/services/language';
import HTMLDocument from '@/libraries/src/HTML/HTMLDocument';
import { linkedIcons } from '@/libraries/vendor/icons';

export const metadata: Metadata = {
    title: 'NJC - Administrator',
    icons: { other: linkedIcons },
};

export default async ({ children }: PropsWithChildren) => {
    const locale = await getLocale();

    return <HTMLDocument locale={locale}>{children}</HTMLDocument>;
};
