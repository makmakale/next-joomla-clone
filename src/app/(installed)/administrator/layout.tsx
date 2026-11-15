import { AdministratorApplication } from '@/libraries/src/Application';

export default async function Layout({ children }: LayoutProps<'/administrator'>) {
    return <AdministratorApplication>{children}</AdministratorApplication>;
}
