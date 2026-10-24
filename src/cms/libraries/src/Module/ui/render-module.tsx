import { useApplication } from '@/libraries/src/Application/Application';
import { getModuleLayout } from '@/libraries/src/Module/Module.actions';
import JModuleProvider from '@/libraries/src/Module/Module';
import type { JModuleProps } from '../Module.types';
import dynamic from 'next/dynamic';
import get from 'lodash/get';

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
