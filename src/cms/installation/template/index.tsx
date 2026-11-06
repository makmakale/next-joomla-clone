'use client';

import { Installation } from '@/cms/installation/template/ui';
import Remove from '@/cms/installation/tmpl/remove';
import Setup from '@/cms/installation/tmpl/setup';

const InstallWizard = () => {
    return (
        <Installation.Body>
            <Installation.Header />

            <Installation.Content>
                <Setup />
                <Remove />
            </Installation.Content>

            <Installation.Footer />
        </Installation.Body>
    );
};

export default InstallWizard;
