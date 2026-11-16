import { redirect } from 'next/navigation';

import { InstallApplication } from '@/cms/installation';

import { isInstalled } from '@/libraries/services/configuration';
import { Application } from '@/libraries/src/Application';
import { loadMessages } from '@/libraries/src/Language';
import Language from '@/libraries/src/Language/provider/Language';
import { ThemeProvider } from '@/libraries/vendor/wrappers';

export default async function Layout({ children }: LayoutProps<'/'>) {
    if (process.env.NODE_ENV === 'production') {
        if (await isInstalled()) redirect('/');
    }
    const messages = await loadMessages();

    return (
        <Application clientId={2} name="installation">
            <ThemeProvider storageKey="web.theme.installation" defaultTheme="light">
                <Language initialMessages={messages}>
                    <InstallApplication>{children}</InstallApplication>
                </Language>
            </ThemeProvider>
        </Application>
    );
}
