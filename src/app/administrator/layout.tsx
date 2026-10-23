import Application from '@/libraries/src/Application/Application';
import WebApplication from '@/libraries/src/Application/WebApplication';
import Template from '@/libraries/src/Templates/Template';
import type { Metadata } from 'next';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getAdminTemplate } from '@/cms/administrator/com_templates/src/Model/StyleModel';
import LanguageProvider from '@/libraries/src/Language/Language';

export const metadata: Metadata = {
    title: 'NJC - Administrator',
    icons: {
        other: {
            rel: 'stylesheet',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
        },
    },
};

export default async function RootAdministratorLayout({ children }: LayoutProps<'/'>) {
    const locale = await getLocale('administrator');
    const modules = await getModuleList(1);
    const template = await getAdminTemplate();

    return (
        <Application
            initialValues={{
                clientId: 1,
                name: 'administrator',
                modules,
                template,
            }}
        >
            <LanguageProvider locale={locale}>
                <WebApplication>
                    <Template>{children}</Template>
                </WebApplication>
            </LanguageProvider>
        </Application>
    );
}
