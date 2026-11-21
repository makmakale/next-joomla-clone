import type { Metadata, ResolvingMetadata } from 'next';

import Demo from './components/demo';

export async function generateMetadata(props: PageProps<'/'>, parent: ResolvingMetadata): Promise<Metadata> {
    return {
        title: 'Administrator',
    };
}

export default async () => {
    return <Demo />;
};
