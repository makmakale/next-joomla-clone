import AdministratorApplication from '@/libraries/src/Application/AdministratorApplication';
import WebApplication from '@/libraries/src/Application/WebApplication';
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
    return (
        <AdministratorApplication>
            <WebApplication>
                <Template>{children}</Template>
            </WebApplication>
        </AdministratorApplication>
    );
}
