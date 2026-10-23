import SiteApplication from '@/libraries/src/Application/SiteApplication';
import WebApplication from '@/libraries/src/Application/WebApplication';
import Template from '@/libraries/src/Templates/Template';
import type { Metadata } from 'next';

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
    return (
        <SiteApplication>
            <WebApplication>
                <Template>{children}</Template>
            </WebApplication>
        </SiteApplication>
    );
}
