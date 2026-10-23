import CMSApplicationProvider from '@/libraries/src/Application/CMSApplication';
import LanguageProvider from '@/libraries/src/Language/Language';
import AlertProvider from '@/libraries/src/Alert/Alert';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getSiteTemplates } from '@/cms/administrator/com_templates/src/Model/StyleModel';
import type { PropsWithChildren } from 'react';

const SiteApplication = async ({ children }: PropsWithChildren) => {
    const locale = await getLocale('site');
    const modules = await getModuleList(0);
    const template = await getSiteTemplates();

    return (
        <CMSApplicationProvider clientId={0} name="site" modules={modules} template={template}>
            <LanguageProvider locale={locale}>
                <AlertProvider>{children}</AlertProvider>
            </LanguageProvider>
        </CMSApplicationProvider>
    );
};

export default SiteApplication;
