import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(props: PageProps<'/installation'>, parent: ResolvingMetadata): Promise<Metadata> {
    return {
        title: 'Installation',
    };
}

export default async () => {
    return 'Installation';
};
