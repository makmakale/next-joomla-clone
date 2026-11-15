import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(props: PageProps<'/'>, parent: ResolvingMetadata): Promise<Metadata> {
    return {
        title: 'Administrator',
    };
}

export default async () => {
    return 'Administrator';
};
