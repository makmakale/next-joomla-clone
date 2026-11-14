import type { Metadata, ResolvingMetadata } from 'next';

import AtumComponent from '@/cms/__components__/admin/component';

import { getTranslations } from '@/libraries/src/Language';

export async function generateMetadata(props: PageProps<'/administrator'>, parent: ResolvingMetadata): Promise<Metadata> {
    const t = await getTranslations();

    return {
        title: t('JTEST_MESSAGE'),
    };
}

export default async () => {
    return <AtumComponent />;
};
