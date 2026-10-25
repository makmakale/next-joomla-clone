import { getAdminTemplate } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';
import { getAdminLocale } from '@/libraries/src/Language/Language.actionsServer';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import WebApplication from '@/libraries/src/Application/WebApplication';
import Application from '@/libraries/src/Application/Application';
import Template from '@/libraries/src/Templates/Template';
import { getAdminSession } from '@/libraries/src/Session';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import { cn } from 'cn';

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans-serif' });

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
    const locale = await getAdminLocale();
    const session = await getAdminSession();
    const modules = await getModuleList(1);
    const template = await getAdminTemplate();

    // TODO
    const option = session ? 'com_cpanel' : 'com_login';
    const view = session ? '' : 'login';
    const layout = 'default';

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn('admin', option, `view-${view}`, layout ? `layout-${layout}` : 'no-layout', roboto.className)}>
                <Application
                    initialValues={{
                        clientId: 1,
                        name: 'administrator',
                        locale,
                        session,
                        modules,
                        template,
                    }}
                >
                    <WebApplication>
                        <Template>{children}</Template>
                    </WebApplication>
                </Application>
            </body>
        </html>
    );
}
