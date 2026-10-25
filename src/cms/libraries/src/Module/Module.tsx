'use client';

import { useApplication } from '@/libraries/src/Application/Application';
import type { JModuleProps } from '@/libraries/src/Module/Module.types';
import { useLanguage } from '@/libraries/src/Language/Language';
import { createContext, use, useEffect } from 'react';
import type { PropsWithChildren } from 'react';

const useCtxValue = ({ module }: JModuleProps) => {
    const { load } = useLanguage();
    const app = useApplication();

    useEffect(() => {
        load([module.module, `${module.module}.sys`]);
    }, [module.module]);

    const getLayoutData = () => {
        return {
            module: module,
            app: app,
            input: app.getInput(),
            params: new Map(Object.entries(module.params as object)),
            // template: $this->app->getTemplate(),
        };
    };

    return { getLayoutData };
};

const JModuleContext = createContext<ReturnType<typeof useCtxValue> | null>(null);

export const useModule = () => {
    const context = use(JModuleContext);
    if (!context) throw new Error('useJModule should be used within <JModuleProvider>');

    return context;
};

export default function JModuleProvider({ children, ...props }: PropsWithChildren<JModuleProps>) {
    const value = useCtxValue(props);

    return <JModuleContext.Provider value={value}>{children}</JModuleContext.Provider>;
}
