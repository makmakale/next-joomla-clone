import type { ApplicationClientProps } from '@/libraries/src/Application/Application.types';
import CMSApplicationProvider from '@/libraries/src/Application/CMSApplication';
import LanguageProvider from '@/libraries/src/Language/Language';

const SiteApplication = ({ locale, template, children }: ApplicationClientProps) => {
    return (
        <CMSApplicationProvider clientId={0} name="site" template={template}>
            <LanguageProvider locale={locale}>{children}</LanguageProvider>
        </CMSApplicationProvider>
    );
};

export default SiteApplication;
