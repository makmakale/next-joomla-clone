import InstallationTemplate from '@/cms/installation/templates';

export default async ({ children }: LayoutProps<'/installation'>) => {
    return <InstallationTemplate>{children}</InstallationTemplate>;
};
