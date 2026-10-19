import CMSApplicationProvider from '@/libraries/src/Application/CMSApplication';
import LanguageProvider from '@/libraries/src/Language/Language';
import type { PropsWithChildren } from 'react';

const AdministratorApplication = ({ locale, children }: PropsWithChildren<{ locale: string }>) => {
    return (
        <CMSApplicationProvider clientId={1} name="administrator">
            <LanguageProvider locale={locale}>{children}</LanguageProvider>
        </CMSApplicationProvider>
    );
};

export default AdministratorApplication;
