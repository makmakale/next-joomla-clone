import type { Metadata } from 'next';

import { getTranslations } from '@/libraries/src/Language';

export const generateMetadata = async (): Promise<Metadata> => {
    const t = await getTranslations();

    return {
        title: t('INSTL_PAGE_TITLE'),
    };
};

export default () => null;
