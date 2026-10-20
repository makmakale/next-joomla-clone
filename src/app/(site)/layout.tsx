import SiteApplication from '@/libraries/src/Application/SiteApplication';
import WebApplication from '@/libraries/src/Application/WebApplication';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import Template from '@/libraries/src/Templates/Template';
import { getTemplates } from '@/libraries/src/Templates/Template.actionsServer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NJC - Site',
};

export default async function RootSiteLayout({ children }: LayoutProps<'/'>) {
    const locale = await getLocale('site');
    const template = await getTemplates(0);

    return (
        <SiteApplication locale={locale} template={template}>
            <WebApplication>
                <Template>{children}</Template>
            </WebApplication>
        </SiteApplication>
    );
}
