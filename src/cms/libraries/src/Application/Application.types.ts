import type { JModuleType } from '@/libraries/src/Module/Module.types';
import type { ClientActiveTemplate } from '@/libraries/src/Templates/Template.types';

export interface ApplicationProps {
    clientId: number;
    name: string;

    defaultOption?: string;
    defaultView?: string;

    session?: unknown;

    modules?: JModuleType[];
    template?: ClientActiveTemplate;
}

export type AppInput = {
    option: string;
    view: string;
    layout: string;
};
