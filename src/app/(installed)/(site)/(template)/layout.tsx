import { notFound } from 'next/navigation';

import { TemplateProvider, getSiteTemplate } from '@/libraries/src/Template';

export default async ({ children }: LayoutProps<'/'>) => {
    const template = await getSiteTemplate();

    if (!template) {
        notFound();
    }

    return <TemplateProvider template={template}>{children}</TemplateProvider>;
};
