import InstallationWizardProvider from '@/cms/installation/src/context/InstallationContext';
import InstallWizard from '@/cms/installation/template';

import ApplicationProvider from '@/libraries/src/Application/Application';

export default async () => {
    return (
        <ApplicationProvider clientId={2} name="installation" defaultView="preinstall">
            <InstallationWizardProvider>
                <InstallWizard />
            </InstallationWizardProvider>
        </ApplicationProvider>
    );
};
