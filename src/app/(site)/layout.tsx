import WebApplication from '@/libraries/src/Application/WebApplication';
import Template from '@/libraries/src/Templates/Template';
import type { Metadata } from 'next';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getSiteTemplates } from '@/cms/administrator/com_templates/src/Model/StyleModel';
import ApplicationProvider from '@/libraries/src/Application/Application';
import LanguageProvider from '@/libraries/src/Language/Language';

export const metadata: Metadata = {
    title: 'NJC - Site',
    icons: {
        other: {
            rel: 'stylesheet',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
        },
    },
};

export default async function RootSiteLayout({ children }: LayoutProps<'/'>) {
    const locale = await getLocale('site');
    const modules = await getModuleList(0);
    const template = await getSiteTemplates();

    return (
        <ApplicationProvider
            initialValues={{
                clientId: 0,
                name: 'site',
                modules,
                template,
            }}
        >
            <LanguageProvider locale={locale}>
                <WebApplication>
                    <Template>{children}</Template>
                </WebApplication>
            </LanguageProvider>
        </ApplicationProvider>
    );
}
