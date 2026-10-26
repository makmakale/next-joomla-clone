import dynamic from 'next/dynamic';

import get from 'lodash/get';

import { useApplication } from '@/libraries/src/Application/Application';
import JModuleProvider from '@/libraries/src/Module/Module';
import { getModuleLayout } from '@/libraries/src/Module/Module.actions';

import type { JModuleProps } from '../Module.types';

export const RenderModule = ({ module }: JModuleProps) => {
    const { clientId } = useApplication();

    const layout = (get(module, 'params.layout') || '_:default').replace('_:', '');
    const ModuleLayout = dynamic(() => getModuleLayout(clientId, module.module, layout));

    return (
        <JModuleProvider module={module}>
            <ModuleLayout />
        </JModuleProvider>
    );
};
