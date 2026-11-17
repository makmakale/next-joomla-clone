import Demo from '@/app/(site)/components/demo';
import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(props: PageProps<'/'>, parent: ResolvingMetadata): Promise<Metadata> {
    return {
        title: 'Site',
    };
}

export default async () => {
    return <Demo />;
};
