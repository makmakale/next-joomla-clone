'use client';

import { useApplication } from '@/libraries/src/Application/Application';

export const useModuleHelper = () => {
    const { modules } = useApplication();

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
