import type { Metadata, ResolvingMetadata } from 'next';

import SiteComponent from '@/cms/__components__/site/component';

import { getTranslations } from '@/libraries/src/Language';

export async function generateMetadata(props: PageProps<'/'>, parent: ResolvingMetadata): Promise<Metadata> {
    const t = await getTranslations('tpl_cassiopeia');

    return {
        title: t('JTEST_MESSAGE'),
    };
}

export default async () => {
    return <SiteComponent />;
};
