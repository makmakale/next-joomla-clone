import '@/libraries/shared/shadcn/globals.css';
import WebApplication from '@/libraries/src/Application/WebApplication';
import ThemeProvider from '@/libraries/src/Styles/ThemeProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NJC - Site',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <WebApplication locale="en">
            <ThemeProvider name="site">{children}</ThemeProvider>
        </WebApplication>
    );
}
