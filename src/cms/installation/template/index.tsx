import InstallationWizardProvider from '@/cms/installation/src/context/InstallationContext';
import { Installation } from '@/cms/installation/template/ui';
import Remove from '@/cms/installation/tmpl/remove';
import Setup from '@/cms/installation/tmpl/setup';

const InstallWizard = () => {
    return (
        <InstallationWizardProvider>
            <Installation.Body>
                <Installation.Header />

                <Installation.Content>
                    <Setup />
                    <Remove />
                </Installation.Content>

                <Installation.Footer />
            </Installation.Body>
        </InstallationWizardProvider>
    );
};

export default InstallWizard;
