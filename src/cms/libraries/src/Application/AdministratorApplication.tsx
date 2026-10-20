import type { ApplicationClientProps } from '@/libraries/src/Application/Application.types';
import CMSApplicationProvider from '@/libraries/src/Application/CMSApplication';
import LanguageProvider from '@/libraries/src/Language/Language';

const AdministratorApplication = ({ locale, template, children }: ApplicationClientProps) => {
    return (
        <CMSApplicationProvider clientId={1} name="administrator" template={template}>
            <LanguageProvider locale={locale}>{children}</LanguageProvider>
        </CMSApplicationProvider>
    );
};

export default AdministratorApplication;
