import { SiteApplication } from '@/libraries/src/Application';

export default async function Layout({ children }: LayoutProps<'/'>) {
    return <SiteApplication>{children}</SiteApplication>;
}
