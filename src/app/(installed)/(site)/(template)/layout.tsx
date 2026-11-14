import { notFound } from 'next/navigation';

import { TemplateProvider, getSiteTemplate } from '@/libraries/src/Template';

export default async ({ children, autoload }: LayoutProps<'/'>) => {
    const template = await getSiteTemplate();

    if (!template) {
        notFound();
    }

    return (
        <>
            {autoload}
            <TemplateProvider template={template}>{children}</TemplateProvider>;
        </>
    );
};
