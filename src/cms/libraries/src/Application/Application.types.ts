import type { ClientActiveTemplate } from '@/libraries/src/Templates/Template.types';
import type { JModuleType } from '@/libraries/src/Module/Module.types';

export interface ApplicationProps {
    initialValues: {
        clientId: number;
        name: string;
        locale: string;
        session?: unknown;
        modules: JModuleType[];
        template: ClientActiveTemplate;
    };
}

export type AppInput = {
    option: string;
    view: string;
    layout: string;
};
