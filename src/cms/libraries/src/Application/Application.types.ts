import type { ClientActiveTemplate } from '@/libraries/src/Templates/Template.types';
import type { JModuleType } from '@/libraries/src/Module/Module.types';
import type { PropsWithChildren } from 'react';

export type ApplicationClientProps = PropsWithChildren<{
    locale: string;
    modules: JModuleType[];
    template: ClientActiveTemplate;
}>;
