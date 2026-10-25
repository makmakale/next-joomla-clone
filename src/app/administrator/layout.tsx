import { getAdminTemplate } from '@/cms/administrator/components/com_templates/src/Model/StyleModel';
import { getAdminLocale } from '@/libraries/src/Language/Language.actionsServer';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import Application from '@/libraries/src/Application/Application';
import { getAdminSession } from '@/libraries/src/Session';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';

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

export default async function RootAdministratorLayout() {
    const locale = await getAdminLocale();
    const session = await getAdminSession();
    const modules = await getModuleList(1);
    const template = await getAdminTemplate();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={roboto.className}>
                <Application
                    initialValues={{
                        clientId: 1,
                        name: 'administrator',
                        locale,
                        session,
                        modules,
                        template,
                    }}
                />
            </body>
        </html>
    );
}
