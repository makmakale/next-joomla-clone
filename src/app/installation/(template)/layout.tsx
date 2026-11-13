
import InstallationTemplate from '@/cms/installation/templates';

export default async ({ children }: LayoutProps<'/'>) => {
    return <InstallationTemplate>{children}</InstallationTemplate>;
};
