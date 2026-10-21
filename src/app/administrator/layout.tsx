import { getAdminTemplate } from '@/cms/administrator/com_templates/src/Model/StyleModel';
import AdministratorApplication from '@/libraries/src/Application/AdministratorApplication';
import WebApplication from '@/libraries/src/Application/WebApplication';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import Template from '@/libraries/src/Templates/Template';
import type { Metadata } from 'next';

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
    const template = await getAdminTemplate();

    return (
        <AdministratorApplication locale={locale} template={template}>
            <WebApplication>
                <Template>{children}</Template>
            </WebApplication>
        </AdministratorApplication>
    );
}
