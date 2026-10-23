'use client';

import { useCMSApplication } from '@/libraries/src/Application/CMSApplication';

export const useModuleHelper = () => {
    const { modules } = useCMSApplication();

    const getModules = (positionName: string) => {
        return modules.filter(mod => mod.position === positionName);
    };

    // TODO
    const countModules = (positionName: string, withContentOnly = false) => {
        const _modules = getModules(positionName);

        if (!withContentOnly) {
            return !!_modules.length;
        }

        // TODO contentOnly
        return !!_modules.length;
    };

    return {
        modules,
        getModules,
        countModules,
    };
};
