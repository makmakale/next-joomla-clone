import InstTemplateProvider from '@/cms/installation/src/context/InstallationContext';
import InstallWizard from '@/cms/installation/template';

export default async function InstallationApplication() {
    return (
        <InstTemplateProvider>
            <InstallWizard />
        </InstTemplateProvider>
    );
}
