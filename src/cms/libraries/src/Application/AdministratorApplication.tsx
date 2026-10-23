import CMSApplicationProvider from '@/libraries/src/Application/CMSApplication';
import LanguageProvider from '@/libraries/src/Language/Language';
import AlertProvider from '@/libraries/src/Alert/Alert';
import { getLocale } from '@/libraries/src/Language/Language.actionsServer';
import { getModuleList } from '@/libraries/src/Module/Module.actionsServer';
import { getAdminTemplate } from '@/cms/administrator/com_templates/src/Model/StyleModel';
import type { PropsWithChildren } from 'react';

const AdministratorApplication = async ({ children }: PropsWithChildren) => {
    const locale = await getLocale('administrator');
    const modules = await getModuleList(1);
    const template = await getAdminTemplate();

    return (
        <CMSApplicationProvider clientId={1} name="administrator" modules={modules} template={template}>
            <LanguageProvider locale={locale}>
                <AlertProvider>{children}</AlertProvider>
            </LanguageProvider>
        </CMSApplicationProvider>
    );
};

export default AdministratorApplication;
