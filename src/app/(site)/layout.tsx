import SiteApplication from '@/libraries/src/Application/SiteApplication';
import WebApplication from '@/libraries/src/Application/WebApplication';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NJC - Site',
};

export default async function RootSiteLayout({ children }: LayoutProps<'/'>) {
    const locale = await getLocale('site');

    return (
        <SiteApplication locale={locale}>
            <WebApplication>{children}</WebApplication>
        </SiteApplication>
    );
}
