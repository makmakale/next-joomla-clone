import CMSApplicationProvider from '@/libraries/src/Application/CMSApplication';
import LanguageProvider from '@/libraries/src/Language/Language';
import type { PropsWithChildren } from 'react';

const SiteApplication = ({ locale, children }: PropsWithChildren<{ locale: string }>) => {
    return (
        <CMSApplicationProvider clientId={0} name="site">
            <LanguageProvider locale={locale}>{children}</LanguageProvider>
        </CMSApplicationProvider>
    );
};

export default SiteApplication;
