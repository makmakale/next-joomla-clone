import type { Metadata } from 'next';

import { InstallationApplication } from '@/cms/installation';

import { getTranslations } from '@/libraries/src/Language';

export const generateMetadata = async (): Promise<Metadata> => {
    const t = await getTranslations();

    return {
        title: t('INSTL_PAGE_TITLE'),
    };
};

export default async () => {
    return <InstallationApplication />;
};
