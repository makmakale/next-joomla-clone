import AdministratorApplication from '@/libraries/src/Application/AdministratorApplication';
import WebApplication from '@/libraries/src/Application/WebApplication';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NJC - Administrator',
};

export default async function RootAdministratorLayout({ children }: LayoutProps<'/'>) {
    const locale = await getLocale('site');

    return (
        <AdministratorApplication locale={locale}>
            <WebApplication>{children}</WebApplication>
        </AdministratorApplication>
    );
}
