import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { TemplateProvider, getAdminTemplate } from '@/libraries/src/Template';

export default async ({ children, login }: LayoutProps<'/administrator'>) => {
    const template = await getAdminTemplate();
    const session = (await cookies()).get('web.session.administrator')?.value;
    // TODO: session string is valid

    if (!template) {
        notFound();
    }

    return (
        <TemplateProvider
            template={{
                ...template,
                template: session ? template.template : `${template.template}/login`,
            }}
        >
            {session ? children : login}
        </TemplateProvider>
    );
};
