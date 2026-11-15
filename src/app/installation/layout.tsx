import { InstallApplication } from '@/cms/installation';

export default async function Layout({ children }: LayoutProps<'/'>) {
    return <InstallApplication>{children}</InstallApplication>;
}
