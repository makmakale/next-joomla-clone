import type { Metadata, ResolvingMetadata } from 'next';

import InstlComponent from '@/cms/__components__/installation/component';

import { getTranslations } from '@/libraries/src/Language';

export async function generateMetadata(props: PageProps<'/installation'>, parent: ResolvingMetadata): Promise<Metadata> {
    const t = await getTranslations();

    return {
        title: t('JTEST_MESSAGE'),
    };
}

export default async () => {
    return <InstlComponent />;
};
