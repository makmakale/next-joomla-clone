import AdministratorApplication from '@/libraries/src/Application/AdministratorApplication';
import WebApplication from '@/libraries/src/Application/WebApplication';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import Template from '@/libraries/src/Templates/Template';
import { getTemplates } from '@/libraries/src/Templates/Template.actionsServer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NJC - Administrator',
};

export default async function RootAdministratorLayout({ children }: LayoutProps<'/'>) {
    const locale = await getLocale('administrator');
    const template = await getTemplates(1);

    return (
        <AdministratorApplication locale={locale} template={template}>
            <WebApplication>
                <Template>{children}</Template>
            </WebApplication>
        </AdministratorApplication>
    );
}
