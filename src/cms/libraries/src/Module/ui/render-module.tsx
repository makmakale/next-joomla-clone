import type { JModuleProps } from '../Module.types';
import { useCMSApplication } from '@/libraries/src/Application/CMSApplication';
import dynamic from 'next/dynamic';
import JModuleProvider from '@/libraries/src/Module/Module';
import { getModuleLayout } from '@/libraries/src/Module/Module.actions';
import get from 'lodash/get';

export const RenderModule = ({ module }: JModuleProps) => {
    const { clientId } = useCMSApplication();

    const layout = (get(module, 'params.layout') || '_:default').replace('_:', '');
    const ModuleLayout = dynamic(() => getModuleLayout(clientId, module.module, layout));

    return (
        <JModuleProvider module={module}>
            <ModuleLayout />
        </JModuleProvider>
    );
};
