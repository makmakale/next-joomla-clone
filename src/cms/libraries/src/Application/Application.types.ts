import type { ClientActiveTemplate } from '@/libraries/src/Templates/Template.types';
import type { PropsWithChildren } from 'react';
import type { JModuleType } from '@/libraries/src/Module/Module.types';

export type ApplicationClientProps = PropsWithChildren<{
    locale: string;
    modules: JModuleType[];
    template: ClientActiveTemplate;
}>;
