import { getSiteTemplates } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import ApplicationProvider from '@/libraries/src/Application/Application';
import WebApplication from '@/libraries/src/Application/WebApplication';
import Template from '@/libraries/src/Templates/Template';
import { getSession } from '@/libraries/src/Session';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import { cn } from 'cn';

const roboto = Roboto({ subsets: ['cyrillic'], variable: '--font-sans-serif' });

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
    const session = await getSession('site');
    const modules = await getModuleList(0);
    const template = await getSiteTemplates();

    // TODO
    const option = 'com_content';
    const view = 'category';

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn('site', option, `view-${view}`, roboto.className)}>
                <ApplicationProvider
                    initialValues={{
                        clientId: 0,
                        name: 'site',
                        locale,
                        session,
                        modules,
                        template,
                    }}
                >
                    <WebApplication>
                        <Template>{children}</Template>
                    </WebApplication>
                </ApplicationProvider>
            </body>
        </html>
    );
}
